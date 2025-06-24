import { login } from '../services/authServices.js';
import { useState } from 'react';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const data = await login(email, password);
			console.log("login:", data)
		} catch (error) {
			console.error("error login:", error.message);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="email" placeholder='email' required value={email} onChange={e => setEmail(e.target.value)} />
			<input type="password" placeholder='password' required value={password} onChange={e => setPassword(e.target.value)} />
			<button type="submit">submit</button>
		</form>
	)
};

export default LoginForm;