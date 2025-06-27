import { register } from '../services/authServices.js';
import { useState } from 'react';
import { Button } from './Button.jsx';

export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await register(email, password);
            console.log("register:", data);
            if (data.token) {
                localStorage.setItem("jwt-token", data.token);
            }
            localStorage.setItem("user-email", email);
            alert("Registration successful!");
            setEmail('');
            setPassword('');

            // redirigir el registro, programar aqui

        } catch (error) {
            console.error("error register:", error.message);
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
                        placeholder='Create a password'
                        required
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <Button label="Create Account" variant="accent" type='submit' />
                </form>
            </div>
        </>
    );
};
