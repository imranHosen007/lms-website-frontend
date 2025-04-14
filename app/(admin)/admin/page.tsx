"use client";
import AdminHome from "@/app/components/Admin/AdminHome/AdminHome";

import React, { useState } from "react";

const page = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <AdminHome open={open} />
    </div>
  );
};

export default page;
