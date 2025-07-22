// src/front/pages/Layout.jsx
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Loader } from "../components/Loader";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { loadSession, logOut } from "../services/authServices";
import { ParticlesBackground } from "../components/ParticlesBackground/ParticlesBackground";
import { Toaster } from 'sonner';

export const Layout = () => {
  const { dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, [location]);

  useEffect(() => {
    const session = loadSession();
    if (session) {
      dispatch({ type: "LOAD_AUTH_FROM_LOCALSTORAGE", payload: session });
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
          style: {
            background: 'rgba(59, 65, 114, 0.95)',
            color: '#ede9f1',
            border: '2px solid rgba(63, 159, 254, 0.3)',
            borderRadius: '24px',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '600',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(63, 159, 254, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#ede9f1',
              secondary: '#3f9ffe',
            },
          },
          error: {
            iconTheme: {
              primary: '#ede9f1',
              secondary: '#d259a1',
            },
          },
          warning: {
            iconTheme: {
              primary: '#ede9f1',
              secondary: '#f9bf14',
            },
          },
        }}
      />

      <div className="wrapper flex justify-center">
        {loading ? (
          <Loader />
        ) : (
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
