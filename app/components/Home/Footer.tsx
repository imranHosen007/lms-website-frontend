import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="pt-10">
      {" "}
      <div className="border  border-[#0000000e] py-2 dark:border-[#ffffff1e]">
        <div className="w-[95%] md:w-full md:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                About
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href={`/about`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/privacy-policy`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/faq`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Faq
                  </Link>
                </li>
              </ul>{" "}
            </div>
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href={`/courses`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/profile`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/courses-dashboard`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Courses Dashboard
                  </Link>
                </li>
              </ul>{" "}
            </div>{" "}
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Socail Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href={`/`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Linkedin
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Github
                  </Link>
                </li>
              </ul>{" "}
            </div>
            <div>
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Contact Info
              </h3>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                +00812345678
              </p>{" "}
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                Address:+7011 Vermount Ave,Los Andles, CA 90844
              </p>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                Mail Us: Messi10anondo@gmail.com
              </p>
            </div>
          </div>
          <br />
          <p className="text-center text-black dark:text-white">
            CopyRight 2025 Lms | All Right Reserved
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Footer;
