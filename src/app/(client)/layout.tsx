import { cookies } from "next/headers";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { UploadPanel } from "@/components/UploadPanel";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar variant="inset" />
      {/* <main> */}
      <SidebarInset>
        <div className="fixed top-0 w-full border-b z-10 bg-background p-3">
          <SidebarTrigger />
        </div>
        <main className="pt-12">{children}</main>

        <UploadPanel />
      </SidebarInset>
      {/* </main> */}
    </SidebarProvider>
  );
}
