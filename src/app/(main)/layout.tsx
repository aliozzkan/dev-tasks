import { PropsWithChildren } from "react";

import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";

export default function MainLayout(props: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar  />
      <SidebarInset>
        <Header />
        <main className="px-4">{props.children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
