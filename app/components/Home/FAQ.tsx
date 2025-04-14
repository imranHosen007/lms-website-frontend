import { useGetLayoutQuery } from "@/Redux/Feature/Layout/LayoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

const FAQ = () => {
  const { data } = useGetLayoutQuery("faq", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState([]) as any;

  //   ------Toggle-Question--------

  const handleToggle = (id: any) => {
    setActiveQuestion(activeQuestion == id ? null : id);
  };
  useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq);
    }
  }, [data]);
  return (
    <div className="w-[90%] md:w-[85%] mx-auto">
      <div>
        <h1 className="title md:text-[40px]">Frequently Asked Questions</h1>
        {questions &&
          questions.map((item: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => handleToggle(item._id)}
                className={`py-6 cursor-pointer border-gray-200 ${
                  item._id != questions[0]?._id && "border-t  "
                }`}
              >
                <button className="flex items-start w-full text-left focus:outline-none justify-between ">
                  <span className="font-medium text-black dark:text-white">
                    {item.question}
                  </span>

                  <span className="ml-6 cursor-pointer">
                    {activeQuestion == item._id ? (
                      <HiMinus className="h-6 w-6" />
                    ) : (
                      <HiPlus className="h-6 w-6" />
                    )}
                  </span>
                </button>
                {activeQuestion == item._id && (
                  <div className="mt-2 pr-12">
                    <p className="text-base text-black dark:text-white  font-Poppins">
                      {item.answar}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FAQ;
