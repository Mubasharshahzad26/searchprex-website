import os
from imap_tools import MailBox, AND
import google.generativeai as genai
from dotenv import load_dotenv
from database import update_lead_status, get_lead_by_email
from email_sender import send_outreach_email # You can reuse resend to send replies

load_dotenv()

# Configure Gemini for AI responses
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

IMAP_SERVER = os.getenv("IMAP_SERVER", "imap.gmail.com")
IMAP_EMAIL = os.getenv("IMAP_EMAIL")
IMAP_PASSWORD = os.getenv("IMAP_PASSWORD")

def analyze_and_draft_response(incoming_text):
    """
    Uses Gemini to analyze the sentiment/intent of the reply and drafts a response.
    """
    prompt = f"""
    You are an AI assistant for a marketing & software agency called 'Searchprex' (partnered with 'codeloci').
    Analyze the following incoming email reply from a prospect.
    
    Determine if they are:
    1. 'Interested' (Asking for more info, pricing, or a meeting)
    2. 'Not Interested' (Asking to be removed, saying no)
    3. 'Questions' (Asking specific questions)
    
    If 'Not Interested', reply simply with "Understood, we will remove you from our list. Have a great day."
    If 'Interested' or 'Questions', draft a polite, concise professional response addressing them and offering a quick 10-minute call to discuss how Searchprex can help.
    
    Format your response EXACTLY like this:
    INTENT: [Interested/Not Interested/Questions]
    DRAFT: [Your drafted email response]
    
    Incoming Email:
    "{incoming_text}"
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text
        
        intent_line = [line for line in text.split('\n') if line.startswith('INTENT:')]
        draft_line = [line for line in text.split('\n') if line.startswith('DRAFT:')]
        
        intent = intent_line[0].replace('INTENT:', '').strip() if intent_line else "Unknown"
        draft = text.split('DRAFT:')[1].strip() if len(text.split('DRAFT:')) > 1 else ""
        
        return intent, draft
    except Exception as e:
        print("Error generating AI response:", e)
        return "Unknown", ""

def check_inbox():
    """
    Connects to the IMAP server, reads unseen emails, and processes them.
    """
    if not IMAP_EMAIL or not IMAP_PASSWORD:
        print("IMAP credentials not set. Skipping inbox monitor.")
        return

    print("Checking inbox for replies...")
    try:
        with MailBox(IMAP_SERVER).login(IMAP_EMAIL, IMAP_PASSWORD) as mailbox:
            # Fetch all unseen emails
            for msg in mailbox.fetch(AND(seen=False)):
                sender_email = msg.from_
                text_content = msg.text or msg.html
                
                print(f"New email received from: {sender_email}")
                
                # Check if this sender is in our leads database
                lead = get_lead_by_email(sender_email)
                if lead:
                    print(f"Recognized lead reply: {sender_email}")
                    intent, draft = analyze_and_draft_response(text_content)
                    print(f"AI Intent Analysis: {intent}")
                    
                    if intent == "Not Interested":
                        update_lead_status(lead['id'], 'unsubscribed')
                    else:
                        update_lead_status(lead['id'], 'replied')
                    
                    # Optional: Automatically send the AI drafted response back using Resend
                    # send_outreach_email(...) or use SMTP to reply in the same thread.
                    # For safety, it's often best to save this to a 'drafts' DB for human review first!
                    print(f"Drafted Response:\n{draft}\n")
                else:
                    print(f"Email from {sender_email} is not in our leads database. Ignoring.")
                    
    except Exception as e:
        print(f"Failed to check inbox: {str(e)}")

if __name__ == "__main__":
    check_inbox()
