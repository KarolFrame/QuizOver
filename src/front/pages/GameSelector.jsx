import { useNavigate } from "react-router-dom";
// import { useGlobalReducer } from "../utils/GlobalContext.jsx"; 
import { GameModeButton } from "../components/GameModeButton";

export const GameSelector = () => {
  const navigate = useNavigate();
  // const [state, dispatch] = useGlobalReducer();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary px-4">
      <div className="bg-primary p-8 rounded-3xl shadow-lg w-full max-w-xl space-y-6">
        <h2 className="text-white text-2xl font-extrabold text-center">Choose Your Game Mode</h2>

        <div className="w-full">
          <GameModeButton label="Classic" onClick={() => navigate("/classic")} icon="/icons/classic.png" />
        </div>

        <div className="flex w-full gap-x-4">
          <div className="flex-1">
            <GameModeButton label="Guess the Music" onClick={() => navigate("/music")} icon="/icons/music.png" />
          </div>
          <div className="flex-1">
            <GameModeButton label="Know the frame?" onClick={() => navigate("/frame")} icon="/icons/frame.png" />
          </div>
        </div>

        <div className="w-full">
          <GameModeButton label="Who’s that character?" onClick={() => navigate("/character")} icon="/icons/guesswho.png" />
        </div>
      </div>
    </div>
  );
};
