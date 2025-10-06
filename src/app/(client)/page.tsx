import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <time dateTime={new Date().toISOString()} className="text-sm">
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "2-digit",
        })}
      </time>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
        <Skeleton className="h-50 w-full" />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-10 w-32 md:col-span-2" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-10 w-32 md:col-span-2" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-10 w-32 md:col-span-2" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
    </div>
  );
}
