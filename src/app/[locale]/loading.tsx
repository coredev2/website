import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-12 w-2/3 max-w-xl" />
        <Skeleton className="h-4 w-1/2 max-w-md" />
        <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </Container>
    </section>
  );
}
