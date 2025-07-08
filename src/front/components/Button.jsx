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
	const baseStyles = "rounded font-medium transition-colors duration-200";

	const sizeStyles = {
		sm: "h-[32px] px-4 text-sm",
		md: "h-[52px] px-5",
		lg: "h-[60px] px-6",
		responsive: "h-[32px] px-4 text-sm md:h-[46px] md:px-5 md:text-base",

	};

	const variants = {
		primary: "bg-primary text-white hover:bg-opacity-90",
		secondary: "bg-secondary text-white hover:bg-opacity-90",
		accent: "bg-accent text-white hover:bg-opacity-90",
		info: "bg-info text-white hover:bg-opacity-90",
		danger: "bg-red-600 text-white hover:bg-red-700",
		linear: "bg-transparent border border-white text-white hover:bg-white hover:text-primary",
		ghost: "bg-transparent text-white hover:bg-danger hover:text-primary",


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