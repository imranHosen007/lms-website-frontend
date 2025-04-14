import React, { useEffect, useState } from "react";
import UsersAnalytics from "../Analytics/UsersAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { Box, CircularProgress } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";

import {
  useGetOrderAnalyticsQuery,
  useGetUserAnalyticsQuery,
} from "@/Redux/Feature/Analytics/AnalyticsApi";
interface Props {
  open?: boolean;
  value?: number;
}

const CircularProgressWithLabel: React.FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        color={value && value > 99 ? "info" : "error"}
        variant="determinate"
        value={value}
        thickness={4}
        style={{ zIndex: open ? "-1" : "1" }}
        size={45}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          postion: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};
const AdminHome: React.FC<Props> = ({ open, value }) => {
  const [orderComparePercentage, setOrderComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();
  const { data: orderData, isLoading: orderLoading } =
    useGetOrderAnalyticsQuery({});
  const { data: userData, isLoading: userLoading } = useGetUserAnalyticsQuery(
    {}
  );

  useEffect(() => {
    if (orderLoading && userLoading) {
      return;
    } else {
      if (orderData && userData) {
        const userlastTwoMonth = userData?.users?.last12Month.slice(-2);
        const orderlastTwoMonth = orderData?.orders?.last12Month.slice(-2);

        if (userlastTwoMonth.length == 2 && orderlastTwoMonth.length == 2) {
          const userCurrentMonth = userlastTwoMonth[1].count;
          const userPrevMonth = userlastTwoMonth[0].count;
          const orderCurrentMonth = userlastTwoMonth[1].count;
          const orderPrevMonth = userlastTwoMonth[0].count;

          const userPercentChange =
            userPrevMonth !== 0
              ? ((userCurrentMonth - userPrevMonth) / userPrevMonth) * 100
              : 100;
          const orderPercentChange =
            orderPrevMonth !== 0
              ? ((orderCurrentMonth - orderPrevMonth) / orderPrevMonth) * 100
              : 100;

          setUserComparePercentage({
            currentMonth: userCurrentMonth,
            prevMonth: userPrevMonth,
            percentChange: userPercentChange,
          });
          setOrderComparePercentage({
            currentMonth: orderCurrentMonth,
            prevMonth: orderPrevMonth,
            percentChange: orderPercentChange,
          });
        }
      }
    }
  }, [orderData, userData, orderLoading, userLoading]);
  return (
    <>
      {orderLoading || userLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="mt-[30px] min-h-screen">
          <div className="grid grid-cols-4">
            <div className="p-8 col-span-3">
              <UsersAnalytics isDashbaord={true} />
            </div>

            <div className="col-span-1 pt-[80px] pr-8 ">
              {" "}
              <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
                {" "}
                <div className="w-full items-center p-5 flex justify-between">
                  <div>
                    <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                    <h5 className="pt-2 dark:text-[#fff] text-black text-[20px] font-Poppins">
                      {orderComparePercentage?.currentMonth}
                    </h5>{" "}
                    <h5 className="py-2 dark:text-[#45CBA0] text-black text-[20px] font-Poppins font-[400]">
                      Sales Obatianed
                    </h5>
                  </div>
                  <div>
                    <CircularProgressWithLabel
                      open={open}
                      value={
                        orderComparePercentage?.percentChange > 0 ? 100 : 0
                      }
                    />
                    <h5 className="pt-4 text-center">
                      {orderComparePercentage?.percentChange > 0
                        ? `+ ${orderComparePercentage?.percentChange.toFixed(
                            2
                          )}`
                        : `- ${orderComparePercentage?.percentChange.toFixed(
                            2
                          )} `}
                      %
                    </h5>
                  </div>
                </div>
              </div>
              <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
                <div className="w-full items-center p-5 flex justify-between">
                  <div>
                    <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                    <h5 className="pt-2 dark:text-[#fff] text-black text-[20px] font-Poppins">
                      {userComparePercentage?.currentMonth}
                    </h5>{" "}
                    <h5 className="py-2 dark:text-[#45CBA0] text-black text-[20px] font-Poppins font-[400]">
                      New Users
                    </h5>
                  </div>
                  <div>
                    <CircularProgressWithLabel
                      open={open}
                      value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                    />
                    <h5 className="pt-4 text-center">
                      {userComparePercentage?.percentChange > 0
                        ? `+ ${userComparePercentage?.percentChange.toFixed(2)}`
                        : `- ${userComparePercentage?.percentChange.toFixed(
                            2
                          )} `}
                      %
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHome;
