import Ratings from "@/app/hooks/Ratings";
import Image from "next/image";
import React from "react";

interface Props {
  item: any;
}
const ReviewCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="w-full h-max pb-4 dark:bg-slate-500 dark:bg-opactiy-[0.20] border border-[#00000028] dark:border-[#ffffff1d]  backdrop-blur  rounded-lg p-3 shadow-inner">
      <div className="flex w-full">
        <Image
          width={50}
          height={50}
          alt="image not found"
          src={item.avarar}
          className="w-[50px] h-[50px] rounded-full object-contain"
        />
        <div className="md:flex justify-between hidden w-full ">
          <div className="pl-4">
            <h5 className="text-[20px] text-black dark:text-white">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-black dark:text-[#ffffffab]">
              {item.comment}
            </h6>
          </div>
          <Ratings rating={item.rating} />
        </div>{" "}
        <div className="md:hidden justify-between w-full flex-col ">
          <div className="pl-4">
            <h5 className="text-[20px] text-black dark:text-white">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-black dark:text-[#ffffffab]">
              {item.comment}
            </h6>
          </div>
          <Ratings rating={item.rating} />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
