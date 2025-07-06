import { useState } from 'react';
import { Button } from './Button.jsx';
import { register } from '../services/RegisterService.js';
import { Link } from "react-router-dom";
import { VideoPet } from './VideoPet.jsx';

export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const data = await register(email, password);
            console.log("register:", data)
        } catch (error) {
            console.error("error register:", error.message);
        }
    }

    return (
        <>
            <h1 className='text-4xl font-bold text-white'>Create an Account</h1>
            <div className='flex justify-center'>
                <form className='flex flex-col bg-primary' onSubmit={handleSubmit}>
                    <input type="email" placeholder='Type your email' required value={email} onChange={event => setEmail(event.target.value)} />
                    <input type="password" placeholder='Create a password' required value={password} onChange={event => setPassword(event.target.value)} />
                    <Button label="Create Account" variant="accent" />
                </form>
            </div>
            <Link to="/login"> <span className=' font-normal text-gray-400 underline'>Already have an account? Log in</span></Link>
        </>
    )
};
