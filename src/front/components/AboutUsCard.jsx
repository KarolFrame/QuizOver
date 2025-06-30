
import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { HugeiconsIcon } from '@hugeicons/react';
import { GithubIcon, Linkedin02Icon } from '@hugeicons/core-free-icons';

export const AboutUsCard = ({ name, description, image, github, linkedin }) => {

    return (
        <div className="text-center m-5 w-[350px]">
            <div className='flex justify-center flex-col bg-primary rounded-[20px] gap-1 p-5'>
                <img src={image} className="rounded-[20px]" />
                <h1 className="text-center align-middle text-(--color-white) uppercase font-[800] text-2xl">{name}</h1>
                <div className="flex flex-row justify-center items-center gap-4">
                    <a href={github} target="_blank" rel="noreferrer">
                        <button
                            className="font-extrabold w-[125px] h-[30px] flex items-center justify-center gap-2 bg-(--color-info)">
                            <HugeiconsIcon icon={GithubIcon} />
                            Github
                        </button>
                    </a>

                    <a href={linkedin} target="_blank" rel="noreferrer">
                        <button
                            className="font-extrabold w-[125px] h-[30px] flex items-center justify-center gap-2 bg-(--color-accent)">
                            <HugeiconsIcon icon={Linkedin02Icon} />
                            Linkedin
                        </button>
                    </a>
                </div>
                <p className="text-(--color-white) bg-(--color-bg-light) mt-2 p-3 rounded-[20px] text-justify">{description}</p>
            </div>
        </div >
    );
}