import {
  useAddNewAnswarMutation,
  useAddNewQuestionMutation,
} from "@/Redux/Feature/Course/CourseApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CommentReply from "./CommentReply";
import Avatar from "../../../public/user.png";
import socketIo from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URI || "";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });

interface Props {
  id: string;
  data: any;
  activeVideo: number;
  refetch: any;
  user: any;
}
const Question: React.FC<Props> = ({
  id,
  data,
  activeVideo,
  refetch,
  user,
}) => {
  const [question, setquestion] = useState("");
  const [answar, setAnswar] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [
    addNewQuestion,
    {
      isLoading: questionLoading,
      isSuccess: questionSuccess,
      error: questionError,
    },
  ] = useAddNewQuestionMutation();
  const [
    addNewAnswar,
    { isLoading: answarLoading, isSuccess: answarSuccess, error: answarError },
  ] = useAddNewAnswarMutation();

  // --------Handle-Question-------
  const handleQuestion = async () => {
    if (question.length == 0) {
      return toast.error(`Question Cant Be Emty`);
    }
    const newQuestion = {
      question,
      courseId: id,
      contentId: data[activeVideo]._id,
    };
    await addNewQuestion(newQuestion);
  };

  // ---------Handle-Answar--------

  const handleAnswar = async () => {
    if (answar.length == 0) {
      return toast.error(`Answar Cant Be Emty`);
    }
    const newAnswar = {
      answar,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    };

    await addNewAnswar(newAnswar);
  };

  // ------UseEffect-------

  useEffect(() => {
    if (questionSuccess) {
      toast.success(`Question Added SuccessFull`);
      setquestion("");
      refetch();
      socketId.emit("notifaction", {
        title: "New Question Recived",
        message: `You Have a New Question in ${data[activeVideo]?.title} `,
        userId: user?._id,
      });
    }
    if (questionError) {
      if ("data" in questionError) {
        const errorMessage = questionError as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [questionError, answarSuccess, questionLoading]);

  // ------Ansear-UserEffect----

  useEffect(() => {
    if (answarSuccess) {
      toast.success(`Answar Added SuccessFull`);
      setAnswar("");
      refetch();
      if (user?.role != "admin") {
        socketId.emit("notifaction", {
          title: "New Question Replay Recived",
          message: `You Have a New Replay Question in  ${data[activeVideo]?.title} `,
          userId: user?._id,
        });
      }
    }
    if (answarError) {
      if ("data" in answarError) {
        const errorMessage = answarError as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [answarError, answarSuccess, answarLoading]);
  return (
    <>
      {" "}
      <div className="flex w-full">
        <Image
          width={50}
          height={50}
          src={user?.avatar ? user?.avatar.url : Avatar}
          alt="user image not found"
          className="rounded-full w-[50px] h-[50px] object-cover"
        />
        <textarea
          cols={40}
          rows={5}
          className="outline-none ml-3 border dark:border-[#ffffff57] md:w-full p-2 rounded w-[90%] md:text-[18px] bg-transparent font-Poppins"
          placeholder="Write Your Question"
          value={question}
          onChange={(e) => setquestion(e.target.value)}
        ></textarea>
      </div>
      <div className="w-full flex justify-end">
        <button
          disabled={questionLoading}
          onClick={handleQuestion}
          className="btn !w-[120px] !h-[40px] text-[18px] !mt-5"
        >
          {questionLoading ? "Loading" : "Submit"}
        </button>
      </div>
      <br />
      <br />
      <div>
        {data[activeVideo]?.question.map((item: any, index: number) => {
          return (
            <CommentReply
              key={index}
              item={item}
              answar={answar}
              setAnswar={setAnswar}
              setQuestionId={setQuestionId}
              handleAnswar={handleAnswar}
              answarLoading={answarLoading}
            />
          );
        })}
      </div>
    </>
  );
};

export default Question;
