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
import { Toaster } from 'sonner';

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
            <Toaster 
                position="top-center"
                richColors
                closeButton
                expand={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'rgba(59, 65, 114, 0.95)', // --color-bg-light con transparencia
                        color: '#ede9f1', // --color-white
                        border: '2px solid rgba(63, 159, 254, 0.3)', // Borde con color info
                        borderRadius: '24px', // Más redondeado para look gaming
                        padding: '16px 24px',
                        fontSize: '16px',
                        fontWeight: '600',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(63, 159, 254, 0.1)',
                    },
                    className: 'sonner-toast-gaming',
                    success: {
                        style: {
                            background: 'linear-gradient(135deg, #3f9ffe 0%, #3f9ffe 50%, rgba(63, 159, 254, 0.8) 100%)',
                            color: '#ede9f1',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 10px 40px rgba(63, 159, 254, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)',
                        },
                        iconTheme: {
                            primary: '#ede9f1',
                            secondary: '#3f9ffe',
                        },
                    },
                    error: {
                        style: {
                            background: 'linear-gradient(135deg, #d259a1 0%, #d259a1 50%, rgba(210, 89, 161, 0.8) 100%)',
                            color: '#ede9f1',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 10px 40px rgba(210, 89, 161, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)',
                        },
                        iconTheme: {
                            primary: '#ede9f1',
                            secondary: '#d259a1',
                        },
                    },
                    warning: {
                        style: {
                            background: 'linear-gradient(135deg, #f9bf14 0%, #f9bf14 50%, rgba(249, 191, 20, 0.8) 100%)',
                            color: '#232748',
                            border: '2px solid rgba(35, 39, 72, 0.2)',
                            boxShadow: '0 10px 40px rgba(249, 191, 20, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.3)',
                        },
                        iconTheme: {
                            primary: '#232748',
                            secondary: '#f9bf14',
                        },
                    },
                }}
            />
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