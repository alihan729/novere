import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCreateViewingRequest } from "@/hooks/useViewingRequests";

interface ViewingRequestFormProps {
  propertyId: string;
}

export function ViewingRequestForm({ propertyId }: ViewingRequestFormProps) {
  const { isAuthenticated } = useAuth();
  const create = useCreateViewingRequest();
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="border-y border-foreground/10 py-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Private viewing</p>
        <h3 className="mt-4 font-display text-2xl">Request a viewing.</h3>
        <p className="mt-4 text-sm text-muted-foreground">
          Sign in to submit a request. Our office will coordinate within one business day.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/login"
            state={{ from: `/property/${propertyId}` }}
            className="border border-foreground/40 px-7 py-3.5 text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-2 py-3.5 text-xs uppercase tracking-[0.25em] text-muted-foreground underline-offset-8 hover:text-foreground hover:underline"
          >
            Request access
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="border-y border-foreground/10 py-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Received</p>
        <h3 className="mt-4 font-display text-2xl">Your request has been logged.</h3>
        <p className="mt-4 text-sm text-muted-foreground">
          A senior representative will be in touch shortly. The status of this request is visible in your account.
        </p>
        <Link
          to="/account"
          className="mt-8 inline-block text-xs uppercase tracking-[0.25em] underline-offset-8 hover:underline"
        >
          Go to account →
        </Link>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await create.mutateAsync({
        propertyId,
        preferredDate: preferredDate ? new Date(preferredDate).toISOString() : null,
        message: message.trim() || null,
      });
      setDone(true);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border-y border-foreground/10 py-10">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Private viewing</p>
      <h3 className="mt-4 font-display text-2xl">Request a viewing.</h3>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <Label htmlFor="date">Preferred date</Label>
          <Input
            id="date"
            type="datetime-local"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3 md:col-span-2">
          <Label htmlFor="message">Notes</Label>
          <Textarea
            id="message"
            placeholder="Any preferences for the visit"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p className="mt-8 border-l-2 border-destructive pl-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" disabled={create.isPending} className="mt-10">
        {create.isPending ? "Sending…" : "Submit request"}
      </Button>
    </form>
  );
}
