"use client";
import React, { useEffect, useState } from "react";
import Projected from "../../hooks/useProjected";
import Heading from "@/app/utils/Heading";
import { useSelector } from "react-redux";
import SidebarProfile from "@/app/components/Profile/SidebarProfile";
import {
  useLoadUserQuery,
  useLogoutUserQuery,
} from "@/Redux/Feature/Api/ApiSlice";
import { signOut } from "next-auth/react";

import ProfileInfo from "@/app/components/Profile/ProfileInfo";
import ChangePassword from "@/app/components/Profile/ChangePassword";
import EnrolledCourse from "@/app/components/Profile/EnrolledCourse";
import {
  useGetAllCourseQuery,
  useGetCourseWithoutPurchaseQuery,
} from "@/Redux/Feature/Course/CourseApi";
import toast from "react-hot-toast";

const page = () => {
  const { data: userData } = useLoadUserQuery({});
  const [course, setCourse] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const { data } = useGetCourseWithoutPurchaseQuery({});
  const { isSuccess, error } = useLogoutUserQuery(undefined, {
    skip: logout ? false : true,
  });
  // -------logout-------
  const handleLogout = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.screenY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    if (data) {
      const filterCourse = userData?.user?.course
        .map((userCourse: any) =>
          data?.course?.find(
            (courseData: any) => courseData._id == userCourse?.courseId
          )
        )
        .filter((cou: any) => cou != undefined);
      setCourse(filterCourse);
    }
  }, [data, userData]);

  console.log(course);
  return (
    <div>
      <Projected>
        <Heading
          description="lms is a platform for students to learn and get help from teachers"
          keywords="mern lms"
          title={`${userData?.user?.name} profile`}
        />
        <div className={`w-[85%] flex mx-auto`}>
          <div
            className={`w-[60px] md:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border dark:border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px]  bg-white border-[#0000001c] mb-[80px] sticky ${
              scroll ? "top-[120px] " : "top-[30px]"
            }`}
          >
            <SidebarProfile
              user={userData?.user}
              active={active}
              setActive={setActive}
              avatar={avatar}
              handleLogout={handleLogout}
            />
          </div>
          <div className="w-full h-full bg-transparent mt-[80px]">
            {active == 1 && (
              <ProfileInfo user={userData?.user} avatar={avatar} />
            )}{" "}
            {active == 2 && <ChangePassword />}
            {active == 3 && <EnrolledCourse course={course} />}
          </div>
        </div>
      </Projected>
    </div>
  );
};

export default page;
