import { Link } from "react-router-dom";
import { Button } from './Button.jsx';
import { motion } from "motion/react";

export const Navbar = () => {

	return (<>
		<motion.nav
			className="navbar mb-8 "
			initial={{ opacity: 0, y: -80 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: .8, delay: 5, ease: "easeOut" }}>
			<div className=" px-8 flex justify-between">
				<Link to="/">
					<img src="/logo.png" className="h-8 mt-2" />
				</Link>
				{/*<div>
					<Link to="/game_selector">
						<button>Game Selector</button>
					</Link>
					<Link to="/game/classic-mode">
						<button>Classic Game</button>
					</Link>
					<Link to="/ranking/global">
						<button>GlobalRanking</button>
					</Link>
				</div>*/}
				<div>
					<Link to="/login">
						<Button label="Log in" variant="secondary" size="sm" />
					</Link>
					<Link to="/">
						<Button label="Register" variant="accent" size="lg" />
					</Link>

				</div>
			</div>
		</motion.nav>
	</>);
};