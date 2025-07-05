import { Link } from "react-router-dom";
import { Button } from './Button.jsx';

export const Navbar = () => {

	return (
		<nav className="navbar mb-8 ">
			<div className=" px-8 flex justify-between">
				<Link to="/">
					<img src="/logo.png" className="h-8 mt-2" />
				</Link>
				<div>
					<Link to="/game_selector">
						<button>Game Selector</button>
					</Link>
					<Link to="/game/clasic-mode">
						<button>Classic Game</button>
					</Link>
					<Link to="/ranking/global">
						<button>GlobalRanking</button>
					</Link>
					<Link to="/about-us">
						<button>About Us</button>
					</Link>
				</div>
				<div>
					<Link to="/login">
						<Button label="Log in" variant="secondary" size="sm" />
					</Link>
					<Link to="/register">
						<Button label="Register" variant="accent" size="lg" />
					</Link>

				</div>
			</div>
		</nav>
	);
};