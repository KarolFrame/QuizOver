import { motion } from "motion/react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <motion.footer
    className="footer mt-auto py-2 text-center justify-center"
    initial={{ opacity: 0, y: 80 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: .8, delay: 5, ease: "easeOut" }}
  >
    <Link to="/about-us">
      <p>About Us</p>
    </Link>
    <Link to="/profile">
      <p>My Profile</p>
    </Link>
  </motion.footer>
);
