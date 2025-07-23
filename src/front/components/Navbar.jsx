import { Link } from "react-router-dom";
import { Button } from './Button.jsx';
import { motion } from "motion/react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Avatar } from "./Profile/Avatar.jsx";


export const Navbar = () => {

	const { store } = useGlobalReducer();
	const isAuthenticated = store.auth.isAuthenticated;
	const userId = isAuthenticated && store.profile ? store.profile.id : null;
	const username = isAuthenticated && store.profile ? store.profile.user_info.userName : null;

	return (
		<>
			<motion.nav
				className="navbar mt-2 md:mt-4 mb-4 "
				initial={{ opacity: 0, y: -80 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: .4, ease: "easeOut" }}
			>
				<div className="md:px-8 px-2 flex justify-between">
					<Link to={isAuthenticated ? "/dashboard" : "/"}>
						<img src="/logo.png" className="h-6 md:h-8 mt-2" alt="Logo" />
					</Link>

					{isAuthenticated ? (
						<>
							<div>
								{userId ? (
									<Link to={`/profile/${userId}`}>
										<div className="flex justify-center items-center gap-2">
											<span className="lilita-one-regular md:text-xl self-center text-white">{username}</span>
											<Avatar className="h-15 w-15 sm:h-18 sm:w-18" userId={userId} />
										</div>
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