import { RegisterForm } from "../components/RegisterForm.jsx";
import { register } from "../services/RegisterService.js";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LoopingRewindVideo } from "../components/HeaderVideo.jsx";
import { AvatarCreatorQO } from "../components/AvatarCreatorQO.jsx";
import { Button } from "../components/Button.jsx";
import { persistUserSession } from "../services/authServices.js";
import { toast } from "sonner";

export const Register = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleRegister = async (username, email, password) => {
        try {
            const data = await register(username, email, password);
            persistUserSession(data);

            dispatch({ type: "REGISTER_SUCCESS", payload: data });
            toast.success("Registration successful!", {
                description: "Welcome aboard! You’re now logged in.",
                duration: 3000,
            });

            navigate("/dashboard");
        } catch (error) {
            console.error("Register error:", error.message);
            toast.error(error.message || "Registration failed", {
                description: "Please check your details and try again.",
                duration: 4000,
            });
        }
    };

    return (
        <>
            <div className="d-flex flex-column gap-0 text-center" style={{ zIndex: 10 }}>
                <div className="flex justify-center items-center">
                    <LoopingRewindVideo
                        videoSrc="/video/header_video2.mp4"
                        handleRegister={handleRegister}
                    />
                </div>
            </div>
        </>
    );
};
