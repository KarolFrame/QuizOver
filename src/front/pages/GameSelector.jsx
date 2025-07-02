import { useNavigate } from "react-router-dom";
import { GameModeButton } from "../components/GameModeButton";

export const GameSelector = () => {
  const navigate = useNavigate();

  // Estilos base para los botones: 56px de alto, padding horizontal, borde redondeado
  const baseStyles = "h-14 px-4 rounded-full font-medium transition-colors duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="bg-primary w-full max-w-xl rounded-3xl p-8 space-y-2 items-start">
        <h2 className="text-white text-2xl font-extrabold text-center">
          Choose Your Game Mode
        </h2>

        {/* Fila 1: botón grande */}
        <div
          id="classic-button-container"
          className="game-selector-button-classic flex"
        >
          <GameModeButton
            label="Classic"
            onClick={() => navigate("/classic")}
            icon="/icons/classic.png"
            className={baseStyles}
          />
        </div>

        {/* Fila 2: dos botones iguales */}
        <div className="flex gap-4">
          <div className="flex-1">
            <GameModeButton
              label="Guess the Music"
              onClick={() => navigate("/music")}
              icon="/icons/music.png"
              className={baseStyles}
            />
          </div>
          <div className="flex-1">
            <GameModeButton
              label="Know the frame?"
              onClick={() => navigate("/frame")}
              icon="/icons/frame.png"
              className={baseStyles}
            />
          </div>
        </div>

        {/* Fila 3: botón ancho pequeño */}
        <div>
          <GameModeButton
            label="Who’s that character?"
            onClick={() => navigate("/character")}
            icon="/icons/guesswho.png"
            className={baseStyles}
          />
        </div>
      </div>
    </div>
  );
};
