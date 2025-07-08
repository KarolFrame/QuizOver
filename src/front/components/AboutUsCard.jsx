import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { HugeiconsIcon } from '@hugeicons/react';
import { GithubIcon, Linkedin02Icon } from '@hugeicons/core-free-icons';
import { motion } from "motion/react"

export const AboutUsCard = ({ name, description, image, github, linkedin, delay = 0 }) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, delay, ease: "easeOut" }}>
            <motion.div
                className="text-center m-5 w-[350px]"
                transition={{ duration: .2, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}>
                <div className='flex justify-center flex-col bg-primary rounded-[16px] gap-1 p-5'>
                    <img src={image} className="rounded-[200px]" />
                    <h1 className="text-center mt-2 align-middle text-(--color-white) uppercase font-[800] text-2xl">{name}</h1>
                    <div className="flex flex-row justify-center items-center gap-4">
                    </div>
                    <p className="text-(--color-white)  mt-4 mb-4 p-3 rounded-[20px] text-left">{description}</p>
                    <div className=" row justify-between flex mt-2">
                        <motion.div
                            whileHover={{ scale: 1.09 }}
                            transition={{ duration: .2 }}>
                            <a className="col" href={github} target="_blank" rel="noreferrer">
                                <button
                                    className="col font-extrabold w-35 h-[46px]  flex items-center justify-center gap-2 bg-(--color-info)">
                                    <HugeiconsIcon icon={GithubIcon} />
                                    Github
                                </button>
                            </a>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.09 }}
                            transition={{ duration: .2 }}>
                            <a href={linkedin} target="_blank" rel="noreferrer">
                                <button
                                    className="font-extrabold w-35 h-[46px] flex items-center justify-center gap-2 bg-(--color-accent)">
                                    <HugeiconsIcon icon={Linkedin02Icon} />
                                    Linkedin
                                </button>
                            </a>
                        </motion.div>

                    </div>
                </div>

            </motion.div >
        </motion.div>

    );
}