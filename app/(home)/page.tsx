"use client";

import React from "react";
import Heading from "../utils/Heading";

import Hero from "../components/Home/Hero";
import Course from "../components/Home/Course";
import Reviews from "../components/Home/Reviews";
import FAQ from "../components/Home/FAQ";
import Footer from "../components/Home/Footer";

const page = () => {
  return (
    <div>
      <Heading
        title="lms"
        description="lms is a platform for students to learn and get help from teachers"
        keywords="Programing MERN"
      />

      <Hero />
      <Course />
      <Reviews />
      <FAQ />
    </div>
  );
};

export default page;
