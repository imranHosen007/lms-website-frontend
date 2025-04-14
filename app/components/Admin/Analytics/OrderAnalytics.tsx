"use client";

import { useGetOrderAnalyticsQuery } from "@/Redux/Feature/Analytics/AnalyticsApi";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  isDashbaord?: boolean;
}
const OrderAnalytics: React.FC<Props> = ({ isDashbaord }) => {
  const { isLoading, data } = useGetOrderAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.orders.last12Month.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

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
              ? "mt-]50px] "
              : "mt-[50px] dark:bg-[$111c43] shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashbaord && "ml-8 mb-5"}`}>
            <h1
              className={`px-5 !text-start title ${
                isDashbaord && "!text-[20px]"
              }`}
            >
              Orders Analytics
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
              <LineChart
                width={500}
                height={300}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                data={analyticsData}
              >
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"name"}></XAxis>
                <YAxis />
                <Tooltip />
                {!isDashbaord && <Legend />}
                <Line
                  type={"monotone"}
                  fill="#4d62d9"
                  dataKey={"uv"}
                  stroke="#4d62d9"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
