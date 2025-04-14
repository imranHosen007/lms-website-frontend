"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";

import {
  HiOutlineMenuAlt1,
  HiOutlineMenuAlt3,
  HiOutlineUserCircle,
} from "react-icons/hi";
import CustomModal from "../Modal/CustomModal";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import Verifaction from "../Auth/Verifaction";

import Image from "next/image";
import avatar from "../../../public/user.png";
import { useSoicalAuthMutation } from "@/Redux/Feature/Auth/AuthApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { usePathname } from "next/navigation";
import { useLoadUserQuery } from "@/Redux/Feature/Api/ApiSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("login");
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const { user } = useSelector((store: any) => store.auth);
  const [loadUser, setLoadUser] = useState(false);
  const { refetch } = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });
  const [soicalAuth, { isSuccess, error, isLoading }] = useSoicalAuthMutation();

  const { data } = useSession();

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.screenY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  // -------Handle-Close------
  const handleClose = (e: any) => {
    setOpenSideBar(false);
  };

  // --------UseEffect---------

  useEffect(() => {
    if (!user) {
      if (data) {
        soicalAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
  }, [user, data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Auth Login SucessFull`);
      setLoadUser(true);
    } else if (error) {
      if ("data" in error) {
        const errrorData = error as any;
        toast.error(errrorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] dark:border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full dark:border-[#ffffff1c] border-b h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] p-3 flex justify-between items-center">
            {/* ----Header-left---- */}
            <div>
              <Link
                href={`/`}
                className="text-[25px] text-black font-Poppins  dark:text-white"
              >
                Lms
              </Link>
            </div>
            {/* -----Header-Right---- */}
            <div className="flex items-center">
              <NavMenu isMobile={false} activeItem={activeItem} />
              <ThemeSwitcher />
              {/* ---Only-For-Mobile-Screen--- */}
              <div className="md:hidden">
                {openSideBar ? (
                  <HiOutlineMenuAlt1
                    className="cursor-pointer text-black dark:text-white"
                    onClick={() => setOpenSideBar(false)}
                    size={25}
                  />
                ) : (
                  <HiOutlineMenuAlt3
                    className="cursor-pointer text-black dark:text-white"
                    onClick={() => setOpenSideBar(true)}
                    size={25}
                  />
                )}
              </div>
              {user ? (
                <Link href={`/profile`}>
                  <Image
                    width={30}
                    height={30}
                    src={user?.avatar?.url ? user.avatar?.url : avatar}
                    alt="user profile"
                    className={`w-[30px] h-[30px] rounded-full cursor-pointer ${
                      pathName == "/profile" &&
                      "border-[2px] border-[#DC143C] dark:border-[#306662] border-solid "
                    }`}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  className="cursor-pointer text-black dark:text-white hidden md:block"
                  onClick={() => setOpen(true)}
                  size={25}
                />
              )}
            </div>
          </div>
        </div>
        {/* ------Mobile-Sidebar---- */}
        {openSideBar && (
          <div
            className="fixed md:hidden w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#00000024]"
            id="screen"
          >
            <div className="w-[70%] fixed h-screen dark:bg-opacity-90 bg-white top-0 right-0 dark:bg-slate-900 z-[999999]">
              <NavMenu
                isMobile={true}
                activeItem={activeItem}
                handleClose={handleClose}
              />
            </div>
          </div>
        )}
      </div>
      {route == "login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}{" "}
      {route == "sign-up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}{" "}
      {route == "verifaction" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verifaction}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
