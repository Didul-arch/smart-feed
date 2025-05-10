import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import images from "@/utils/images";
import { LogOut, X, ChevronUp } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function AppSidebar() {
  const location = useLocation();
  const { logout, currentUser } = useAuth();
  console.log(currentUser)
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  // Menu navigasi
  const menuItems = [
    { title: "Home", path: "/", icon: images.LOGO.HOME },
    { title: "Jadwal", path: "/jadwal", icon: images.LOGO.JADWAL },
    { title: "Sapi", path: "/sapi", icon: images.LOGO.SAPI },
    { title: "Pakan", path: "/pakan", icon: images.LOGO.PAKAN },
    { title: "Settings", path: "/settings", icon: images.LOGO.SETTING },
  ];

  // Cek apakah route aktif
  const isActive = (path) => {
    if (path === "/") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader className="border-b-1 border-slate-300 mb-6 p-4 flex justify-between flex-row items-baseline">
            <h1 className="font-bold text-2xl">SmartFeed</h1>
            <X size={20} className="md:hidden" onClick={toggleSidebar}/>
          </SidebarHeader>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} onClick={toggleSidebar}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <img src={item.icon} className="max-h-full"/>
                      <h3 className="text-[18px] ml-2">{item.title}</h3>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <h2 className="font-semibold">{currentUser.name}</h2>
                    
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
