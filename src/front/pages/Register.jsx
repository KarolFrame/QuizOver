import { RegisterForm } from "../components/RegisterForm.jsx";
import { register } from "../services/RegisterService.js";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LoopingRewindVideo } from "../components/HeaderVideo.jsx";
import { AvatarCreatorQO } from "../components/AvatarCreatorQO.jsx";
import { Button } from "../components/Button.jsx";

export const Register = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleRegister = async (username, email, password) => {
        console.log("handleRegister en el padre recibió:", { username, email, password });

        try {
            const data = await register(username, email, password);

            localStorage.setItem("jwt-token", data.token);
            localStorage.setItem("user-email", data.email);
            localStorage.setItem("user-id", data.user_id);
            localStorage.setItem("user-username", data.user_info.userName || "");
            localStorage.setItem("user-avatar", data.user_info.avatar || "");
            localStorage.setItem("user-genre", data.user_info.genre || "");
            localStorage.setItem("user-birthday", data.user_info.birthday || "");

            dispatch({ type: "REGISTER_SUCCESS", payload: data });

            alert(data.msg);
            navigate("/home");

        } catch (error) {
            alert(error.message);
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