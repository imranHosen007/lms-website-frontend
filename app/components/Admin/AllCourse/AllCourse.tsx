"use client";
import { format } from "timeago.js";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from "@/Redux/Feature/Course/CourseApi";
import toast from "react-hot-toast";
import Link from "next/link";

const AllCourse = () => {
  const { theme } = useTheme();
  const { isLoading, data, refetch } = useGetAllCourseQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteCourse, { isSuccess, error, isLoading: loading }] =
    useDeleteCourseMutation();

  // -------Handle-Delete-------

  const handleDelete = async (courseId: any) => {
    const id = courseId;
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourse(id);
      }
    });
  };

  const coloums = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purcshed", headerName: "Purchase", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (param: any) => {
        return (
          <button>
            <Link href={`/admin/edit-course/${param.row.id}`}>
              <FaEdit className="text-black dark:text-white" size={20} />
            </Link>
          </button>
        );
      },
    },

    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (param: any) => {
        return (
          <button disabled={loading} onClick={() => handleDelete(param.row.id)}>
            {loading ? (
              <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
            ) : (
              <AiOutlineDelete
                className="text-black dark:text-white"
                size={20}
              />
            )}
          </button>
        );
      },
    },
  ];

  const row = [] as any;

  {
    data &&
      data.course.forEach((item: any) => {
        row.push({
          id: item._id,
          title: item.name,
          purcshed: item.purchase,
          ratings: item.ratings,
          created_at: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Course Delete SuccessFull`);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errrorData = error as any;
        toast.error(errrorData.data.message);
      }
    }
  }, [isSuccess, error, loading]);
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

export default AllCourse;
