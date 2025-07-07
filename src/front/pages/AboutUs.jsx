import { AboutUsCard } from "../components/AboutUsCard.jsx";
import { motion } from "motion/react"

export const AboutUs = () => {

    return (
        <>
            <div className="text-center mt-5">
                <motion.div
                    initial={{ opacity: 0, x: -500 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .8, ease: "easeOut" }}>
                    <h2 className="text-center align-middle text-white uppercase font-extrabold text-5xl m-5">
                        OUR TEAM
                    </h2>
                </motion.div>
                <div className="flex flex-col items-center md:flex-row md:items-start items-center justify-center gap-4">
                    <AboutUsCard
                        name={"Karol Frame"}
                        description={"Hi, I'm Carolina, a Frontend Developer and Game Programmer passionate about crafting intuitive interfaces and interactive digital experiences, both on the web and in games."}
                        image={"https://avatars.githubusercontent.com/u/97622225?v=4"}
                        github={"https://github.com/KarolFrame"}
                        linkedin={"https://www.linkedin.com/in/carolina-pérez-segura/"}
                        delay={0}
                    />
                    <AboutUsCard
                        name={"Genesis"}
                        description={"Hi, I’m Génesis, a motivated web developer in training passionate about full-stack development, blending creativity and technical skills to build user-friendly websites."}
                        image={"https://avatars.githubusercontent.com/u/95757215?v=4"}
                        github={"https://github.com/chamitachama"}
                        linkedin={"https://www.linkedin.com/in/geniabichino/"}
                        delay={.4}
                    />
                    <AboutUsCard
                        name={"Antonino Morana"}
                        description={"Hi, I’m Nino, a Full-Stack Developer in training who loves turning ideas into intuitive, user-friendly digital experiences through code and collaboration."}
                        image={"/images/nino.png"}
                        github={"https://github.com/Nino1508"}
                        linkedin={""}
                        delay={.8}
                    />
                </div>
            </div>
        </>
    );

}