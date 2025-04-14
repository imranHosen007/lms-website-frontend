import React from "react";
import CourseCard from "../Home/CourseCard";
interface Props {
  course: any;
}
const EnrolledCourse: React.FC<Props> = ({ course }) => {
  return (
    <div className="w-full pl-3 px-2 mx:px-10 md:pl-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-[20px] md:gap-[25px] 2xl:gap-[30px] mb-12 border-0">
        {course && course.length == 0 && (
          <h4 className="text-center text-[18px] font-Poppins dark:text-white text-black">
            You Dont Have Any Purchases Courses!
          </h4>
        )}
        {course?.map((item: any, index: number) => {
          return <CourseCard item={item} key={index} isProfile={true} />;
        })}
      </div>
    </div>
  );
};

export default EnrolledCourse;
