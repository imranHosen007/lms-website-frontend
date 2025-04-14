"use client";
import { useGetAllCourseQuery } from "@/Redux/Feature/Course/CourseApi";
import { useGetAllOrderQuery } from "@/Redux/Feature/Order/OrderApi";
import { useGetAllUserQuery } from "@/Redux/Feature/User/UserApi";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";

interface Props {
  isDashboard?: boolean;
}
const AllInvoices: React.FC<Props> = ({ isDashboard }) => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const { data } = useGetAllOrderQuery({});
  const { isLoading, isSuccess, data: userData } = useGetAllUserQuery({});
  const { data: courseData } = useGetAllCourseQuery({});
  const [orderData, setOrderData] = useState([]);

  const coloums = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "title", headerName: "title", flex: 0.5 },
    { field: "price", headerName: "Price", flex: 0.5 },
    { field: "created", headerName: "Created At", flex: 0.5 },

    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (param: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                className="text-black dark:text-white"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [] as any;
  {
    orderData &&
      orderData.forEach((item: any) => {
        row.push({
          id: item._id,
          name: item.userName,
          email: item.userEmail,
          title: item.title,
          price: item.price,
          created: format(item.createdAt),
        });
      });
  }
  useEffect(() => {
    if (data) {
      const temp = data.order.map((item: any) => {
        const user = userData?.user.find(
          (user: any) => user._id === item.userId
        );
        const course = courseData?.course.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, userData, courseData]);
  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <Box m={"20px"}>
          <Box
            m={`40px 0 0 0`}
            height={`80vh`}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme == "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme == "dark" ? "#fff" : "#000",
              },

              "& .MuiDataGrid-row": {
                color: theme == "dark" ? "#fff" : "#000",
                borderBottom: theme == "1px solid " ? "#ffffff30" : "#ccc",
              },
              "& .MuiTablePagination-root": {
                color: theme == "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme == "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme == "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme == "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme == "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme == "dark" ? "#e34396" : "#A4A9FC",
                borderTop: "none",
                color: theme == "dark" ? "#fff" : "#000",
              },
              "& .MuiCheckbox-root": {
                color: theme == "dark" ? "#b7ebde" : "#000",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff",
              },
            }}
          >
            <DataGrid rows={row} columns={coloums} checkboxSelection />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
