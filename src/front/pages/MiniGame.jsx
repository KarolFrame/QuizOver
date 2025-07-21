import React, { useEffect, useRef } from "react";

export const MiniGame = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/unity-build/Build/V.0.1.loader.js";

        script.onload = () => {
            const canvas = document.querySelector("#unity-canvas");

            const config = {
                dataUrl: "/unity-build/Build/V.0.1.data.br",
                frameworkUrl: "/unity-build/Build/V.0.1.framework.js.br",
                codeUrl: "/unity-build/Build/V.0.1.wasm.br",
                streamingAssetsUrl: "/unity-build/StreamingAssets",
                companyName: "DefaultCompany",
                productName: "mazo.exe",
                productVersion: "1.0",
            };

            window
                .createUnityInstance(canvas, config, (progress) => {
                    console.log(`Loading: ${Math.round(progress * 100)}%`);
                })
                .then((instance) => {
                    console.log("Unity loaded");
                })
                .catch((e) => {
                    console.error("Unity failed to load:", e);
                });
        };

        document.body.appendChild(script);
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div
                id="unity-container"
                style={{ width: 960, height: 600, zIndex: 10 }}
            >
                <canvas
                    id="unity-canvas"
                    width={960}
                    height={600}
                    tabIndex={-1}
                ></canvas>
            </div>
        </div>

    );
}
