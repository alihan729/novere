import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("skeleton", className)} />;
}

export function PropertyCardSkeleton() {
  return (
    <div className="animate-fade-in border border-foreground/10">
      <Skeleton className="aspect-[4/5] w-full" />
      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-14" />
        </div>
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="mt-2 flex items-end justify-between border-t border-foreground/10 pt-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

export function PropertyDetailSkeleton() {
  return (
    <div className="page-enter">
      <div className="flex flex-col gap-4 py-12 md:py-16">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-40" />
      </div>
      <Skeleton className="aspect-[16/10] w-full" />
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}
