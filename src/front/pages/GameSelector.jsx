import { useNavigate, Link } from "react-router-dom";
import { GameModeButton } from "../components/GameModeButton";
import { motion } from "motion/react";
import { VideoPet } from "../components/VideoPet";


export const GameSelector = () => {
  const navigate = useNavigate();

  const baseStyles = "h-14 px-4 rounded-full font-medium transition-colors duration-200 text-sm sm:text-base";


  return (
    <div className="flex flex-col items-center justify-center bg-secondary px-4 gap-13">
      <VideoPet />
      <Link to="/game/classic-mode" >
        <motion.img
          src="/images/classic-button.png"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: .5 }} />
      </Link>
    </div>
  );
};
