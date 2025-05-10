import { Outlet } from 'react-router-dom';
import AppSidebar from './Sidebar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='p-2 w-full'>
        <SidebarTrigger />
        <div className="p-6">
          <Outlet/>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;