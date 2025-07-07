import clsx from "clsx";
import { motion } from "motion/react";

export const Button = ({
	label = "Submit",
	variant = "primary", // "primary", "secondary", "accent", "danger"
	type = "submit",
	disabled = false,
	className = "",
	size = "md", // "sm", "md", "lg"

	...props
}) => {
	const baseStyles = "px-4 py-2 rounded font-medium transition-colors duration-200";

	const sizeStyles = {
		sm: "h-[46px] px-4",
		md: "h-[52px] px-5",
		lg: "h-[60px] px-6",
	};

	const variants = {
		primary: "bg-primary text-white hover:bg-opacity-90",
		secondary: "bg-secondary text-white hover:bg-opacity-90",
		accent: "bg-accent text-white hover:bg-opacity-90",
		danger: "bg-red-600 text-white hover:bg-red-700",
		ghost: "bg-transparent border border-white text-white hover:bg-white hover:text-black",

	};

	const finalClass = clsx(baseStyles, variants[variant], sizeStyles[size], className);

	return (
		<motion.button
			type={type}
			disabled={disabled}
			className={finalClass}
			{...props}
			whileHover={{ scale: 1.1 }}
			transition={{ duration: .5 }}
		>

			{label}
		</motion.button>
	);
};