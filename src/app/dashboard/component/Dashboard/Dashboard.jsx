import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { ModeToggle } from "@/components/global/ModeToggle";
import OverViewCard from "./OverViewCard";
import { CalendarDemo } from "./OverViewCalender";
import TotalTaskChart from "./TotaltaskChart";
import TaskPercent from "./TaskParcent";
import WorkStatus from "./WorkStatus";
import Progress from "./Progess";
import RecentTasks from "./RecentTasks";
import WelcomeBanner from "./WelcomeBanner";
import { ScratchToRevealDemo } from "./ScratchToRevealDemo";

export default function Page() {
  return (
    <SidebarInset>
      <div className="max-w-[1600px] mx-auto bg-muted/50 gap-4 p-4 rounded-md min-h-screen">
        <div className="flex   gap-10 ">
          <div className="w-[75%]">
            <div className="">
              <WelcomeBanner />
              {/* <OverViewCard/> */}
              {/* <div className="grid grid-cols-2 gap-6 my-12">
            <TotalTaskChart/>
            <TaskPercent/>
            </div> */}
              {/* <div className="flex items-center justify-between gap-6">
              <div className="w-[70%]">
                <Progress/>
              </div>
              <div className="w-[30%]">
              <WorkStatus/>
             
              </div>
            </div> */}
            </div>
          </div>
          <div className=" max-w-[25%] w-full flex  flex-col">
            <div className="">
              <CalendarDemo />
              {/* <ScratchToRevealDemo/> */}
              {/* <RecentTasks/> */}
            </div>
          </div>
        </div>
        <div className="flex gap-10 ">
          <div className="w-[75%]">
            <OverViewCard />
            <div className="grid grid-cols-2 gap-6 mt-10">
              <TotalTaskChart />
              <TaskPercent />
            </div>
          </div>
          <div className=" bg-white rounded-lg mt-6 p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold ">Recent Tasks</h2>
              <p className="text-blue-600">SeeAll</p>
            </div>

            <hr className="my-4 mb-6" />
            <RecentTasks />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
