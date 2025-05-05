'use client'
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
import { useUser } from "@clerk/nextjs";
import { useGetUserFullSummaryQuery } from "@/redux/features/Api/TaskApi";
export default function Page() {
  const { user } = useUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const {data:userData}=useGetUserFullSummaryQuery(userEmail);

  return (
    <SidebarInset>
      <div className=" bg-muted/50  min-h-screen">
        <div className="max-w-[1600px] mx-auto gap-4 p-4 rounded-md">
        <div className="flex   gap-10 ">
          <div className="w-[100%]">
            <div className="">
              {/* hello bro */}
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
          
        </div>
        <div className="flex flex-col lg:flex-row gap-10 ">
          <div className="w-full lg:w-[75%]">
            <OverViewCard summary={userData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
              <TotalTaskChart summary={userData} />
              <TaskPercent summary={userData} />
            </div>
          </div>
          <div className=" light:bg-white rounded-lg   p-4">
            

            
            <RecentTasks />
          </div>
        </div>
        </div>
      </div>
    </SidebarInset>
  );
}
