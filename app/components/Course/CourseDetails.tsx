import Ratings from "@/app/hooks/Ratings";
import { useGetSingleCourseWithoutPurchaseQuery } from "@/Redux/Feature/Course/CourseApi";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CoursePlayer from "../Admin/CreateCourse/CoursePlayer";
import Link from "next/link";
import CourseContentList from "./CourseContentList";
import Payment from "../Payment/Payment";
import { useLoadUserQuery } from "@/Redux/Feature/Api/ApiSlice";
import Image from "next/image";
import Avatar from "../../../public/user.png";
import toast from "react-hot-toast";
interface Props {
  id: any;
}
const CourseDetails: React.FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetSingleCourseWithoutPurchaseQuery(id);
  const { data: userData, isLoading: UserLoading } = useLoadUserQuery(
    undefined,
    {}
  );

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null) as any;

  // ------DiscountPrice----------
  const discountPercentage =
    ((data?.course?.estimatePrice - data?.course.price) /
      data?.course?.estimatePrice) *
    100;
  const discountPrice = discountPercentage.toFixed(2);

  // --------isPurchaseed---------
  const isPurchaseed = user?.course?.find(
    (item: any) => item.courseId == data?.course?._id
  );

  // -------Handle-Order-------
  const handleOrder = () => {
    if (user) {
      setOpen(true);
    } else {
      toast.error(`Please Login First`);
    }
  };

  useEffect(() => {
    if (userData) {
      setUser(userData?.user);
    }
  }, [userData, UserLoading, user]);
  return (
    <>
      {isLoading || UserLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="w-[90%] m-auto py-5 text-black dark:text-white">
          <div className="flex-col-reverse w-full flex  md:flex-row">
            {/* ------Course-Left-Side--------- */}
            <div className="w-full md:w-[65%] md:pr-5">
              <h1 className="text-[25px] font-[600] text-black dark:text-white font-Poppins">
                {data?.course?.name}
              </h1>
              <div className="flex items-center pt-3 justify-between">
                <div className="flex items-center">
                  <Ratings rating={data?.course?.ratings} />
                  <h5 className="dark:text-white text-black">
                    {data?.course?.ratings?.length}
                  </h5>
                </div>
                <h5 className="dark:text-white text-black">
                  {data?.course?.purchase} Students
                </h5>
              </div>
              <br />
              <h1 className="text-[25px] font-[600] text-black dark:text-white font-Poppins">
                What You Will Learn From This Course?
              </h1>
              <div>
                {data?.course?.benefits?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="w-full flex md:items-center py-2"
                    >
                      <div className="w-[15px] pr-1">
                        {" "}
                        <IoCheckmarkOutline
                          size={20}
                          className="dark:text-white text-black"
                        />
                      </div>
                      <p className="pl-2 text-black dark:text-white">
                        {item?.title}
                      </p>
                    </div>
                  );
                })}
                <br />
                <br />
              </div>
              <div>
                <h1 className="text-[25px] font-Poppins font-[600] dark:text-white dark:black">
                  What are the prerequisite for staring this course
                </h1>
                {data?.course?.prerequisite.map(
                  (benefit: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex md:items-center py-2"
                      >
                        <div className="w-[15px] mr-1">
                          <IoCheckmarkDoneOutline size={20} />
                        </div>
                        <p className="pl-2 text-black dark:text-white">
                          {benefit.title}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
              <br />
              <br />
              <div>
                <h1 className="text-[25px] font-Poppins font-[600] dark:text-white dark:black">
                  Course Overview
                </h1>
                {/* -------Course-Content------- */}
                <CourseContentList
                  data={data?.course?.courseData}
                  isDemo={true}
                />
              </div>
              <br />
              <br />
              <div className="w-full"></div>
              <h1 className="text-[25px] font-Poppins font-[600] dark:text-white dark:black">
                Course Description
              </h1>
              <p className="whitespace-pre-line text-[18px] mt-[20px] w-full text-black dark:text-white overflow-hidden">
                {data?.course?.description}
              </p>
              <br />
              <br />{" "}
              <div className="w-full ">
                <div className="md:flex items-center">
                  <Ratings rating={data?.course?.ratings} />
                  <div className="mb-2 md:mb-[unset]">
                    <h5 className="dark:text-white text-black">
                      {Number.isInteger(data?.course?.ratings)
                        ? data?.course?.ratings.toFixed(1)
                        : data?.course?.ratings.toFixed(2)}
                      Course Ratings * {data?.course?.review?.length} Reviews
                    </h5>
                  </div>
                </div>

                <br />
                {data?.course?.review &&
                  [...data?.course?.review]
                    .toReversed()
                    .map((item: any, index: number) => {
                      return (
                        <div key={index} className="w-full pb-4">
                          <div className="flex">
                            <div>
                              {" "}
                              <Image
                                width={50}
                                height={50}
                                src={
                                  item?.user?.avatar
                                    ? item?.user?.avatar?.url
                                    : Avatar
                                }
                                alt="user image not found"
                                className="rounded-full w-[50px] h-[50px] object-cover"
                              />
                            </div>
                            <div className="hidden md:block pl-2">
                              <div className="flex items-center ">
                                <h1 className="text-[18px] uppercase text-black dark:text-white">
                                  {item?.user?.name}
                                </h1>
                                <Ratings rating={item.rating} />
                              </div>
                              <p className="dark:text-white text-black">
                                {item.review}
                              </p>
                              <small className="text-[#000000d1] dark:text-[#ffffff83]">
                                {format(item?.createdAt)}
                              </small>
                            </div>
                            <div className="pl-2 flex md:hidden items-center">
                              <h1 className="text-[18px] uppercase text-black dark:text-white">
                                {item?.user?.name}
                              </h1>
                              <Ratings rating={item.rating} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
            {/* ----------Course-Right-Side------- */}
            <div className="w-full md:w-[35%]  relative">
              <div className="top-[100px] left-0 z-50 w-full">
                <CoursePlayer
                  title={data?.course?.title}
                  videoUrl={data?.course?.demoUrl}
                />
                <div className="flex items-center">
                  <h1 className="pt-5 text-[25px] text-black dark:text-white">
                    {data?.course?.price == 0
                      ? "Free"
                      : `${data?.course?.price}`}
                  </h1>
                  <h5 className="pl-3 text-[20px] mt-2 opacity-80 text-black dark:text-white line-through">
                    ${data?.course?.estimatePrice}
                  </h5>
                  <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                    {discountPercentage.toFixed(2)}% Off
                  </h4>
                </div>
                <div className="flex items-center">
                  {user?.role == "admin" && (
                    <Link
                      href={`/course-access/${data?.course?._id}`}
                      className="!w-[200px] !my-3 !cursor-pointer !rounded-md btn !text-white !bg-[#DC143C]"
                    >
                      View Course
                    </Link>
                  )}
                  {isPurchaseed && (
                    <Link
                      href={`/course-access/${data?.course?._id}`}
                      className="!w-[200px] !my-3 !cursor-pointer !rounded-md btn !text-white !bg-[#DC143C]"
                    >
                      Enter To Course
                    </Link>
                  )}
                  {!isPurchaseed && user?.role != "admin" && (
                    <button
                      onClick={handleOrder}
                      className="!w-[200px] !my-3 !cursor-pointer !text-white  !rounded-md btn !bg-[#DC143C]"
                    >
                      Buy Now ${data?.course?.price}
                    </button>
                  )}
                </div>
                <div>
                  <p className="pb-1">* Souce Code Incuded</p>
                  <p className="pb-1">* Full Time Access</p>
                  <p className="pb-1">* Certifaction of Compelation</p>
                  <p className="pb-1">* Premium Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>{open && <Payment setOpen={setOpen} data={data} user={user} />}</div>
    </>
  );
};

export default CourseDetails;
