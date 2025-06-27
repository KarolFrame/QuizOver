import clsx from "clsx";

export const Button = ({
	label = "Submit",
	variant = "primary", // "primary", "secondary", "accent", "danger"
	type = "submit",
	disabled = false,
	className = "",
	...props
}) => {
	const baseStyles = "px-4 py-2 rounded font-medium transition-colors duration-200";

	const variants = {
		primary: "bg-primary text-white hover:bg-opacity-90",
		secondary: "bg-secondary text-white hover:bg-opacity-90",
		accent: "bg-accent text-white hover:bg-pink-600",
		danger: "bg-red-600 text-white hover:bg-red-700",
		ghost: "bg-transparent border border-white text-white hover:bg-white hover:text-black"
	};

	const finalClass = clsx(baseStyles, variants[variant], className);

	return (
		<button
			type={type}
			disabled={disabled}
			className={finalClass}
			{...props}
		>
			{label}
		</button>
	);
};