import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import images from "@/utils/images"
import { LogOut, X } from "lucide-react" // Tambahkan import X

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
  useSidebar
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const location = useLocation()
  const { logout } = useAuth()
  const { state, toggleSidebar } = useSidebar() // Tambahkan toggleSidebar

  const isCollapsed = state === "collapsed"
  
  // Menu navigasi
  const menuItems = [
    { text: "Home", path: "/", icon: images.LOGO.HOME },
    { text: "Jadwal", path: "/jadwal", icon: images.LOGO.JADWAL },
    { text: "Sapi", path: "/sapi", icon: images.LOGO.SAPI },
    { text: "Pakan", path: "/pakan", icon: images.LOGO.PAKAN },
    { text: "Settings", path: "/settings", icon: images.LOGO.SETTING },
  ]

  // Cek apakah route aktif
  const isActive = (path) => {
    if (path === "/") return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <Sidebar>
<SidebarHeader className={`border-b px-4 py-4 ${
  isCollapsed ? "flex justify-center" : "flex justify-between items-center"
}`}>
  {!isCollapsed ? (
    <div className="flex w-full justify-between items-center">
      <Link to="/" className="flex items-center">
        <span className="font-bold text-xl">Smart Feed</span>
      </Link>
      {/* Tombol X untuk menutup sidebar */}
      <button
        onClick={toggleSidebar}
        className="text-muted-foreground hover:text-foreground rounded-full p-1 hover:bg-secondary"
      >
        <X size={18} />
      </button>
    </div>
  ) : (
    <Link to="/" className="flex items-center justify-center">
      <img src={images.LOGO.HOME} alt="Logo" className="w-6 h-6" />
    </Link>
  )}
</SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Menu</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.text}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)} 
                    tooltip={isCollapsed ? item.text : undefined}
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <img src={item.icon} alt={item.text} className="w-5 h-5" />
                      {!isCollapsed && <span>{item.text}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <button
          onClick={logout}
          className={`flex items-center text-destructive w-full px-2 py-2 hover:bg-secondary rounded-md ${
            isCollapsed ? "justify-center" : "gap-2"
          }`}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar