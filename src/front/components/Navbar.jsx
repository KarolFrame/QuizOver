import { Link } from "react-router-dom";
import { Button } from './Button.jsx';
import { motion } from "motion/react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LogoutButton } from "./LogoutButton";


export const Navbar = () => {

	const { store } = useGlobalReducer();
	const isAuthenticated = store.auth.isAuthenticated;
	const userEmail = store.auth.userEmail;

	return (
		<>
			<motion.nav
				className="navbar mt-2 md:mt-4 mb-4 "
				initial={{ opacity: 0, y: -80 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: .4, ease: "easeOut" }}
			>
				<div className="px-8 flex justify-between">
					<Link to={isAuthenticated ? "/home" : "/"}>
						<img src="/logo.png" className="h-4 md:h-8 mt-2" />
					</Link>

					{isAuthenticated ? (
						<>
							<div>
								{/* <span className="text-gray-300">{userEmail}</span> 	Username later */}

								<LogoutButton />

							</div>
						</>
					) : (
						<div>
							<Link to="/login">
								<Button label="Log in" variant="ghost" size="responsive" />
							</Link>
							<Link to="/">
								<Button label="Register" variant="accent" size="responsive" />
							</Link>
						</div>
					)}
				</div>
			</motion.nav>
		</>
	);
};