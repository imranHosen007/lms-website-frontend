"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import { useCreateCourseMutation } from "@/Redux/Feature/Course/CourseApi";
import CoursePreview from "./CoursePreview";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const CreateCourse = () => {
  const [createCourse, { isSuccess, isLoading, error }] =
    useCreateCourseMutation();
  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatePrice: "",
    tags: "",
    level: "",
    thumbnail: "",
    demoUrl: "",
    category: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisite, setPrerequisite] = useState([{ title: "" }]);

  const [courseContent, setCourseContent] = useState([
    {
      title: "",
      videoUrl: "",
      description: "",
      videoLength: "",
      videoSection: "Untitle Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    const benefitsFormated = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    const prerequisiteFormated = prerequisite.map((benefit) => ({
      title: benefit.title,
    }));

    // -----FormatedCourseData--------
    const formatedCourseContent = courseContent.map((item) => ({
      title: item.title,
      suggestion: item.description,
      videoUrl: item.videoUrl,
      description: item.description,
      videoSection: item.videoSection,
      videoLength: item.videoLength,
      links: item.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
    }));

    // -----Prepare-Data-Object------
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatePrice: courseInfo.estimatePrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      thumbnail: courseInfo.thumbnail,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContent.length,
      prerequisite: prerequisiteFormated,
      benefits: benefitsFormated,
      courseData: formatedCourseContent,
      category: courseInfo.category,
    };

    setCourseData(data);
  };

  // -----Create-Course-------
  const handleCourseCreate = async () => {
    const data = courseData;
    await createCourse(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Course Create SuccessFull`);
      redirect(`/admin/course`);
    }
    if (error) {
      if ("data" in error) {
        const errrorData = error as any;
        toast.error(errrorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);
  return (
    <div className="w-full h-screen flex">
      <div className="w-[80%]">
        {active == 0 && (
          <CourseInformation
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )}
        {active == 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisite={prerequisite}
            setPrerequisite={setPrerequisite}
            active={active}
            setActive={setActive}
          />
        )}
        {active == 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            setCourseContent={setCourseContent}
            courseContent={courseContent}
            handleSubmit={handleSubmit}
          />
        )}
        {active == 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
            courseData={courseData}
            isLoading={isLoading}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
