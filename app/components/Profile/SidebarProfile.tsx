import Image from "next/image";
import React from "react";
import NotAvatar from "../../../public/user.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
interface Props {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  handleLogout: any;
}
const SidebarProfile: React.FC<Props> = ({
  user,
  active,
  setActive,
  avatar,
  handleLogout,
}) => {
  return (
    <div className="w-full">
      <div
        onClick={() => setActive(1)}
        className={`w-full flex items-center px-4 py-3 cursor-pointer ${
          active == 1 ? "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
        }`}
      >
        <Image
          width={30}
          height={30}
          src={user?.avatar?.url ? user.avatar?.url : NotAvatar}
          alt="user profile"
          className="md:w-[30px] md:h-[30px] w-[20px] h-[20px] rounded-full cursor-pointer"
        />
        <h5 className="pl-2 hidden md:block font-Poppins dark:text-white text-black">
          My Account
        </h5>
      </div>
      <div
        onClick={() => setActive(2)}
        className={`w-full flex items-center px-4 py-3 cursor-pointer ${
          active == 2 ? "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
        }`}
      >
        <RiLockPasswordLine size={20} />
        <h5 className="pl-2 hidden md:block font-Poppins dark:text-white text-black">
          Change Password
        </h5>
      </div>
      <div
        onClick={() => setActive(3)}
        className={`w-full flex items-center px-4 py-3 cursor-pointer ${
          active == 3 ? "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
        }`}
      >
        <SiCoursera size={20} />
        <h5 className="pl-2 hidden md:block font-Poppins dark:text-white text-black">
          Enrolled Courses
        </h5>
      </div>
      {user && user?.role == "admin" && (
        <Link
          href={`/admin`}
          className={`w-full flex items-center px-4 py-3 cursor-pointer "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
      }`}
        >
          <MdOutlineAdminPanelSettings size={20} />
          <h5 className="pl-2 hidden md:block font-Poppins dark:text-white text-black">
            Admin Dashboard
          </h5>
        </Link>
      )}
      <div
        onClick={() => handleLogout()}
        className={`w-full flex items-center px-4 py-3 cursor-pointer ${
          active == 4 ? "dark:bg-slate-800 bg-gray-300" : "bg-transparent"
        }`}
      >
        <AiOutlineLogout size={20} />
        <h5 className="pl-2 hidden md:block font-Poppins dark:text-white text-black">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
