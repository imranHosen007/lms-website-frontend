"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import { useLoginMutation } from "@/Redux/Feature/Auth/AuthApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useLoadUserQuery } from "@/Redux/Feature/Api/ApiSlice";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email")
    .required("Please Enter Your Email"),
  password: yup.string().required("Please Enter Your Password").min(6),
});

interface Props {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
}
const Login: React.FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error, data, isLoading }] = useLoginMutation();

  const { refetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  // ----Handle--GoogleAuth---
  const handleLoginWithAuth = async (authMethod: string) => {
    await signIn(authMethod);
  };
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Login SuccessFull";
      toast.success(message);
      refetch();
      setOpen(false);
    } else if (error) {
      if ("data" in error) {
        const errrorData = error as any;
        toast.error(errrorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);

  return (
    <div className="w-full">
      <h1 className="title">Login With Lms</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="email">
            Enter Your Email
          </label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="Enter Your Email"
            className={`input-box ${
              errors.email && touched.email && "border-red-500"
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 block pt-2">{errors.email}</span>
          )}
        </div>
        <div className="w-full relative mt-5 mb-1">
          <label className="label" htmlFor="password">
            Enter Your Password
          </label>
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            className={`input-box ${
              errors.password && touched.password && "border-red-500"
            }`}
          />
          {show ? (
            <AiOutlineEye
              size={20}
              className="bttom-3 right-2 z-1 absolute cursor-pointer "
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={20}
              className="bttom-3 right-2 z-1 absolute cursor-pointer "
              onClick={() => setShow(true)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 block pt-2">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <button type="submit" disabled={isLoading} className="btn">
            {isLoading ? (
              <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
            ) : (
              "Login"
            )}
          </button>
        </div>
        <br />
        <h5 className="text-center pt-4 text-[14px] text-black dark:text-white  font-Poppins ">
          Or Join With
        </h5>
        <div className="flex items-center my-3 justify-center ">
          <FaGoogle
            onClick={() => handleLoginWithAuth("google")}
            className="cursor-pointer mr-2"
            size={30}
          />
          <AiFillGithub
            onClick={() => handleLoginWithAuth("github")}
            className="cursor-pointer ml-2"
            size={30}
          />
        </div>
        <h5 className=" text-[14px]  pt-4 text-center font-Poppins">
          Have Not Account{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("sign-up")}
          >
            Sign Up
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Login;
