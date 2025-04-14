"use client";
import { useActivatonMutation } from "@/Redux/Feature/Auth/AuthApi";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

interface VerifyNumber {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
}

interface Props {
  setRoute: (route: string) => void;
}
const Verifaction: React.FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState(false);
  const { token } = useSelector((state: any) => state.auth);

  const [activaton, { isSuccess, error, isLoading }] = useActivatonMutation();

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleVerifaction = async () => {
    const verifactionNumber = Object.values(verifyNumber).join("");
    if (verifactionNumber.length != 4) {
      setInvalidError(true);
    }
    await activaton({
      activation_token: token,
      activation_code: verifactionNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    console.log(index, value);
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };

    setVerifyNumber(newVerifyNumber);

    if (value == "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length == 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Account Activation SucessFull`);
      setRoute(`login`);
    } else if (error) {
      setInvalidError(true);
      if ("data" in error) {
        const errrorData = error as any;
        toast.error(errrorData.data.message);
      } else {
        console.log(`an error occured`, error);
      }
    }
  }, [isSuccess, error, isLoading]);
  return (
    <div>
      <h1 className="title">Verify Your Account</h1>
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center bg-[#497DE2]">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className=" m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => {
          return (
            <input
              type="text"
              key={key}
              maxLength={1}
              onChange={(e) => handleInputChange(index, e.target.value)}
              ref={inputRefs[index]}
              className={`w-[65px] h-[65px] border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] outline-none text-center bg-transparent font-Poppins ${
                invalidError
                  ? "shake border-red-500"
                  : "dark:border-white border-[#0000004a]"
              }`}
              value={verifyNumber[key as keyof VerifyNumber]}
            />
          );
        })}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button className="btn" onClick={handleVerifaction}>
          {isLoading ? (
            <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
          ) : (
            "    Verify OTP"
          )}
        </button>
      </div>
      <br />
      <h5 className="text-center p-4 text-[14px] dark:text-white text-black font-Poppins">
        Go Back To{" "}
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("login")}
        >
          Sign Up ?
        </span>
      </h5>
    </div>
  );
};

export default Verifaction;
