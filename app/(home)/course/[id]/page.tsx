"use client";
import CourseDetails from "@/app/components/Course/CourseDetails";
import React from "react";

const page = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <CourseDetails id={id} />
    </div>
  );
};

export default page;
