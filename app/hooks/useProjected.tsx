import React from "react";

import useAuth from "./useAuth";
import { redirect } from "next/navigation";

interface ProjectedProps {
  children: React.ReactNode;
}

export default function Projected({ children }: ProjectedProps) {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : redirect(`/`);
}
