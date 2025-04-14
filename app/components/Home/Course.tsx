"use client";
import { useGetCourseWithoutPurchaseQuery } from "@/Redux/Feature/Course/CourseApi";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const Course = () => {
  const { data, isLoading } = useGetCourseWithoutPurchaseQuery({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (data) {
      setCourses(data?.course);
    }
  }, [data, isLoading]);

  if (data?.length == 0) {
    return <div>Course Emtpy</div>;
  }
  return (
    <div className={`w-[90%] md:w-[80%] m-auto my-6 lg:my-0`}>
      <h1 className="text-[25px] sm:text-3xl lg:text-4xl dark:text-white text-black md:!leading-[60px] font-[700] tracking-tight text-center font-Poppins">
        Expend Your Carrer <span className="text-[#39c1f3] ">Opportunity</span>{" "}
        <br /> Opportunity With Our Courses
      </h1>
      <br />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[20px] md:gap-[25px] 2xl:gap-[30px] mb-12 border-0">
        {courses &&
          courses?.map((item, index) => {
            return <CourseCard item={item} key={index} />;
          })}
      </div>
    </div>
  );
};

export default Course;
