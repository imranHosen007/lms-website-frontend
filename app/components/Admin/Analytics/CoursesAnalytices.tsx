"use client";
import { useGetCourseAnalyticsQuery } from "@/Redux/Feature/Analytics/AnalyticsApi";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  Label,
  LabelList,
  YAxis,
} from "recharts";
const CoursesAnalytices = () => {
  const { data, isLoading } = useGetCourseAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.courses.last12Month.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });
  const minValue = 0;
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className="px-5 !text-start title">Course Analytics</h1>
            <p className="px-5 label">Last 12 Month Analytics Data</p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width={"90%"} height={"50%"}>
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey={"name"}>
                  <Label offset={0} position={"insideBottom"} />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position={"top"} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursesAnalytices;
