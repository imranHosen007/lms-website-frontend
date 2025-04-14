"use client";

import React, { useEffect, useState } from "react";
import { ThemeSwitcher } from "../Header/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIo from "socket.io-client";
import {
  useGetAllNotifactionQuery,
  useUpdateNotifactionMutation,
} from "@/Redux/Feature/Notifaction/NotifactonApi";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URI || "";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });
const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const [notifaction, setNotifaciton] = useState([]);
  const [updateNotifaction, { isSuccess, isLoading: loading }] =
    useUpdateNotifactionMutation();
  const { data, isLoading, refetch } = useGetAllNotifactionQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handleNotifactionStatsChange = async (id: string) => {
    await updateNotifaction(id);
  };
  useEffect(() => {
    if (data) {
      setNotifaciton(
        data?.notifaction?.filter((item: any) => item.status == "unread")
      );
    }

    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess, loading]);

  useEffect(() => {
    socketId.on(`newNotifacton`, (data) => {
      refetch();
    });
  }, []);
  return (
    <div className="w-full flex items-center justify-end fixed z-[10]  top-0 right-5   p-6  ">
      <ThemeSwitcher />
      <div
        className="relative ml-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="dark:text-white text-black text-2xl cursor-pointer" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifaction && notifaction.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] min-h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-[100] rounded">
          <h5 className="text-center text-[20px] text-black dark:text-white p-3 font-Poppins">
            Notifaction
          </h5>
          {notifaction &&
            notifaction.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b[#ffffff47] border-b-[#0000000f] py-2"
                >
                  <div className="w-full flex items-center justify-between p-2">
                    <p className="dark:text-white text-black">{item.title}</p>{" "}
                    <button
                      disabled={loading}
                      className="dark:text-white text-black cursor-pointer"
                      onClick={() => handleNotifactionStatsChange(item._id)}
                    >
                      Mark As Read
                    </button>{" "}
                  </div>
                  <p className="dark:text-white text-black px-2">
                    {item.message}
                  </p>{" "}
                  <p className="dark:text-white text-black px-2 text-[14px]">
                    {format(item?.createdAt)}
                  </p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
