import React, { useEffect, useState } from "react";
import { useChangePasswordMutation } from "@/Redux/Feature/User/UserApi";
import { useLoadUserQuery } from "@/Redux/Feature/Api/ApiSlice";
import toast from "react-hot-toast";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isSuccess, error, isLoading }] =
    useChangePasswordMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { refetch } = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  // ------Handle-Change-Pasword-------

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      return toast.error(`Password Do Not Match`);
    }
    if (oldPassword !== "" && newPassword !== "") {
      await changePassword({
        oldPassword,
        newPassword,
      });
      setNewPassword("");
      setOldPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
      toast.success(`Password change SuccessFull`);
    }

    if (error) {
      if ("data" in error) {
        const errrorData = error as any;
        toast.error(errrorData.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);
  return (
    <div className="w-full pl-7 md:px-5 md:pl-0">
      <h1 className="block text-[25px] md:text-[30px] text-center font-[500] dark:text-white pb-2 font-Poppins">
        Change Password
      </h1>
      <div className="w-full">
        <form
          className="flex flex-col items-center"
          onSubmit={handleChangePassword}
        >
          <div className="md:w-[60%] w-full mt-5">
            <label
              htmlFor="oldpassword"
              className="block pb-2 text-black dark:text-white"
            >
              Enter Your Old Password
            </label>
            <input
              id="oldpassword"
              type="password"
              placeholder="Enter Your Old Password"
              value={oldPassword}
              className="input-box !w-[95%] mb-4 md:mb-0"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>{" "}
          <div className="md:w-[60%] w-full mt-5">
            <label
              htmlFor="newpassword"
              className="block pb-2 text-black dark:text-white"
            >
              Enter Your New Password
            </label>
            <input
              id="newpassword"
              type="password"
              value={newPassword}
              className="input-box !w-[95%] mb-4 md:mb-0"
              placeholder="Enter Your New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="md:w-[60%] w-full mt-5">
            <label
              htmlFor="confirmpassword"
              className="block pb-2 text-black dark:text-white"
            >
              Enter Your Confirm Password
            </label>
            <input
              id="confirmpassword"
              type="password"
              value={confirmPassword}
              className="input-box !w-[95%] mb-4 md:mb-0"
              placeholder="Enter Your Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" disabled={isLoading} className="btn mt-8">
              {isLoading ? (
                <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
              ) : (
                "    Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
