"use client";
import React from "react";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProjectedProps {
  children: React.ReactNode;
}

export default function AdminProjected({ children }: ProjectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  if (user) {
    const isAdmin = user?.role == "admin";
    return isAdmin ? children : redirect(`/`);
  }
}
