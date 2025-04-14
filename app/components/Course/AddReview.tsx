import {
  useAddReviewMutation,
  useAddReviewReplayMutation,
} from "@/Redux/Feature/Course/CourseApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import Avatar from "../../../public/user.png";
import { format } from "timeago.js";
import Ratings from "@/app/hooks/Ratings";
import socketIo from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URI || "";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });
import { VscVerifiedFilled } from "react-icons/vsc";
import { useLoadUserQuery } from "@/Redux/Feature/Api/ApiSlice";
interface Props {
  id: string;
  user: any;
  refetch: any;
  reviewData: any;
  courseDetailsRefetch: any;
  isReviewExtis: boolean;
  activeVideo: number;
  data: any;
}
const AddReview: React.FC<Props> = ({
  id,
  data,
  user,
  refetch,
  reviewData,
  courseDetailsRefetch,
  isReviewExtis,
  activeVideo,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, SetHover] = useState(0);
  const [review, setReview] = useState("");
  const [reviewActive, setReviewActive] = useState(false);
  const [answar, setAnswar] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [
    addReview,
    { isLoading: reviewLoading, isSuccess: reviewSuccess, error: reviewError },
  ] = useAddReviewMutation();
  const [
    addReviewReplay,
    { isLoading: replayLoading, error: replayError, isSuccess: replaySuccess },
  ] = useAddReviewReplayMutation();
  const { refetch: userRefetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // -------Handle----Review---Submit------
  const handleReview = async () => {
    if (review.length == 0) {
      return toast.error(`Review Cant Be Emty`);
    }
    await addReview({ courseId: id, review, rating });
  };

  // -------Handle-Review-Replay----
  const handleReviewSubmit = async () => {
    if (answar.length == 0) {
      return toast.error(`Review Cant Be Emty`);
    }
    const newReplay = {
      comment: answar,
      courseId: id,
      reviewId: reviewId,
    };
    await addReviewReplay(newReplay);
  };

  useEffect(() => {
    if (reviewSuccess) {
      toast.success(`Review Added SuccessFull`);
      courseDetailsRefetch();
      setReview("");
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [reviewError, reviewLoading, reviewSuccess]);

  useEffect(() => {
    if (replaySuccess) {
      toast.success(`Review Replay Added SuccessFull`);
      courseDetailsRefetch();
      refetch();
      userRefetch();

      socketId.emit("notifaction", {
        title: "New Review Recived",
        message: `${user?.name} Has Gived Review in ${data[activeVideo]?.title}`,
        userId: user?._id,
      });
    }
    if (replayError) {
      if ("data" in replayError) {
        const errorMessage = replayError as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [replayError, replayLoading, replaySuccess]);
  return (
    <>
      {user?.role != "admin" && !isReviewExtis && (
        <div className="flex w-full ">
          <div>
            {" "}
            <Image
              width={50}
              height={50}
              src={user?.avatar ? user?.avatar.url : Avatar}
              alt="user image not found"
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
          </div>
          <div className="w-full">
            <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
              Give A Review <span className="text-red-600">*</span>
            </h5>
            <div className="flex w-full ml-2 pb-3">
              {[...Array(5)].map((_, i) => {
                i += 1;
                return (
                  <FaStar
                    onClick={() => setRating(i)}
                    onMouseMove={() => SetHover(i)}
                    onMouseLeave={() => SetHover(i)}
                    key={i}
                    size={20}
                    className={
                      i <= (hover || rating)
                        ? "text-yellow-500"
                        : "text-black dark:text-white"
                    }
                  />
                );
              })}
            </div>
            <textarea
              cols={40}
              rows={5}
              className="outline-none ml-3 border dark:border-[#ffffff57] md:w-full p-2 rounded w-[90%] md:text-[18px] bg-transparent font-Poppins"
              placeholder="Write Your Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="w-full flex justify-end">
              <button
                disabled={reviewLoading}
                onClick={handleReview}
                className="btn !w-[120px] !h-[40px] text-[18px] !mt-5"
              >
                {reviewLoading ? "Submiting" : " Submit"}
              </button>
            </div>
            <br />
          </div>
        </div>
      )}
      <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
      <div className="w-full">
        {reviewData &&
          [...reviewData].reverse().map((item: any, index: number) => {
            return (
              <>
                <div key={index} className="w-full my-5">
                  <div className="w-full flex">
                    <div>
                      <Image
                        className="w-[50px] h-[50px] rounded-full object-cover"
                        width={50}
                        height={50}
                        alt="User Image Missing"
                        src={
                          item?.user?.avatar ? item?.user?.avatar?.url : Avatar
                        }
                      />
                    </div>
                    <div className="pl-3">
                      <h5 className="text-[20px]">{item?.user?.name}</h5>
                      <Ratings rating={item?.rating} />
                      <p>{item?.review}</p>
                      <small className="text-[#ffffff83]">
                        {format(item?.createdAt)}
                      </small>
                    </div>
                  </div>
                  {user?.role == "admin" && (
                    <span
                      onClick={() => {
                        setReviewActive(!reviewActive), setReviewId(item._id);
                      }}
                      className="label !ml-10 cursor-pointer"
                    >
                      {reviewActive ? "Hide" : "Add Reply"}
                    </span>
                  )}
                </div>
                {reviewActive && (
                  <>
                    {item?.commentReplies?.map((questionRep: any) => {
                      return (
                        <div className="w-full flex md:ml-16 ml:2 my-5 text-black dark:text-white">
                          <div>
                            {" "}
                            <Image
                              className="w-[50px] h-[50px] rounded-full object-cover"
                              width={50}
                              height={50}
                              alt="User Image Missing"
                              src={
                                questionRep?.user?.avatar
                                  ? item?.user?.avatar?.url
                                  : Avatar
                              }
                            />
                          </div>
                          <div className="pl-3">
                            <h5 className="text-[20px] flex items-center gap-2">
                              {questionRep?.user?.name}{" "}
                              {questionRep?.user?.role == "admin" && (
                                <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                              )}
                            </h5>{" "}
                            <p>{questionRep?.comment}</p>
                            <small className="text-[#ffffff83]">
                              {questionRep?.createdAt
                                ? format(questionRep?.createdAt)
                                : ""}
                            </small>
                          </div>
                        </div>
                      );
                    })}
                    <div className="w-full relative flex">
                      <input
                        value={answar}
                        onChange={(e) => setAnswar(e.target.value)}
                        type="text"
                        placeholder="Enter Your Answar"
                        className="block md:ml-12 mt-2 outline-none bg-transparent border-b dark:border-white p-[5px] w-[95%]
                       "
                      />
                      <button
                        disabled={replayLoading}
                        className="absolute right-0 bottom-1"
                        onClick={handleReviewSubmit}
                      >
                        {replayLoading ? "Submiting ....." : "   Submit"}
                      </button>
                    </div>
                  </>
                )}
              </>
            );
          })}
      </div>
      <br />
    </>
  );
};

export default AddReview;
