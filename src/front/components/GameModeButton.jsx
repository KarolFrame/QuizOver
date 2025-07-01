export const GameModeButton = ({ label, onClick, icon = null }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-full bg-accent text-white rounded-2xl px-6 py-4 flex items-center justify-center gap-3 shadow-md hover:opacity-90 transition"
    >
      <div className="w-20 h-20 flex items-center justify-center">
        {icon && (
          <img
            src={icon}
            alt={`${label} icon`}
            className="w-20 h-20 object-contain"
          />
        )}
      </div>
      <span className="text-lg font-semibold text-center leading-snug">{label}</span>
    </button>
  );
};
