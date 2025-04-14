import Heading from "@/app/utils/Heading";
import { useGetSingleCoursePurchaseQuery } from "@/Redux/Feature/Course/CourseApi";
import React, { useEffect, useState } from "react";
import CourseContentMedia from "./CourseContentMedia";
import CourseContentList from "./CourseContentList";

interface Props {
  id: string;
  user: any;
}
const CourseContent: React.FC<Props> = ({ id, user }) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetSingleCoursePurchaseQuery(id, { refetchOnMountOrArgChange: true });

  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="w-full md:flex">
          <Heading
            title={data[activeVideo]?.title}
            description="anythinh"
            keywords={data[activeVideo]?.tags}
          />
          <div className="md:w-[70%] w-full">
            <CourseContentMedia
              data={data}
              id={id}
              user={user}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              refetch={refetch}
            />
          </div>
          <div className="md:w-[30%] hidden md:block">
            <CourseContentList
              data={data}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
