import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


import { Separator } from "@radix-ui/react-dropdown-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/global/ModeToggle";
import { AppSidebar } from "./component/Dashboard/app-sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className=" h-screen" suppressHydrationWarning>

        <SidebarProvider>
          <AppSidebar className="w-64 h-full fixed left-0 top-0 border-r border-blue-500 border-opacity-0" />
          <div className="flex flex-col flex-1">
            <div className="dark:bg-black">
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex justify-between items-center gap-2 px-4 ">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                          Building Your Team
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Enjoy Now XyNexa</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                 <ModeToggle/>
                </div>
              </header>
            </div>
            <div className="flex-1 w-full border overflow-y-auto dark:bg-black">
              {children}
            </div>
          </div>
        </SidebarProvider>
      
    </div>
  );
}
