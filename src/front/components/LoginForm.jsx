import { useState } from 'react';
import { Button } from './Button.jsx';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Login } from '../services/LoginService.js';

export const LoginForm = () => {
    const [email, setEmail] = useState(localStorage.getItem("user-email") || "");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { dispatch } = useGlobalReducer();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await Login(email, password);

            localStorage.setItem("jwt-token", data.token);
            localStorage.setItem("user-email", data.email);
            localStorage.setItem("user-id", data.user_id);
            localStorage.setItem("user-info", JSON.stringify(data.user_info));

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { 
                    email: data.email, 
                    token: data.token,
                    user_id: data.user_id,
                    user_info: data.user_info,
                    experience_points: data.experience_points,
                    friends: data.friends
                }
            });

            navigate("/home");

        } catch (error) {
            console.error("error login:", error.message);
            dispatch({ type: "SET_MESSAGE", payload: error.message || "Error al iniciar sesión." });
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