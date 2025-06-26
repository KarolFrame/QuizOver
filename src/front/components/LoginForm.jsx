import { login } from '../services/authServices.js';
import { useState } from 'react';
import { SubmitButton } from './SubmitButton.jsx';

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
		<>
			<div className='flex justify-center'>
				<form className='flex flex-col bg-primary' onSubmit={handleSubmit}>
					<input type="email" placeholder='Type your email' required value={email} onChange={e => setEmail(e.target.value)} />
					<input type="password" placeholder='Type your password' required value={password} onChange={e => setPassword(e.target.value)} />
					<SubmitButton />
				</form>
			</div>
		</>
	)
};

export default LoginForm;