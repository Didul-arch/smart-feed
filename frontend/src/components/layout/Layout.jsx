import { Outlet } from 'react-router-dom';
import AppSidebar from './Sidebar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Layout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1">
          <div className="container p-4 md:p-6 relative">
            {/* Hamburger menu fixed di kiri atas */}
            <div className="fixed top-4 left-4 z-40 md:hidden">
              <SidebarTrigger />
            </div>
            
            <main className="pt-12 md:pt-4">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;