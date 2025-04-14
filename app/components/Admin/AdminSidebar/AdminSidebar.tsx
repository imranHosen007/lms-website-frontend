"use client";
import React, { JSX, useEffect, useState } from "react";
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
  Settings,
} from "./Icon";
import { Typography, Box, IconButton } from "@mui/material";
import { MenuItem, ProSidebar, Menu } from "react-pro-sidebar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useLogoutUserQuery } from "@/Redux/Feature/Api/ApiSlice";

interface ItemsProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: React.FC<ItemsProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  return (
    <MenuItem
      active={selected == title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!font-Poppins text-[16px] uppercase">
        {title}
      </Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const aSideBar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [selected, setSelected] = useState("dashboard");
  const { theme } = useTheme();
  const { isSuccess } = useLogoutUserQuery(undefined, {
    skip: logout ? false : true,
  });
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
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme == "dark" ? "#111c43 !important" : "#fff  !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `transparent !important`,
        },
        "& .pro-inner-item:hover": {
          color: `#8670fa !important`,
        },
        "& .pro-menu-item.active": {
          color: `#6870fa !important`,
        },
        "& .pro-inner-item": {
          padding: `5px 35px 20px !important`,
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme == "dark" && "#000"}`,
        },
      }}
      className={`!dark:bg-[#111c43] !bg-white`}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            icon={isCollapsed ? <ArrowForwardIos /> : undefined}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ margin: "10px 0 20px 0" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                ml="15px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Link href={`/`}>
                  <h3 className="text-[25px] uppercase dark:text-white text-black font-Poppins">
                    Lms
                  </h3>
                </Link>
                <IconButton
                  className="inline-block"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <ArrowBackwordIos className="dark:text-[#ffffffc1] text-black" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
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
              </Box>
              <Box textAlign={"center"}>
                <Typography
                  sx={{ m: "10px 0 0 0" }}
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                >
                  {user?.name}
                </Typography>{" "}
                <Typography
                  sx={{ m: "10px 0 0 0" }}
                  variant="h6"
                  className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="dashboard"
              to="/admin"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              sx={{ m: "15px 0 5px 25px" }}
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[400]"
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="users"
              to="/admin/users"
              icon={<Groups />}
              selected={selected}
              setSelected={setSelected}
            />{" "}
            <Item
              title="invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              sx={{ m: "15px 0 5px 25px" }}
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[400]"
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCall />}
              selected={selected}
              setSelected={setSelected}
            />{" "}
            <Item
              title="live course"
              to="/admin/course"
              icon={<OndemandVideo />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              sx={{ m: "15px 0 5px 25px" }}
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[400]"
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="hero"
              to="/admin/hero"
              icon={<Web />}
              selected={selected}
              setSelected={setSelected}
            />{" "}
            <Item
              title="faq"
              to="/admin/faq"
              icon={<Quiz />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              sx={{ m: "15px 0 5px 25px" }}
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[400]"
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="manage team"
              to="/admin/team"
              icon={<PeopleOutline />}
              selected={selected}
              setSelected={setSelected}
            />{" "}
            <Typography
              sx={{ m: "15px 0 5px 25px" }}
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[400]"
            >
              {!isCollapsed && "analytices"}
            </Typography>
            <Item
              title="courses analytices"
              to="/admin/courses-analytices"
              icon={<BarChartOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="orders analytices"
              to="/admin/orders-analytices"
              icon={<MapOutlined />}
              selected={selected}
              setSelected={setSelected}
            />{" "}
            <Item
              title="users analytices"
              to="/admin/users-analytices"
              icon={<ManageHistory />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              sx={{ m: "15px 0 5px 25px" }}
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize font-[400]"
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="settings"
              to="/admin/settings"
              icon={<Settings />}
              selected={selected}
              setSelected={setSelected}
            />
            <div>
              <Item
                title="logout"
                to="/"
                icon={<ExitToApp />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default aSideBar;
