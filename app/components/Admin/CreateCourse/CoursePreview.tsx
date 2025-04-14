import React from "react";
import CoursePlayer from "./CoursePlayer";
import Ratings from "../../../hooks/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
interface Props {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isLoading: any;
  isEdit?: boolean;
}
const CoursePreview: React.FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isLoading,
  isEdit,
}) => {
  const discountPertange =
    ((courseData?.estimatePrice - courseData?.price) /
      courseData?.estimatePrice) *
    100;

  const handleCreateCourse = () => {
    handleCourseCreate();
  };
  return (
    <div className="w-[90%] py-5 mb-5 mx-auto">
      <div className="relative w-full">
        <div className="w-full mt-10">
          <CoursePlayer
            title={courseData?.title}
            videoUrl={courseData?.demoUrl}
          />
        </div>
        <div className="flex items-center">
          <h1 className="text-[25px] pt-5">
            {courseData?.price == 0 ? "Free" : courseData?.price}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 opacity-80 line-through">
            {courseData?.estimatePrice}
          </h5>
          <h4 className="pl-4 pt-5 text-[22px]">
            {discountPertange.toFixed(0)} % off
          </h4>
        </div>
        <div className="flex items-center">
          <div className="btn !w-[180px] my-3 !bg-[#DC143C] cursor-not-allowed font-Poppins">
            Buy Now {courseData?.price}$
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Coupon Code..."
            className="2xl:!w-[50%] lg:!w-[60%] ml-3 input-box"
          />
          <button className="!w-[120px] my-3 ml-4 cursor-pointer btn">
            Apply
          </button>
        </div>
        <div>
          <p className="pb-1">* Souce Code Incuded</p>
          <p className="pb-1">* Full Time Access</p>
          <p className="pb-1">* Certifaction of Compelation</p>
          <p className="pb-1">* Premium Support</p>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full md:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={2.7} />
              <h5>0 Review</h5>
            </div>
            <h5>0 Student</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            What You Learn From This Course
          </h1>
        </div>
        {courseData?.benefits.map((benefit: any, index: number) => {
          return (
            <div className="w-full flex md:items-center py-2">
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-1">{benefit.title}</p>
            </div>
          );
        })}

        <br />
        <br />

        <h1 className="text-[25px] font-Poppins font-[600]">
          What are the prerequisite for staring this course
        </h1>

        {courseData?.prerequisite.map((benefit: any, index: number) => {
          return (
            <div className="w-full flex md:items-center py-2">
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-1">{benefit.title}</p>
            </div>
          );
        })}
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>
          <p className="text-[18px] mt-[20px]  whitespace-pre-line w-full overflow-hidden">
            {" "}
            {courseData?.description}
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="flex w-full justify-between items-center">
        <button
          onClick={() => setActive(active - 1)}
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
        >
          Prev
        </button>

        <button
          onClick={handleCreateCourse}
          disabled={isLoading == true}
          className={`w-full md:w-[180px] h-[40px] bg-[#37a39a] flex items-center justify-center text-center text-white rounded mt-8 cursor-pointer disabled:cursor-default`}
        >
          {isLoading ? (
            <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
          ) : (
            <>{isEdit ? "Update " : "Create "}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
