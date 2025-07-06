import { Login } from '../services/LoginService.js';
import { useState } from 'react';
import { Button } from './Button.jsx';
import { useNavigate } from 'react-router-dom';



export const LoginForm = () => {
	const [email, setEmail] = useState(localStorage.getItem("user-email") || "");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = await Login(email, password);
			console.log("login:", data);

			navigate("/game_selector");

		} catch (error) {
			console.error("error login:", error.message);
		}
	};

	return (
		<>
			<h1 className='text-4xl font-bold text-white'>Welcome back!</h1>


			<div className='flex justify-center'>
				<form className='flex flex-col bg-primary' onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder='Type your email'
						required
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
					<input
						type="password"
						placeholder='Type your password'
						required
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
					<Button label="Log In" variant="accent" />
				</form>
			</div>
		</>
	);
};
