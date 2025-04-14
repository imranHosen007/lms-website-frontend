import React, { useState } from "react";
import CoursePlayer from "../Admin/CreateCourse/CoursePlayer";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { useGetSingleCourseWithoutPurchaseQuery } from "@/Redux/Feature/Course/CourseApi";

import Question from "./Question";
import AddReview from "./AddReview";
interface Props {
  data: any;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  id: string;
  user: any;
  refetch: any;
}
const CourseContentMedia: React.FC<Props> = ({
  data,
  activeVideo,
  setActiveVideo,
  user,
  id,
  refetch,
}) => {
  const [activeBar, setActiveBar] = useState(0);

  const { data: courseData, refetch: courseDetailsRefetch } =
    useGetSingleCourseWithoutPurchaseQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  // ---------Review-Extis--------
  const isReviewExtis = courseData?.course?.review?.find((item: any) => {
    return item?.user?._id == user?._id;
  });

  return (
    <div className="w-[95%] md:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center my-3 justify-between">
        <div
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
          className={`btn  !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo == 0 && "opacity-[.8] cursor-no-drop"
          }`}
        >
          <span className="flex items-center">
            {" "}
            <AiOutlineLeft className="mr-2" />
            Previous Lession
          </span>
        </div>{" "}
        <div
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
          className={`btn !w-[unset] flex !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "opacity-[.8] cursor-no-drop"
          }`}
        >
          <span className="flex items-center">
            Next Lession
            <AiOutlineRight className="mr-2" />
          </span>
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600]">
        {data[activeVideo]?.title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center bg-slate-500 bg-opacity-20 backdrop-blur rounded shadow-inner shadow-slate-700 justify-between !text-white">
        {["Overview", "Resouces", "Q&A", "Reviews"].map(
          (text: string, index: number) => {
            return (
              <h5
                onClick={() => setActiveBar(index)}
                className={`md:text-[20px] cursor-pointer ${
                  activeBar == index && "text-red-500"
                }`}
                key={index}
              >
                {text}
              </h5>
            );
          }
        )}
      </div>
      <br />
      {activeBar == 0 && (
        <div className="text-[18px] mb-3 whitespace-pre-line">
          {data[activeVideo]?.description}
        </div>
      )}
      {activeBar == 1 && (
        <div>
          {data[activeVideo]?.links?.map((link: any, index: number) => {
            return (
              <div key={index} className="mb-5">
                <h2 className="md:text-[20px] md:inline-block">
                  {link?.title ? link?.title : ""}
                </h2>
                <a
                  href={link.url}
                  className="inline-block text-[#4395c4] md:text-[20px] md:pl-2"
                >
                  {link.url}
                </a>
              </div>
            );
          })}
        </div>
      )}
      {activeBar == 2 && (
        <Question
          id={id}
          data={data}
          refetch={refetch}
          activeVideo={activeVideo}
          user={user}
        />
      )}

      {activeBar == 3 && (
        <div className="w-full">
          <AddReview
            id={id}
            data={data}
            activeVideo={activeVideo}
            user={user}
            refetch={refetch}
            isReviewExtis={isReviewExtis}
            reviewData={courseData?.course?.review}
            courseDetailsRefetch={courseDetailsRefetch}
          />
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
