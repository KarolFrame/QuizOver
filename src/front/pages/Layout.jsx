// src/front/pages/Layout.jsx

import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Loader } from "../components/Loader";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ParticlesBackground } from "../components/ParticlesBackground/ParticlesBackground";
import { loadSession, logOut } from "../services/authServices";

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
        const session = loadSession();

        if (session) {
            dispatch({
                type: "LOAD_AUTH_FROM_LOCALSTORAGE",
                payload: session,
            });
        } else {
            console.warn("Sesión inválida o incompleta. Cerrando sesión.");
            logOut();
        }
    }, [dispatch]);



    return (
        <>
            <ParticlesBackground />
            <div className="wrapper flex justify-center" >
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