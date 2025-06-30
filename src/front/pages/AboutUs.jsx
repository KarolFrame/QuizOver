import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { AboutUsCard } from "../components/AboutUsCard.jsx";

export const AboutUs = () => {

    return (
        <div className="text-center mt-5">
            <h2 className="text-center align-middle text-white uppercase font-extrabold text-2xl">
                OUR TEAM
            </h2>
            <div className="flex flex-col items-center">
                <AboutUsCard
                    name={"Karol Frame"}
                    description={"Hi, I'm Carolina, a Frontend Developer and Game Programmer passionate about crafting intuitive interfaces and interactive digital experiences, both on the web and in games."}
                    image={"https://avatars.githubusercontent.com/u/97622225?v=4"}
                    github={"https://github.com/KarolFrame"}
                    linkedin={"https://www.linkedin.com/in/carolina-pérez-segura/"}
                />
                <AboutUsCard
                    name={"Genesis"}
                    description={"Hi, I’m Génesis, a motivated web developer in training with a strong interest in full-stack development, transitioning into tech from a design background and bringing a creative eye for building functional, user-friendly websites and applications."}
                    image={"https://avatars.githubusercontent.com/u/95757215?v=4"}
                    github={"https://github.com/chamitachama"}
                    linkedin={"https://www.linkedin.com/in/geniabichino/"}
                />
                <AboutUsCard
                    name={"Antonino Morana"}
                    description={""}
                    image={"https://avatars.githubusercontent.com/u/196092384?v=4"}
                    github={"https://github.com/Nino1508"}
                    linkedin={""}
                />
            </div>
        </div>

    );

}