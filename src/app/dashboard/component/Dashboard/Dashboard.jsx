
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { ModeToggle } from "@/components/global/ModeToggle"

export default function Page() {
  return (
    
   
      <SidebarInset>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-purple-600/50 rounded-xl text-center">
                <h1 className=" text-2xl font-bold mt-12">Hello Debug Titans </h1>
                <p>Its our XyNexa DashBoard</p>
            </div>
            <div className="aspect-video rounded-xl bg-pink-600/50" />
            <div className="aspect-video rounded-xl bg-amber-600/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
   
  )
}
