import { useLoadUserQuery } from "@/Redux/Feature/Api/ApiSlice";
import { useGetCourseWithoutPurchaseQuery } from "@/Redux/Feature/Course/CourseApi";
import { useGetLayoutQuery } from "@/Redux/Feature/Layout/LayoutApi";
import React, { ReactNode, useEffect } from "react";

const Loader: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  const { isLoading: heroLoading } = useGetLayoutQuery("banner", {});
  const { isLoading: courseLoading } = useGetCourseWithoutPurchaseQuery({});
  const { isLoading: faqLoading } = useGetLayoutQuery("faq", {});
  return (
    <div>
      {isLoading || heroLoading || faqLoading || courseLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Loader;
