import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { LoopingRewindVideo, HeaderVideo } from "../components/HeaderVideo.jsx";

export const Home = () => {

  const { store, dispatch } = useGlobalReducer()

  return (

    <>
      <div className=" d-flex flex-column gap-0 text-center">
        <div className="flex justify-center">
          <LoopingRewindVideo videoSrc="/video/header_video2.mp4" />
        </div>
      </div>
    </>
  );
};
