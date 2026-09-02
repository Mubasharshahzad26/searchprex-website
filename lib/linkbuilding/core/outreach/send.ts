import { db } from '@/lib/db';
import { Resend } from 'resend';
import { checkCompliance } from './policy';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovedOutreach(mailboxId?: string) {
  // Find messages that are approved to be sent.
  const messages = await db.outreachMessage.findMany({
    where: {
      status: 'approved',
      ...(mailboxId ? { mailboxId } : {}),
    },
    include: {
      mailbox: true,
      thread: {
        include: {
          prospect: true,
        },
      },
    },
  });

  const results = {
    total: messages.length,
    sent: 0,
    failed: 0,
    policyBlocked: 0,
    errors: [] as string[],
  };

  for (const message of messages) {
    if (!message.mailbox) {
      results.failed++;
      results.errors.push(`Message ${message.id} has no mailbox attached.`);
      continue;
    }

    if (!message.thread.contactEmail) {
      results.failed++;
      results.errors.push(`Message ${message.id} thread has no contact email.`);
      continue;
    }

    // Double check compliance before actual send (daily caps, domain rules, etc.)
    const compliance = await checkCompliance(message.threadId, message.mailbox.id);
    if (!compliance.allowed) {
      results.policyBlocked++;
      results.errors.push(`Message ${message.id} blocked by policy: ${compliance.reason}`);
      await db.outreachMessage.update({
        where: { id: message.id },
        data: {
          status: 'failed',
          rejectionReason: `Policy block: ${compliance.reason}`,
        },
      });
      continue;
    }

    try {
      const from = `${message.mailbox.fromName} <${message.mailbox.fromEmail}>`;
      const to = message.thread.contactEmail;

      const { data, error } = await resend.emails.send({
        from,
        to,
        subject: message.subject,
        html: message.body,
        // We could add reply_to here if needed
      });

      if (error) {
        throw new Error(error.message);
      }

      // Update message as sent
      await db.outreachMessage.update({
        where: { id: message.id },
        data: {
          status: 'sent',
          sentAt: new Date(),
        },
      });

      // Update thread status
      await db.outreachThread.update({
        where: { id: message.threadId },
        data: {
          status: 'contacted',
        },
      });

      results.sent++;
    } catch (err: any) {
      results.failed++;
      results.errors.push(`Failed to send message ${message.id}: ${err.message}`);
      
      await db.outreachMessage.update({
        where: { id: message.id },
        data: {
          status: 'failed',
          rejectionReason: err.message,
        },
      });
    }
  }

  return results;
}
