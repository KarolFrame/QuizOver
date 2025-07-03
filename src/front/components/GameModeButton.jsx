import clsx from "clsx";

export const GameModeButton = ({ label, onClick, icon = null, className = "" }) => {
  const finalClass = clsx(
    "game-mode-button-default",            // clase específica para override
    "h-14 px-6 rounded-full",             // altura fija y padding horizontal
    "w-full flex items-center justify-center gap-3 bg-accent text-white shadow-md hover:opacity-90 transition",
    "font-medium",
    className
  );

  return (
    <button onClick={onClick} className={finalClass}>
      {icon && <img src={icon} alt={`${label} icon`} className="w-13 h-13 object-contain" />}
      <span className="leading-snug">{label}</span>
    </button>
  );
};
