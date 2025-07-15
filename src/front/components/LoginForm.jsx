import { useState } from 'react';
import { Button } from './Button.jsx';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Login } from '../services/authServices';
import { Link } from 'react-router-dom';

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
                    token: data.token,
                    email: data.email,
                    user_id: data.user_id,
                    experience_points: data.experience_points,
                    friends: data.friends || {},
                    user_info: data.user_info || {},
                },
            })

            navigate("/home");

        } catch (error) {
            console.error("error login:", error.message);
            dispatch({ type: "SET_MESSAGE", payload: error.message || "Error al iniciar sesión." });
        }
    };

    return (
        <>
            <h1 className='text-4xl font-bold text-white'>Welcome back!</h1>
            <div className='flex flex-col justify-center'>
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
                <Link to="/register">
                    <span className="font-normal text-gray-400 underline">
                        Don't have an account yet? Sign up
                    </span>
                </Link>
            </div>
        </>
    );
};