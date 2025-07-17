import { logOut } from "../services/authServices.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Button } from "./Button.jsx";


export const LogoutButton = () => {
    const { dispatch } = useGlobalReducer

    const handleLogout = () => {
        logOut({ redirectTo: '/login' });
        dispatch({ type: "AUTH_LOGOUT" });
    };

    return (
        <Button
            label="Logout"
            variant="danger"
            size="responsive"
            onClick={handleLogout}
        />
    );
};
