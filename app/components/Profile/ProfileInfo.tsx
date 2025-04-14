"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatarIcon from "../../../public/user.png";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "@/Redux/Feature/User/UserApi";
import { useLoadUserQuery } from "@/Redux/Feature/Api/ApiSlice";
import toast from "react-hot-toast";

interface Props {
  user: any;
  avatar: string | null;
}
const ProfileInfo: React.FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error, isLoading: avatarLoading }] =
    useUpdateAvatarMutation();
  const [
    updateProfile,
    { isSuccess: success, error: profileError, isLoading },
  ] = useUpdateProfileMutation();
  const [loadUser, setLoadUser] = useState(false);

  const { refetch } = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  // -------Handle-Iamge------

  const handleimage = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState == 2) {
        updateAvatar({ avatar: fileReader.result });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  // --------Handle-Submit---------

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name !== "") {
      await updateProfile({
        name,
      });
    }
  };

  // --------UseEffect------

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
      toast.success(`Profile Picture change SuccessFull`);
    }
    if (success) {
      setLoadUser(true);
      toast.success(`Profile Updated SucessFull`);
    }

    if (error) {
      if ("data" in error) {
        const errrorData = error as any;
        toast.error(errrorData.data.message);
      }
    }
    if (profileError) {
      if ("data" in profileError) {
        const errrorData = profileError as any;
        toast.error(errrorData.data.message);
      }
    }
  }, [isSuccess, success, error, profileError, isLoading]);
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="relative">
          <Image
            width={120}
            height={120}
            src={
              user?.avatar?.url || avatar
                ? user.avatar?.url || avatar
                : avatarIcon
            }
            alt="userprofile"
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={handleimage}
            disabled={avatarLoading}
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-gray-300 dark:bg-slate-900 rounded-full absulote right-2 flex items-center justify-center top-2 cursor-pointer">
              {avatarLoading ? (
                <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600">
                  {" "}
                  <AiOutlineCamera size={20} className="z-10" />
                </div>
              ) : (
                <AiOutlineCamera size={20} className="z-10" />
              )}
            </div>
          </label>
        </div>
        <br />
        <br />
        <br />
        <div className="w-full pl-6 md:pl-10">
          <form action="" onSubmit={handleSubmit}>
            <div className="md:w-[50%] mx-auto block pb-4">
              <div className="w-full">
                <label htmlFor="name" className="block pb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  className="input-box !w-[95%] mb-4 md:mb-0"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>{" "}
              <div className="w-full">
                <label htmlFor="name" className="block pb-2">
                  Email
                </label>
                <input
                  type="text"
                  readOnly
                  value={user && user?.email}
                  className="input-box !w-[95%] mb-4 md:mb-0"
                />
              </div>
              <button type="submit" disabled={isLoading} className="btn mt-8">
                {isLoading ? (
                  <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
          <br />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
