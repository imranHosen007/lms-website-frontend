"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  ExitToApp,
  HomeOutlined,
  ArrowForwardIos,
  ArrowBackwordIos,
  PeopleOutline,
  ReceiptOutlined,
  BarChartOutlined,
  MapOutlined,
  Groups,
  VideoCall,
  OndemandVideo,
  Web,
  Quiz,
  ManageHistory,
} from "./Icon";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { BiSolidCategory } from "react-icons/bi";
import { usePathname } from "next/navigation";

interface Props {
  isCollapsed: boolean;
  setIsCollapsed: any;
}
const SideBar: React.FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
  const pathName = usePathname();
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const [selected, setSelected] = useState(pathName && pathName);
  const { theme } = useTheme();
  // -----Handle-Logout----
  const handleLogout = async () => {
    setLogout(true);
    await signOut();
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div
      className={`dark:bg-[#111c43] bg-white  ${
        isCollapsed
          ? "w-[100%]  flex flex-col items-center "
          : "w-[100%]  max-md:overflow-y-scroll"
      }`}
    >
      <div
        className={`flex max-md:hidden justify-between items-center ${
          !isCollapsed && "px-5"
        }`}
      >
        {!isCollapsed && (
          <Link href={`/`}>
            <h3 className="text-[25px] max-md:hidden uppercase dark:text-white text-black font-Poppins">
              Lms
            </h3>
          </Link>
        )}
        <button
          className="inline-block cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ArrowForwardIos className="dark:text-[#ffffffc1] text-black" />
          ) : (
            <ArrowBackwordIos className="dark:text-[#ffffffc1] text-black" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="flex max-md:hidden items-center flex-col mb-4">
          <Image
            src={user?.avatar.url && user?.avatar.url}
            alt="not found"
            width={100}
            height={100}
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              border: "3px solid #5b6fe6",
            }}
          />
          <h4 className="!text-[20px] text-black dark:text-[#ffffffc1]">
            {user?.name}{" "}
          </h4>{" "}
          <h6 className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize">
            {user?.role}{" "}
          </h6>
        </div>
      )}
      <div className={`${!isCollapsed && "pl-[10%]"}`}>
        <Link href={`/admin`}>
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer  capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == "/admin" && "text-[#6870fa]"
            }`}
          >
            <HomeOutlined />
            <span className="max-md:hidden">
              {" "}
              {!isCollapsed && "dashboard"}
            </span>
          </h4>
        </Link>
        {!isCollapsed && (
          <h5 className="!text-[18px] max-md:hidden text-black dark:text-[#ffffffc1] capitalize font-[400] py-1.5">
            Data
          </h5>
        )}
        <Link href={`/admin/users`}>
          {" "}
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == "/admin/users" && "text-[#6870fa]"
            }`}
          >
            <Groups />
            <span className="max-md:hidden"> {!isCollapsed && "Users"}</span>
          </h4>{" "}
        </Link>{" "}
        <Link href={`/admin/invocies`}>
          {" "}
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == "/admin/invocies" && "text-[#6870fa]"
            }`}
          >
            <ReceiptOutlined />
            <span className="max-md:hidden"> {!isCollapsed && "invocies"}</span>
          </h4>
        </Link>
        {!isCollapsed && (
          <h5 className="!text-[18px] max-md:hidden text-black dark:text-[#ffffffc1] capitalize font-[400] py-1.5">
            Content
          </h5>
        )}
        <Link href={`/admin/create-course`}>
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == "/admin/create-course" && "text-[#6870fa]"
            }`}
          >
            <VideoCall />
            <span className="max-md:hidden">
              {" "}
              {!isCollapsed && "Create Course"}
            </span>
          </h4>{" "}
        </Link>
        <Link href={`/admin/course`}>
          {" "}
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == "/admin/course" && "text-[#6870fa]"
            }`}
          >
            <OndemandVideo />
            <span className="max-md:hidden">
              {" "}
              {!isCollapsed && "Live Course"}
            </span>
          </h4>
        </Link>
        {!isCollapsed && (
          <h5 className="!text-[18px] max-md:hidden text-black dark:text-[#ffffffc1] capitalize font-[400] py-1.5">
            Customization
          </h5>
        )}
        <Link href={`/admin/hero`}>
          {" "}
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == `/admin/hero` && "text-[#6870fa]"
            }`}
          >
            <Web />
            <span className="max-md:hidden">{!isCollapsed && "Hero"}</span>
          </h4>
        </Link>
        <Link href={`/admin/faq`}>
          {" "}
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == `/admin/faq` && "text-[#6870fa]"
            }`}
          >
            <Quiz />
            <span className="max-md:hidden">{!isCollapsed && "Faq"}</span>
          </h4>
        </Link>{" "}
        <Link href={`/admin/category`}>
          {" "}
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == `/admin/category` && "text-[#6870fa]"
            }`}
          >
            <BiSolidCategory />
            <span className="max-md:hidden"> {!isCollapsed && "category"}</span>
          </h4>
        </Link>
        {!isCollapsed && (
          <h5 className="!text-[18px] max-md:hidden text-black dark:text-[#ffffffc1] capitalize font-[400] py-1.5">
            Controllers
          </h5>
        )}
        <Link href={`/admin/team`}>
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == `/admin/team` && "text-[#6870fa]"
            }`}
          >
            <PeopleOutline />
            <span className="max-md:hidden">
              {" "}
              {!isCollapsed && "Manage Team"}
            </span>
          </h4>
        </Link>
        {!isCollapsed && (
          <h5 className="!text-[18px] max-md:hidden text-black dark:text-[#ffffffc1] capitalize font-[400] py-1.5">
            Analytices
          </h5>
        )}
        <Link href={`/admin/courses-analytics`}>
          {" "}
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == `/admin/courses-analytics` && "text-[#6870fa]"
            }`}
          >
            <BarChartOutlined />
            <span className="max-md:hidden">
              {!isCollapsed && "Courses Analytics"}
            </span>
          </h4>{" "}
        </Link>
        <Link href={`/admin/users-analytics`}>
          {" "}
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == `/admin/users-analytics` && "text-[#6870fa]"
            }`}
            onClick={() => setSelected(pathName)}
          >
            <ManageHistory />
            <span className="max-md:hidden">
              {" "}
              {!isCollapsed && "Users Analytices"}
            </span>
          </h4>
        </Link>
        <Link href={`/admin/orders-analytics`}>
          <h4
            className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
              pathName == `/admin/orders-analytics` && "text-[#6870fa]"
            }`}
          >
            <MapOutlined />
            <span className="max-md:hidden">
              {!isCollapsed && "Orders Analytices"}
            </span>
          </h4>{" "}
        </Link>
        {!isCollapsed && (
          <h5 className="!text-[18px] max-md:hidden text-black dark:text-[#ffffffc1] capitalize font-[400] py-1.5">
            Extras
          </h5>
        )}
        <h4
          className={`!font-Poppins text-[16px] gap-x-4 cursor-pointer capitalize flex items-center py-1.5 hover:text-[#8670fa] ${
            selected == "logout" && "text-[#6870fa]"
          }`}
          onClick={handleLogout}
        >
          <ExitToApp />
          <span className="max-md:hidden"> {!isCollapsed && "logout"}</span>
        </h4>
      </div>
    </div>
  );
};

export default SideBar;
