import { useState } from 'react';
import { Button } from './Button.jsx';
import { Link } from "react-router-dom";

export const RegisterForm = ({ handleRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Register:", username, "Email:", email, "Password:", password);
        if (handleRegister) {
            handleRegister(username, email, password);
        }
    };

    return (
        <>
            <h1 className='text-4xl font-bold text-white'>Crear una Cuenta</h1>
            <div className='flex justify-center'>
                <form className='flex flex-col bg-primary' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Username'
                        maxLength={30}
                        pattern="^[a-zA-Z0-9_]{3,30}$"
                        required
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <input
                        type="email"
                        placeholder='Email'
                        required
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        required
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <Button label="Crear Cuenta" variant="accent" />
                </form>
            </div>
            <Link to="/login">
                <span className='font-normal text-gray-400 underline'>
                    Alredy have an account? Log-In
                </span>
            </Link>
        </>
    );
};