import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
  active: number;
  setActive: (active: number) => void;
}
const CourseOptions: React.FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div>
      {options.map((options, index) => {
        return (
          <div key={index} className="w-full flex py-5">
            <div
              className={`w-[35px] h-[35px] rounded-full flex  items-center justify-center relative ${
                active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
              }`}
            >
              <IoMdCheckmark className="text-[25px]" />
              {index !== options.length - 1 && (
                <div
                  className={`w-1 h-[30px]  absolute bottom-[-100%] ${
                    active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                  }`}
                ></div>
              )}
            </div>
            <h5
              className={`pl-3 text-[20px] ${
                active == index
                  ? "dark:text-white text-black"
                  : "dark:text-white text-black"
              }`}
            >
              {options}
            </h5>
          </div>
        );
      })}
    </div>
  );
};

export default CourseOptions;
