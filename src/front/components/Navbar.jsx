import { Link } from "react-router-dom";
import { Button } from './Button.jsx';
import { motion } from "motion/react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Avatar } from "./Profile/Avatar.jsx";


export const Navbar = () => {

	const { store } = useGlobalReducer();
	const isAuthenticated = store.auth.isAuthenticated;
	const userId = isAuthenticated && store.profile ? store.profile.id : null;

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
						<img src="/logo.png" className="h-6 md:h-8 mt-2" alt="Logo" />
					</Link>

					{isAuthenticated ? (
						<>
							<div>
								{userId ? (
									<Link to={`/profile/${userId}`}>
										<Avatar className="h-15 w-15 sm:h-18 sm:w-18" userId={userId} />
									</Link>
								) : (
									<Avatar className="h-15 w-15 sm:h-18 sm:w-18" />
								)}
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