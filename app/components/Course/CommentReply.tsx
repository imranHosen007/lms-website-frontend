import Image from "next/image";
import React, { useState } from "react";
import { format } from "timeago.js";
import Avatar from "../../../public/user.png";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
interface Props {
  item: any;

  answar: string;
  setAnswar: any;

  setQuestionId: any;
  handleAnswar: any;
  answarLoading: any;
}
const CommentReply: React.FC<Props> = ({
  item,

  answar,
  answarLoading,
  setAnswar,

  setQuestionId,
  handleAnswar,
}) => {
  const [replayActive, setReplayActive] = useState(false);
  return (
    <>
      <div className="w-full my-3 dark:text-white">
        <>
          {" "}
          <div className="my-4">
            <div className="flex mb-2">
              <div>
                <Image
                  className="w-[50px] h-[50px] rounded-full object-cover"
                  width={50}
                  height={50}
                  alt="User Image Missing"
                  src={item?.user?.avatar ? item?.user?.avatar?.url : Avatar}
                />
              </div>
              <div className="pl-3">
                <h5 className="text-[20px]">{item?.user?.name}</h5>
                <p>{item?.question}</p>
                <small className="text-[#ffffff83]">
                  {format(item?.createdAt)}
                </small>
              </div>
            </div>
          </div>
          <div className="w-full flex">
            <span
              onClick={() => {
                setReplayActive(!replayActive), setQuestionId(item._id);
              }}
              className="md:pl-16 dark:text-[#fffff83] cursor-pointer mr-2"
            >
              {!replayActive
                ? item?.questionReplies?.length !== 0
                  ? "All Replies"
                  : "Repaly"
                : "Hide Replies"}
            </span>
            <span className="flex items-center gap-1">
              {" "}
              <BiMessage
                size={20}
                className="cursor-pointer dark:text-[#ffffff83]"
              />
              <span className="pl-1 mt-[-4px] cursor-pointer  dark:text-[#ffffff83]">
                {item?.questionReplies?.length}
              </span>
            </span>
          </div>
          {replayActive && (
            <div>
              {item?.questionReplies?.map((questionRep: any) => {
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
                      <h5 className="text-[20px] flex items-center gap-1">
                        {questionRep?.user?.name}{" "}
                        {questionRep?.user?.role == "admin" && (
                          <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                        )}
                      </h5>{" "}
                      <p>{questionRep?.answar}</p>
                      <small className="text-[#ffffff83]">
                        {questionRep?.createdAt
                          ? format(questionRep?.createdAt)
                          : ""}
                      </small>
                    </div>
                  </div>
                );
              })}
              <>
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
                    disabled={answarLoading}
                    className="absolute right-0 bottom-1"
                    onClick={handleAnswar}
                  >
                    {answarLoading ? "Submiting ....." : "   Submit"}
                  </button>
                </div>
                <br />
              </>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default CommentReply;
