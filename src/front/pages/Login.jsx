import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import LoginForm from "../components/LoginForm.jsx";

export const Login = () => {

	return (
		<div className="text-center mt-5">
			<LoginForm />
		</div>
	);
}; 