"use client";

import CourseCard from "@/app/components/Home/CourseCard";
import Heading from "@/app/utils/Heading";
import {
  useGetAllCourseQuery,
  useGetCourseWithoutPurchaseQuery,
} from "@/Redux/Feature/Course/CourseApi";
import { useGetLayoutQuery } from "@/Redux/Feature/Layout/LayoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const searchParms = useSearchParams();
  const search = searchParms?.get("title");
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("all");
  const { data: categoryData, isLoading: categoryLoading } = useGetLayoutQuery(
    "category",
    {}
  );
  const { data, isLoading } = useGetCourseWithoutPurchaseQuery({});

  // -------Filter-Logic--------
  useEffect(() => {
    if (category == "all") {
      setCourses(data?.course);
    }
    if (category !== "all") {
      const filterCategory = data?.course?.filter((item: any) => {
        return item.category == category;
      });
      setCourses(filterCategory);
    }
    if (search) {
      const filterCategory = data?.course?.filter((item: any) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
      if (category == "all") {
        setCourses(filterCategory);
      }
      if (category !== "all") {
        const filterSearchCategory = filterCategory.filter((item: any) => {
          return item.category == category;
        });
        setCourses(filterSearchCategory);
      }
    }
  }, [data, search, category]);
  return (
    <div>
      {isLoading || categoryLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="w-[95%] md:w-[85%] m-auto min-h-[70vh]">
          <Heading
            title="All Course - Lms"
            description="Lms is a programming Community"
            keywords="Programming Community,Coding Skills,exprt ingisghts,growth"
          />
          <br />
          <div className="flex items-center w-full flex-wrap">
            <div
              onClick={() => setCategory("all")}
              className={`h-[35px] m-3 px-3 text-white rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer ${
                category == "all" ? "bg-[#DC143C]" : "bg-[#5050cb]"
              }`}
            >
              All
            </div>
            {categoryData?.layout?.category &&
              categoryData?.layout?.category?.map(
                (item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setCategory(item.title)}
                      className={`h-[35px] text-white m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer ${
                        category == item.title ? "bg-[#DC143C]" : "bg-[#5050cb]"
                      }`}
                    >
                      {item.title}
                    </div>
                  );
                }
              )}
          </div>
          <br />
          <br />
          {courses && courses.length == 0 && (
            <p className="label justify-center min-h-[50vh] flex items-center">
              {search
                ? "No Couses Found!"
                : "No Courses Found in this category.Please Try Another One"}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[20px] md:gap-[25px] 2xl:gap-[30px] mb-12 border-0">
            {courses &&
              courses.map((item, index) => {
                return <CourseCard item={item} key={index} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
