"use client";
import { format } from "timeago.js";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserRoleMutation,
} from "@/Redux/Feature/User/UserApi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface Props {
  isTeam?: boolean;
}
const AllUsers: React.FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState(false);
  const [
    updateUserRole,
    { isLoading: roleLoading, error: roleError, isSuccess: roleSuccess },
  ] = useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess, error, isLoading: loading }] =
    useDeleteUserMutation();

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
        deleteUser(id);
      }
    });
  };

  // ---------Add-New-Member-------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      role,
      email,
    };
    await updateUserRole(data);
    setEmail("");
  };

  const coloums = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchsed Courses", flex: 0.5 },
    { field: "join", headerName: "Joined At", flex: 0.5 },

    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (param: any) => {
        return (
          <button
            disabled={loading}
            onClick={() => handleDelete(param.row.id)}
            className="cursor-pointer"
          >
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
    {
      field: "emailIcon",
      headerName: "Email",
      flex: 0.2,
      renderCell: (param: any) => {
        return (
          <a href={`mailto:${param.row.email}`} className="cursor-pointer">
            <button className="cursor-pointer">
              {" "}
              <AiOutlineMail className="text-black dark:text-white" size={20} />
            </button>
          </a>
        );
      },
    },
  ];

  const row = [] as any;

  if (isTeam) {
    const newData =
      data && data.user.filter((newUser: any) => newUser.role == "admin");

    newData?.forEach((item: any) => {
      row.push({
        id: item._id,
        name: item.name,
        role: item.role,
        email: item.email,
        courses: item?.course?.length,
        join: format(item.createdAt),
      });
    });
  } else {
    data &&
      data.user.forEach((item: any) => {
        row.push({
          id: item._id,
          name: item.name,
          role: item.role,
          email: item.email,
          courses: item?.course?.length,
          join: format(item.createdAt),
        });
      });
  }

  // ---------Delete-User------
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
  }, [isSuccess, error, loading, isLoading, data]);

  // ---------Add-New-Member------
  useEffect(() => {
    if (roleSuccess) {
      toast.success(`Add New Member SuccessFull`);
      setActive(false);
      refetch();
    }
    if (roleError) {
      if ("data" in roleError) {
        const errrorData = roleError as any;
        toast.error(errrorData.data.message);
      }
    }
  }, [data, isLoading, roleLoading, roleError, roleSuccess]);

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <Box m={"20px"}>
          {isTeam && (
            <div className="flex w-full justify-end">
              <button
                onClick={() => setActive(!active)}
                className="btn !w-[200px]"
              >
                Add New Member
              </button>
            </div>
          )}

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

      <div>
        <Modal
          open={active}
          onClose={() => setActive(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none -translate-y-1/2 -translate-x-1/2">
            <form onSubmit={handleSubmit}>
              {" "}
              <h1 className="title">Add New Member</h1>
              <input
                type="email"
                name=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Enter Your Email"
                className={`input-box `}
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-box dark:text-white "
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                disabled={roleLoading}
                className="btn !my-4"
              >
                {roleLoading ? (
                  <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
                ) : (
                  "     Add Member"
                )}
              </button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default AllUsers;
