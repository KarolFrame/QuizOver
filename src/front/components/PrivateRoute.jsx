import { Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PrivateRoute = ({ children }) => {
    const { store } = useGlobalReducer();
    const { isAuthenticated } = store.auth;
    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;