"use client";

import { useGetUserAnalyticsQuery } from "@/Redux/Feature/Analytics/AnalyticsApi";
import React from "react";
import {
  Area,
  AreaChart,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  isDashbaord?: boolean;
}

const UsersAnalytics: React.FC<Props> = ({ isDashbaord }) => {
  const { isLoading, data } = useGetUserAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.users.last12Month.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });
  console.log(data);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div
          className={`${
            !isDashbaord
              ? "mt-[50px] "
              : "mt-[50px] dark:bg-[#111c43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashbaord && "ml-8 mb-5"}`}>
            <h1
              className={`px-5 !text-start title ${
                isDashbaord && "!text-[20px]"
              }`}
            >
              User Analytics
            </h1>
            {!isDashbaord && (
              <p className="px-5 label">Last 12 Month Analytics Data</p>
            )}
          </div>
          <div
            className={`w-full h-[90%] flex items-center justify-center ${
              isDashbaord ? "!h-[30vh]" : "h-screen"
            }`}
          >
            <ResponsiveContainer
              width={isDashbaord ? "100%" : "90%"}
              height={!isDashbaord ? "50%" : "100%"}
            >
              <AreaChart
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                data={analyticsData}
              >
                <XAxis dataKey={"name"}></XAxis>
                <YAxis />
                <Tooltip />
                <Area
                  type={"monotone"}
                  fill="#4d62d9"
                  dataKey={"uv"}
                  stroke="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersAnalytics;
