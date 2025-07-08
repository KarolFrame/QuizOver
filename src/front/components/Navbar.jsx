import { Link } from "react-router-dom";
import { Button } from './Button.jsx';
import { motion } from "motion/react";
import { LogoutButton } from "./LogoutButton";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { dispatch, store } = useGlobalReducer();
	const { isAuthenticated } = store.auth;
	return (<>
		<motion.nav
			className="navbar mb-4 "
			initial={{ opacity: 0, y: -80 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: .4, ease: "easeOut" }}>
			<div className=" px-8 flex justify-between">
				<Link to={isAuthenticated ? "/home" : "/"}>
					<img src="/logo.png" className="h-4 md:h-8 mt-2" />
				</Link>
				<div>
					<Link to="/login">
						<Button label="Log in" variant="secondary" size="sm" />
					</Link>
					<Link to="/">
						<Button label="Register" variant="accent" size="sm" />
					</Link>

					{isAuthenticated ? (
						<>
							<span className="text-gray-300">{userEmail}</span>
							<LogoutButton />
						</>
					) : (
						<div>
							<Link to="/login">
								<Button label="Log in" variant="secondary" size="sm" />
							</Link>
							<Link to="/">
								<Button label="Register" variant="accent" size="lg" />
							</Link>
						</div>
					)}
				</div>
			</motion.nav>
		</>
	);
};