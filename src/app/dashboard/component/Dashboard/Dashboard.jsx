
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
import OverViewCard from "./OverViewCard"
import { CalendarDemo } from "./OverViewCalender"
import TotalTaskChart from "./TotaltaskChart"
import TaskPercent from "./TaskParcent"
import WorkStatus from "./WorkStatus"
import Progress from "./Progess"
import RecentTasks from "./RecentTasks"
import WelcomeBanner from "./WelcomeBanner"

export default function Page() {
  return (
    
   
      <SidebarInset>
        <div className="flex max-w-[1600px] bg-muted/50 gap-4 p-4 rounded-md min-h-screen">
          <div className="w-[80%]">
            <div className="">
              <WelcomeBanner/>
            <OverViewCard/>
            <div className="grid grid-cols-2 gap-6 my-12">
            <TotalTaskChart/>
            <TaskPercent/>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="w-[70%]">
                <Progress/>
              </div>
              <div className="w-[30%]">
              <WorkStatus/>
             
              </div>
            </div>
            
            </div>

          </div>
          <div className=" max-w-[25%] flex  flex-col">
          <div className="">
          <CalendarDemo/>
          <RecentTasks/>
          </div>
          <div className=""></div>
          </div>
        </div>
      </SidebarInset>
   
  )
}
