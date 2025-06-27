import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { RegisterForm } from "../components/RegisterForm.jsx";

export const Register = () => {

    return (
        <div className="text-center mt-5">
            <RegisterForm />
        </div>
    );

}