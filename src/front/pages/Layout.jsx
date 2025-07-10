// src/front/pages/Layout.jsx

import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Loader } from "../components/Loader";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Layout = () => {
    const { store, dispatch } = useGlobalReducer();

    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timeout);
    }, [location]);

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        const userEmail = localStorage.getItem("user-email");
        const userId = localStorage.getItem("user-id");

        const userInfoString = localStorage.getItem("user-info");
        let userInfo = null;

        if (userInfoString && userInfoString !== "undefined") {
            try {
                userInfo = JSON.parse(userInfoString);
            } catch (e) {
                console.error("Error al parsear user info de localStorage en Layout:", e);
                localStorage.removeItem("user-info");
                userInfo = null;
            }
        } else {
            userInfo = null;
            if (userInfoString === "undefined") {
                localStorage.removeItem("user-info");
            }
        }
        // -------------------------------

        if (token && userEmail && userId && userInfo) {
            dispatch({
                type: "LOAD_AUTH_FROM_LOCALSTORAGE",
                payload: {
                    token,
                    email: userEmail,
                    user_id: parseInt(userId),
                    user_info: userInfo,
                },
            });
        } else {
            console.log("No hay datos de autenticación completos en localStorage en Layout.");
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("user-email");
            localStorage.removeItem("user-id");
            localStorage.removeItem("user-info");
        }
    }, [dispatch]);

    return (
        <>
            <div className="wrapper flex justify-center">
                {loading ? <Loader /> : (
                    <ScrollToTop>
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </ScrollToTop>
                )}
            </div>
        </>
    );
};

export default Layout;