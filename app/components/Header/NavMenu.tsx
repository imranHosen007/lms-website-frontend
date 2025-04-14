import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

export const navItemsData = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "courses",
    path: "/courses",
  },
  {
    name: "about",
    path: "/about",
  },
  {
    name: "policy",
    path: "/policy",
  },
  {
    name: "faq",
    path: "/faq",
  },
];

interface Props {
  activeItem: number;
  isMobile: boolean;
  handleClose?: any;
}

const NavMenu: React.FC<Props> = ({ activeItem, isMobile, handleClose }) => {
  const pathName = usePathname();
  return (
    <>
      {/* ---Pc-Menu---- */}
      <div className="hidden md:flex">
        {navItemsData &&
          navItemsData.map((item, index) => {
            return (
              <Link passHref href={item.path} key={index}>
                <span
                  className={`${
                    pathName == item.path
                      ? "dark:text-[#37a39a] text-[#DC143C]"
                      : "dark:text-white text-black"
                  } px-6 text-[18px] font-Poppins font-[400] `}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
      </div>
      {/* ---Mobile-Nav-Menu--- */}
      {isMobile && (
        <div className="md:hidden mt-5">
          <div className="flex justify-end ">
            {" "}
            <span onClick={() => handleClose()}>
              {" "}
              <IoCloseOutline
                size={25}
                className="text-black dark:text-white cursor-pointer"
              />
            </span>
          </div>
          <div className="w-full text-center py-6">
            <Link
              href={`/`}
              className="text-[25px] text-black font-Poppins  dark:text-white"
            >
              Lms
            </Link>
          </div>
          <div className="flex flex-col gap-6 ">
            {navItemsData &&
              navItemsData.map((item, index) => {
                return (
                  <Link passHref href={item.path} key={index}>
                    <span
                      className={`${
                        pathName == item.path
                          ? "dark:text-[#306662] text-[#DC143C]"
                          : "dark:text-white text-black"
                      } px-6 text-[18px] font-Poppins font-[400] `}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default NavMenu;
