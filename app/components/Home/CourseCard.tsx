import Ratings from "@/app/hooks/Ratings";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

interface Props {
  item: any;

  isProfile?: boolean;
}
const CourseCard: React.FC<Props> = ({ isProfile, item }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opactiy-20 backdrop-blue border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-slate-700 rounded-lg p-3 shadow-sm dark:shadow-inner">
        <Image
          objectFit="contain"
          className="rounded w-full h-[300px]"
          src={item?.thumbnail?.url}
          alt="thumbnail missing"
          width={500}
          height={300}
        />
        <br />
        <h1 className="text-[16px] text-black dark:text-white font-Poppins">
          {item.name}
        </h1>
        <div className="w-full flex justify-between items-center pt-2">
          <Ratings rating={item?.ratings} />
          <h5
            className={`text-black dark:text-white ${
              isProfile && "hidden md:inline"
            }`}
          >
            {item?.purchase} Students
          </h5>
        </div>
        <div className="w-full flex justify-between items-center pt-3">
          <div className="flex">
            <h1 className="text-black dark:text-white">
              {item?.price == 0 ? "Free" : item?.price}
            </h1>
            <h5 className="pl-3 text-[14px] mt-[-5px] text-black dark:text-white opacity-80 line-through">
              {item?.estimatePrice}
            </h5>
          </div>{" "}
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="$fff" />
            <h5 className="pl-2  text-black dark:text-white  ">
              {item?.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
