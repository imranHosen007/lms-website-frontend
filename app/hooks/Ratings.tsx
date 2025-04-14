import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiSolidStarHalf } from "react-icons/bi";

interface Props {
  rating: number;
}
const Ratings: React.FC<Props> = ({ rating }) => {
  const star = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      star.push(
        <AiFillStar
          key={i}
          size={20}
          color="#f6b100"
          className="cursor-pointer mr-2"
        />
      );
    } else if (i == Math.ceil(rating) && !Number.isInteger(rating)) {
      star.push(
        <BiSolidStarHalf
          key={i}
          size={20}
          color="#f6b100"
          className="cursor-pointer mr-2"
        />
      );
    } else {
      star.push(
        <AiOutlineStar
          key={i}
          size={20}
          color="#f6b100"
          className="cursor-pointer mr-2"
        />
      );
    }
  }
  return <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">{star}</div>;
};

export default Ratings;
