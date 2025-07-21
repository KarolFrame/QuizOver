import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { LoginForm } from "../components/LoginForm.jsx";
import { motion } from "motion/react";
import { VideoPet } from "../components/VideoPet.jsx";

export const Login = () => {
	const [isIdle, setIsIdle] = useState(false);

	return (<>
		<div className=" d-flex flex-column pt-1 md:pt-30 gap-0" style={{ zIndex: 10 }}>
			<div className="flex justify-center items-center h-100%">
				< div className="justify-center p-4 ">
					<div className="flex flex-col items-center justify-center gap-5 md:flex-row md:items-center md:justify-center w-full max-w-screen-lg lg:max-w-screen-xl ">
						<VideoPet onIdle={() => setIsIdle(true)} />
						<motion.div
							initial={{ opacity: 0, x: 500 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: .2, delay: 0.5, ease: "easeOut" }}
						>
							<LoginForm />
						</motion.div>
					</div>
				</div >
			</div>
		</div>
	</>);
}; 