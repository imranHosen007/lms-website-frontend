"use client";

import {
  useEditLayoutMutation,
  useGetLayoutQuery,
} from "@/Redux/Feature/Layout/LayoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";

const Category = () => {
  const {
    data,
    refetch,
    isLoading: loading,
  } = useGetLayoutQuery("category", {
    refetchOnMountOrArgChange: true,
  });
  const [EditLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();
  const [category, setCategory] = useState([]) as any;

  //   -------handle-Category------
  const handleCategoryChange = (key: number, value: any) => {
    setCategory((prev: any) =>
      prev.map((c: any, index: number) =>
        index == key ? { ...c, title: value } : c
      )
    );
  };

  // -------Handle-Delete--------
  const handleDelte = (key: number) => {
    if (category.length !== 1) {
      setCategory((prev: any) =>
        prev.filter((c: any, index: number) => index !== key)
      );
    } else {
      toast.error(`Cant Delete All Category`);
    }
  };
  //   ------newCategoryHanlder-----
  const newCategoryHanlder = () => {
    if (category[category.length - 1].title == "") {
      return toast.error(`Category Title Cant Be Empty`);
    }
    setCategory((prev: any) => [
      ...prev,
      {
        title: "",
      },
    ]);
  };

  // ------Function-To-Check-Faq-Unchange--------

  const areCategoryChange = (orginalCategory: any, newCategory: any) => {
    return JSON.stringify(orginalCategory) === JSON.stringify(newCategory);
  };

  // ------Question-Is-empty------
  const CategoryEmpty = (category: any) => {
    return category.some((q: any) => q.title == "");
  };

  //   -----Handle-Edit------
  const handleEdit = async () => {
    const data = {
      type: "category",
      category,
    };

    await EditLayout(data);
  };

  useEffect(() => {
    if (data) {
      setCategory(data?.layout?.category);
    }
    if (isSuccess) {
      toast.success(`Category Updated SuccesFull`);
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
        <div className="mt-[120px] text-center">
          <h1 className="title">All Categories</h1>
          {category &&
            category?.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleCategoryChange(index, e.target.value)
                      }
                      className="!w-[unset] !border-none !text-[20px] input-box"
                      placeholder="Enter Category Title"
                    />
                    <AiOutlineDelete
                      onClick={() => handleDelte(index)}
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              onClick={newCategoryHanlder}
              className="dark:text-white  text-black text-[25px] cursor-pointer"
            />
          </div>
          <div className="flex justify-center ">
            <button
              disabled={isLoading}
              onClick={
                CategoryEmpty(category) ||
                areCategoryChange(data?.layout?.category, category)
                  ? () => null
                  : handleEdit
              }
              className={`!w-[100px] !rounded mt-12 !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                CategoryEmpty(category) ||
                areCategoryChange(data?.layout?.category, category)
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

export default Category;
