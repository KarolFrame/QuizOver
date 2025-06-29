import { login } from '../services/authServices.js';
import { useState } from 'react';
import { Button } from './Button.jsx';
import { getCurrentUser } from '../services/authServices.js';

const LoginForm = () => {
	const [email, setEmail] = useState(localStorage.getItem("user-email") || "");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = await login(email, password);
			console.log("login:", data);

			localStorage.setItem("jwt-token", data.token);
			localStorage.setItem("user-email", email);

			//redireccion despues del login, poner aqui

		} catch (error) {
			console.error("error login:", error.message);
		}
	};

	return (
		<>
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

export default LoginForm;
