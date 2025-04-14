"use client";

import SideBar from "@/app/components/Admin/AdminSidebar/SideBar";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminProjected from "@/app/hooks/useAdminProjected";
import Heading from "@/app/utils/Heading";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <html lang="en">
      <body>
        <AdminProjected>
          <Heading
            description="lms is a platform for students to learn and get help from teachers"
            keywords="mern lms"
            title="lms admin"
          />
          <DashboardHeader />
          <div className="flex h-[200vh] ">
            <div className={` z-[20] ${isCollapsed ? "w-[6%]" : "md:w-[15%]"}`}>
              <SideBar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            </div>
            <div className={`${isCollapsed ? "w-[94%]" : "md:w-[85%]"}`}>
              {children}
            </div>
          </div>
        </AdminProjected>
      </body>
    </html>
  );
}
