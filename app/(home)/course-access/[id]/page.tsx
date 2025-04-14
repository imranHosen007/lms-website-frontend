"use client";

import CourseContent from "@/app/components/Course/CourseContent";
import { useLoadUserQuery } from "@/Redux/Feature/Api/ApiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const page = ({ params }: any) => {
  const id = params.id;
  const { data, isLoading, error } = useLoadUserQuery({});

  useEffect(() => {
    const isPurchaseed =
      data?.user &&
      data?.user?.course?.find((item: any) => item.courseId == id);

    if (data?.user?.role != "admin" && !isPurchaseed) {
      redirect(`/`);
    }
    if (error) {
      redirect(`/`);
    }
  }, [data, isLoading]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <CourseContent id={id} user={data?.user} />
        </div>
      )}
    </div>
  );
};

export default page;
