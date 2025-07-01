import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Loader } from "../components/Loader";



// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();


    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timeout);
    }, [location]);


    return (
        <div className="wrapper">
            <ScrollToTop>
                <Navbar />
                {loading ? <Loader /> : <Outlet />}
                <Footer />
            </ScrollToTop>
        </div>
    )
};

export default Layout;