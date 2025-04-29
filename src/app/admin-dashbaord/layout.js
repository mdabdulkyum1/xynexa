

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import data from "./data.json"
import { AppSidebar } from "./component/app-sidebar"
import { SiteHeader } from "./component/site-header"
import { SectionCards } from "./component/section-cards"
import { ChartAreaInteractive } from "./component/chart-area-interactive"


export default function Page({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
