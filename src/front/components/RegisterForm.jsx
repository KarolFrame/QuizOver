import { login } from '../services/authServices.js';
import { useState } from 'react';
import { Button } from './Button.jsx';

export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
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
                    <input type="email" placeholder='Type your email' required value={email} onChange={event => setEmail(event.target.value)} />
                    <input type="password" placeholder='Create a password' required value={password} onChange={event => setPassword(event.target.value)} />
                    <Button label="Create Account" variant="accent" />
                </form>
            </div>
        </>
    )
};
