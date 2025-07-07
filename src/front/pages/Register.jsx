import React from "react";
import { RegisterForm } from "../components/RegisterForm.jsx";
import { register } from "../services/RegisterService.js";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";



export const Register = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleRegister = async (email, password) => {
        try {
            const data = await register(email, password);

            localStorage.setItem("jwt-token", data.token);
            localStorage.setItem("user-email", data.email);

            dispatch({ type: "REGISTER_SUCCESS", payload: data });

            alert(data.msg);
            navigate("/");

        } catch (error) {
            alert(error.message);
            console.error("Register error:", error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
            <RegisterForm onSubmit={handleRegister} />
        </div>
    );
};
