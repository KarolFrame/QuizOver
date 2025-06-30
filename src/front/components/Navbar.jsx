import { Link } from "react-router-dom";
import { Button } from './Button.jsx';

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container flex">
				<Link to="/">
					<img src="/logo.png" className="h-16 mt-2" />
				</Link>
			</div>
		</nav>
	);
};