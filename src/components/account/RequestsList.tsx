import { Link } from "react-router-dom";
import { useCancelViewingRequest, useViewingRequests } from "@/hooks/useViewingRequests";
import { cn } from "@/lib/utils";

const statusLabels = {
  new: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
} as const;

const statusClasses = {
  new: "text-foreground border-foreground/40",
  confirmed: "text-gold border-gold",
  cancelled: "text-muted-foreground border-foreground/10",
} as const;

export function RequestsList() {
  const { data, isLoading } = useViewingRequests();
  const cancel = useCancelViewingRequest();

  if (isLoading) {
    return (
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Loading…</p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="border border-foreground/10 p-10 text-center">
        <p className="text-sm text-muted-foreground">No viewing requests yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {data.map((req) => (
        <div
          key={req.id}
          className="flex flex-col gap-4 border border-foreground/10 p-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-col gap-2">
            <Link
              to={`/property/${req.property.id}`}
              className="font-display text-xl leading-tight hover:underline"
            >
              {req.property.title}
            </Link>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {req.property.location}
            </p>
            {req.preferred_date && (
              <p className="text-sm text-muted-foreground">
                Preferred: {new Date(req.preferred_date).toLocaleString()}
              </p>
            )}
            {req.message && (
              <p className="mt-1 max-w-xl text-sm text-foreground">{req.message}</p>
            )}
          </div>
          <div className="flex items-center gap-6">
            <span
              className={cn(
                "border px-3 py-1.5 text-[10px] uppercase tracking-[0.25em]",
                statusClasses[req.status]
              )}
            >
              {statusLabels[req.status]}
            </span>
            {req.status === "new" && (
              <button
                onClick={() => cancel.mutate(req.id)}
                disabled={cancel.isPending}
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
