import { AboutUsCard } from "../components/AboutUsCard.jsx";
import { motion } from "motion/react"

export const AboutUs = () => {

    return (
        <>
            <div className="text-center mt-5" style={{ zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, x: -500 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .8, ease: "easeOut" }}>
                    <h2 className="text-center align-middle text-white font-bold text-4xl m-5">
                        Meet the Super Team!
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
                        name={"Gen Iabichino"}
                        description={"Hi, I’m Génesis, a web developer with a strong interest in full stack development. I’m transitioning into tech from a UX-UI, bringing building functional & user friendly applications. "}


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