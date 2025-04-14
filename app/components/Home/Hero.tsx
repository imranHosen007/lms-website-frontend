import { useGetLayoutQuery } from "@/Redux/Feature/Layout/LayoutApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Hero = () => {
  const { data } = useGetLayoutQuery("banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search == "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };
  return (
    <div>
      <div className="lg:flex w-full px-8 ">
        {/* -----Hero-Image---- */}
        <div className="lg:w-[40%]   flex lg:min-h-screen items-center justify-end pt-[70px] lg:py[0] z-[10]">
          <div className="absolute  top-[100px] lg:top-[unset] 2xl:h-[700px] 2xl:w-[700px] lg:h-[600px] lg:w-[600px] h-[50vh] w-[50vh] sm:h-[70vh] sm:w-[70vh] hero-animation rounded-full "></div>
          <Image
            width={400}
            height={400}
            src={data?.layout?.banner?.image?.url}
            alt="banner-img"
            className="object-contain lg:max-w-[90%] w-[90%] 2xl:max-w[85%] h-[auto] z-[10]"
          />
        </div>
        {/* -----Hero-Text---- */}
        <div className="lg:w-[60%] flex flex-col  items-center lg:mt[8px] text-center lg:text-left mt-[150px]">
          <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full  lg:text-[70px] font-[600]  font-Josefin py-2 lg:leading-[75px] 2xl:w-[55%] lg:w-[78%]">
            {" "}
            {data?.layout?.banner.title}
          </h2>
          <p className="dark:text-[#edfff4] pl-3 text-[#000000ac] font-[600] text-[18px] 2xl:w-[55%] lg:w-[78%]">
            {data?.layout?.banner.subtitle}
          </p>
          <br /> <br />
          <div className="2xl:w-[55%] lg:w-[78%] w-[90%] h-[50px] bg-transparent relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Seacrh Course...... "
              type="text"
              className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] shadow rounded-[5px] p-2 w-full h-full text-[#0000004c] dark:text-[#ffffffc6] text-[20px] font-Josefin font-[500] outline-none"
            />
            <div
              className="absolute cursor-pointer flex items-center justify-center w-[50px] h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
              onClick={handleSearch}
            >
              <BiSearch className="text-white " size={30} />
            </div>
          </div>
          <br />
          <br />
          <div className="2xl:w-[55%]  ml-3 lg:w-[70%] w-[90%]  flex items-center">
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
              500K+ People already trusted us.
              <Link
                href={`/course`}
                className="dark:text-[#46e256] text-[#DC143C]"
              >
                {" "}
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
