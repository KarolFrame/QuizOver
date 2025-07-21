import { RegisterForm } from "../components/RegisterForm.jsx";
import { register } from "../services/RegisterService.js";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LoopingRewindVideo } from "../components/HeaderVideo.jsx";
import { AvatarCreatorQO } from "../components/AvatarCreatorQO.jsx";
import { Button } from "../components/Button.jsx";
import { persistUserSesion } from "../services/authServices.js";


export const Register = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleRegister = async (username, email, password) => {
        try {
            const data = await register(username, email, password);

            persistUserSesion(data);

            dispatch({ type: "REGISTER_SUCCESS", payload: data });

            alert(data.msg);
            navigate("/dashboard");
        } catch (error) {
            alert(error.message || "Error al registrarse");
            console.error("Register error:", error.message);
        }
    };

    return (<>
        <div className=" d-flex flex-column gap-0 text-center" style={{ zIndex: 10 }}>
            <div className="flex justify-center items-center">
                <LoopingRewindVideo videoSrc="/video/header_video2.mp4" handleRegister={handleRegister} />
            </div>
        </div>
    </>
    );
};