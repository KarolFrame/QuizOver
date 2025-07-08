import { logout } from "../services/authServices.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button.jsx";


export const LogoutButton = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        dispatch({ type: "AUTH_LOGOUT" });
        navigate("/login");
    };

    return (
        <Button
            label="Logout"
            variant="secondary"
            size="responsive"
            onClick={handleLogout}
        />
    );
};
