"use client";

import {
  useEditLayoutMutation,
  useGetLayoutQuery,
} from "@/Redux/Feature/Layout/LayoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

const Hero = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [image, setImage] = useState("");
  const {
    data,
    refetch,
    isLoading: loading,
  } = useGetLayoutQuery("banner", {
    refetchOnMountOrArgChange: true,
  });
  const [EditLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();
  //   ----handle-Image-Change-------
  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState == 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //   -----handle-Edit------

  const handleEdit = async () => {
    const data = {
      type: "banner",
      title,
      subtitle: subTitle,
      image: image,
    };
    await EditLayout(data);
  };

  useEffect(() => {
    if (data) {
      setTitle(data.layout?.banner.title);
      setSubTitle(data.layout?.banner.subtitle);
      setImage(data.layout?.banner.image?.url);
    }

    if (isSuccess) {
      toast.success(`Hero Updated SuccesFull`);
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
        <div className="lg:flex w-full px-8 ">
          {/* -----Hero-Image---- */}
          <div className="lg:w-[40%]   flex lg:min-h-screen items-center justify-end pt-[70px] lg:py[0] z-[10]">
            <div className="relative w-full flex items-center justify-end">
              <img
                src={image}
                alt=""
                className="object-contain lg:max-w-[90%] w-[90%] 2xl:max-w[85%] h-[auto] z-[10]"
              />
              <input
                onChange={handleImageChange}
                type="file"
                id="banner"
                className="hidden"
              />
              <label
                htmlFor="banner"
                className="absolute bottom-0 right-0 z-20"
              >
                <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
              </label>
            </div>
          </div>
          {/* -----Hero-Text---- */}
          <div className="lg:w-[60%] flex flex-col  items-center lg:mt[8px] text-center lg:text-left mt-[150px]">
            <textarea
              placeholder="Enter Your Hero Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full  lg:text-[70px] font-[600]  font-Josefin py-2 lg:leading-[75px] 2xl:w-[55%] lg:w-[78%]"
            ></textarea>
            <br />
            <br />
            <br />
            <textarea
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className="dark:text-[#edfff4] pl-3 text-[#000000ac] font-[600] text-[18px] 2xl:w-[55%] lg:w-[78%] resize-none"
              placeholder="Enter Hero SubTitle"
            ></textarea>
            <br />
            <br />
            <br />
            <button
              disabled={isLoading}
              onClick={
                data.layout?.banner.title !== title ||
                data.layout?.banner.subtitle !== subTitle ||
                data.layout?.banner.image?.url !== image
                  ? handleEdit
                  : () => null
              }
              className={`btn !w-[100px] rounded absulote bottom-12 right-12 !min-h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                data.layout?.banner.title != title ||
                data.layout?.banner.subtitle != subTitle ||
                data.layout?.banner.image?.url != image
                  ? "!cursor-pointer !bg-[#42d383] "
                  : "!cursor-not-allowed "
              }`}
            >
              {isLoading ? (
                <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
              ) : (
                "save"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
