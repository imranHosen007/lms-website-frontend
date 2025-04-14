import React, { useEffect, useState } from "react";
import axios from "axios";
interface Props {
  videoUrl: string;
  title: string;
}
const CoursePlayer: React.FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/course/videourl`,
        {
          videoUrl,
        },
        { withCredentials: true }
      )
      .then((res) => setVideoData(res.data))
      .catch((error) => console.log(error));
  }, [videoUrl]);
  return (
    <div
      style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}
    >
      <iframe
        src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData?.playbackInfo}&player=iyYOny3eVSlbGPkz`}
        allowFullScreen={true}
        allow="encrypted-media"
        style={{
          border: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></iframe>
    </div>
  );
};

export default CoursePlayer;
