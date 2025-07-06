import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { LoginForm } from "../components/LoginForm.jsx";

export const Login = () => {

	return (
		<div className="min-h-screen flex flex-col items-center justify-center text-center transform -translate-y-30">
			<LoginForm />
		</div>
	);
}; 