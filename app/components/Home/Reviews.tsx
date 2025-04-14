import React from "react";
import img1 from "../../../public/assets/client-1.jpg";
import img2 from "../../../public/assets/client-2.jpg";
import img3 from "../../../public/assets/client-3.jpg";
import Image from "next/image";
import ReviewCard from "./ReviewCard";

const ReviewData = [
  {
    name: "Jay Gibbs",
    avarar: img1,
    profession: "Junior Web Devloper | Usa",
    comment:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    rating: 5,
  },
  {
    name: "Jay Gibbs",
    avarar: img1,
    profession: "Junior Web Devloper | Usa",
    comment:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    rating: 4.7,
  },
  {
    name: " Laura Mckenzie",
    avarar: img3,
    profession: "Senior Web Devloper | France",
    comment:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    rating: 4,
  },
  {
    name: "Mina Davidson",
    avarar: img2,
    profession: "Full Stack Web Devloper | London",
    comment:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    rating: 3,
  },
  {
    name: "Roy Smith",
    avarar: img1,
    profession: "Wordpress Devloper | Italy",
    comment:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    rating: 4,
  },
  {
    name: "Jay Gibbs",
    avarar: img1,
    profession: "Junior Web Devloper | Usa",
    comment:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    rating: 3.7,
  },
];
const Reviews = () => {
  return (
    <div className="w-[90%] md:w-[85%] mx-auto">
      <div>
        <h3 className="title !md:text-[40px]">
          Our Students Are <span>Our Strength</span> See What They Say About Us
        </h3>
        <br />
        <p className="label">
          ndustry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets{" "}
        </p>
      </div>
      <br />
      <br />
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0">
        {ReviewData &&
          ReviewData.map((item: object, index: number) => {
            return <ReviewCard item={item} />;
          })}
      </div>
    </div>
  );
};

export default Reviews;
