import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { VideoPet } from "../components/VideoPet.jsx";
import { Button } from "../components/Button.jsx";
import { LoopingRewindVideo, HeaderVideo } from "../components/HeaderVideo.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (

		<>
			<div className=" d-flex flex-column gap-0 text-center">
				{/* <VideoPet /> */}

				<div className="flex justify-center h-300">
					<LoopingRewindVideo videoSrc="/video/header_video2.mp4" />
				</div>
			</div>

		</>
	);
};