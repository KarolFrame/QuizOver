import React, { useEffect } from "react"
import { RegisterForm } from "../components/RegisterForm.jsx";

export const Register = () => {

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center text-center transform -translate-y-30">
                <RegisterForm />
            </div>
        </>
    );

}