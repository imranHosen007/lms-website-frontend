"use client";
import {
  useEditLayoutMutation,
  useGetLayoutQuery,
} from "@/Redux/Feature/Layout/LayoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";

const Faq = () => {
  const {
    data,
    refetch,
    isLoading: loading,
  } = useGetLayoutQuery("faq", {
    refetchOnMountOrArgChange: true,
  });
  const [EditLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();
  const [question, setQuestion] = useState([]) as any;

  // ---Handle-Question-change---
  const handleQuestionChange = (key: number, value: any) => {
    setQuestion((prevQuestion: any) =>
      prevQuestion.map((q: any, index: number) =>
        index == key ? { ...q, question: value } : q
      )
    );
  };

  // -------Handle-Answar-Change-------
  const handleAnswarChange = (key: number, value: any) => {
    setQuestion((prevQuestion: any) =>
      prevQuestion.map((q: any, index: number) =>
        index == key ? { ...q, answar: value } : q
      )
    );
  };
  // --------Hnalde-Delete-------
  const handleDelete = (key: number) => {
    console.log(key);
    if (question.length !== 1) {
      setQuestion((prev: any) =>
        prev.filter((c: any, index: number) => index != key)
      );
    } else {
      toast.error(`Cant Delete All Faq`);
    }
  };
  //  ---------Handle-Toggle-Change------
  const toggleQuestion = (id: any) => {
    setQuestion((prevQuestion: any) =>
      prevQuestion.map((q: any, index: number) =>
        index == id ? { ...q, active: !q.active } : q
      )
    );
  };

  // -----Add-New-Faq-----

  const NewFaqHanlder = () => {
    setQuestion([
      ...question,
      {
        question: "",
        answar: "",
      },
    ]);
  };

  // ------Function-To-Check-Faq-Unchange--------

  const areQuestionChange = (orginalQuestion: any, newQuestion: any) => {
    return JSON.stringify(orginalQuestion) === JSON.stringify(newQuestion);
  };

  // ------Question-Is-empty------
  const questionEmpty = (question: any) => {
    return question.some((q: any) => q.question == "" || q.answar == "");
  };
  // ------Handle-Edit------

  const handleEdit = async (e: any) => {
    const data = {
      type: "faq",
      faq: question,
    };

    await EditLayout(data);
  };

  // ------UseEffect-------

  useEffect(() => {
    if (data) {
      setQuestion(data?.layout?.faq);
    }
    if (isSuccess) {
      toast.success(`Faq Updated SuccesFull`);
      refetch();
    }

    if (error) {
      if ("data" in error) {
        const errrorData = error as any;
        toast.error(errrorData.data.message);
      }
    }
  }, [data, isSuccess, error, isLoading]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="w-[90%] md:w-[80%] m-auto mt-[120px]">
          <div className="mt-12">
            <div className="space-y-8">
              {question &&
                question.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`pt-6 border-gray-200 ${
                        item._id !== question[0]?._id && "border-t"
                      }`}
                    >
                      <button
                        onClick={() => toggleQuestion(index)}
                        className="flex items-start dark:text-white text-black justify-between w-full text-text focus:outline-none"
                      >
                        <input
                          type="text"
                          className="input-box border-none"
                          value={item.question}
                          onChange={(e: any) =>
                            handleQuestionChange(index, e.target.value)
                          }
                          placeholder="Add Your Question"
                        />
                        <span className="ml-6 cursor-pointer">
                          {item.active ? (
                            <HiMinus className="h-6 w-6" />
                          ) : (
                            <HiPlus className="h-6 w-6" />
                          )}
                        </span>
                      </button>
                      {item.active && (
                        <div className="mt-2 pr-12">
                          <input
                            type="text"
                            className="input-box border-none"
                            value={item.answar}
                            onChange={(e: any) =>
                              handleAnswarChange(index, e.target.value)
                            }
                            placeholder="Add Your Answar"
                          />
                          <span className="ml-6 cursor-pointer">
                            <AiOutlineDelete
                              onClick={() => handleDelete(index)}
                              //           className="dark:text-white text-black text-[18px] cursor-pointer"
                            />
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              <br />
              <br />
              <IoMdAddCircleOutline
                onClick={NewFaqHanlder}
                className="dark:text-white  text-black text-[25px] cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-end ">
            {" "}
            <button
              disabled={isLoading}
              onClick={
                questionEmpty(question) ||
                areQuestionChange(data?.layout?.faq, question)
                  ? () => null
                  : handleEdit
              }
              className={`!w-[100px] !rounded mt-12 !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                questionEmpty(question) ||
                areQuestionChange(data?.layout?.faq, question)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-[#42d383]"
              }`}
            >
              {isLoading ? (
                <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Faq;
