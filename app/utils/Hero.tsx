import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSearch } from "react-icons/bi";

const Hero = () => {
  return (
    <div className=" lg:flex items-center w-full">
      <div className="absolute  top-[100px] lg:top-[unset] 2xl:h-[700px] 2xl:w-[700px] lg:h-[600px] lg:w-[600px] h-[50vh] w-[50vh] hero-animation ">
        <div
          className="lg:w-[40%] flex lg:min-h-screen items-center justify-end pt-[70px] lg:py[0] z-[10]
        "
        >
          <Image
            src={require("../../../public/assets/banner-img-1.png")}
            alt="banner-img"
            className="object-contain lg:max-w-[90%] w-[90%] 2xl:max-w[85%] h-[auto] z-[10]"
          />
        </div>

        <div className="lg:w-[60%] flex flex-col items-center lg:nt[8px] text-center lg:text-left mt-[150px]">
          <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full lg:text-[70px] font-[600]  font-Josefin">
            Improve Your Online Learning Experience Better Instantly
          </h2>
          <br />
          <p className="dark:text-[#edfff4] text-[#000000ac] font-[600] text-[18px] 2xl:w-[55%] lg:w-[78%]">
            We Have 40k+ Online courses & 500K+ Online registered student. Find
            your desired Courses from them.
          </p>
          <br />
          <br />
          <div className="2xl:w-[55%] lg:w-78%] h-[50px]  relative bg-transparent">
            <input
              type="text"
              placeholder="Seacrh Course...... "
              className="bg-transparent border dark:border-none dak:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-w w-full outline-none"
            />
            <div className="absolute cursor-pointer flex items-center justify-center w-[50px] h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
              <BiSearch className="text-white " size={30} />
            </div>
          </div>
          <br /> <br />
          <div className="2xl:w-[55%] lg:w-[70%] w-[90%] flex items-center">
            <Image
              src={require("../../../public/assets/client-1.jpg")}
              alt="client-1"
              className="ml-[-20px] rounded-full"
            />{" "}
            <Image
              src={require("../../../public/assets/client-2.jpg")}
              alt="client-1"
              className="ml-[-20px] rounded-full"
            />{" "}
            <Image
              src={require("../../../public/assets/client-3.jpg")}
              alt="client-1"
              className="ml-[-20px] rounded-full"
            />
            <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] lg:pl-3 text-[18px] font-[600]">
              500K+ People already trusted us. View Courses
              <Link href={`/`} className="dark:text-[#46e256] text-[#DC143C]">
                View Course
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
