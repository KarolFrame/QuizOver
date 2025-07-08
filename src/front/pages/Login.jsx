import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { LoginForm } from "../components/LoginForm.jsx";
import { motion } from "motion/react";
import { VideoPet } from "../components/VideoPet.jsx";

export const Login = () => {
	const [isIdle, setIsIdle] = useState(false);

	return (<>
		<div className=" d-flex flex-column gap-0 text-center">
			<div className="flex justify-center items-center">
				< div className="justify-center p-4 ">
					<div className="flex flex-col items-center justify-center gap-0 md:flex-row md:items-center md:justify-center w-full max-w-screen-lg lg:max-w-screen-xl ">
						<VideoPet onIdle={() => setIsIdle(true)} />
						<motion.div
							initial={{ opacity: 0, x: 500 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: .5, delay: 1, ease: "easeOut" }}
						>
							<LoginForm />
						</motion.div>
					</div>
				</div >
			</div>
		</div>
	</>);
}; 