"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deletePage } from "@/app/(admin)/admin/actions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * Confirm-then-delete for a Page row.
 *
 * `deletePage` never throws to the client — it returns `{ success, error }` —
 * so a failed authorisation check surfaces as a toast rather than an unhandled
 * rejection. `router.refresh()` re-runs the server component; the action's own
 * revalidatePath handles the public route.
 */
export default function DeletePageButton({ id, slug }: { id: string; slug: string }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  async function handleDelete() {
    setPending(true);
    const result = await deletePage(id);
    setPending(false);

    if (result.success) {
      toast.success(`Deleted ${slug}`);
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result.error || "Could not delete this page.");
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Delete ${slug}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this page&apos;s SEO record?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-mono text-foreground">{slug}</span> will lose its custom
            metadata, social card and structured data. The page itself stays online and falls
            back to the values hardcoded in the route. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              // Keep the dialog open while the action runs so the pending state is visible.
              event.preventDefault();
              void handleDelete();
            }}
            disabled={pending}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {pending ? "Deleting…" : "Delete record"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
