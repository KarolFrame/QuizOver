import React, { useEffect, useRef } from "react";

export const MiniGame = () => {
    const unityInstanceRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/unity-build/Build/Mazo_V.0.2.loader.js";
        script.async = true;

        const existingScript = document.body.querySelector(`script[src="${script.src}"]`);
        if (existingScript) {
            existingScript.remove();
        }

        script.onload = () => {
            const canvas = document.querySelector("#unity-canvas");
            if (!canvas) {
                console.error("Unity canvas not found!");
                return;
            }

            const config = {
                dataUrl: "/unity-build/Build/Mazo_V.0.2.data.br",
                frameworkUrl: "/unity-build/Build/Mazo_V.0.2.framework.js.br",
                codeUrl: "/unity-build/Build/Mazo_V.0.2.wasm.br",
                streamingAssetsUrl: "/unity-build/StreamingAssets",
                companyName: "QuizOver",
                productName: "mazo.exe",
                productVersion: "1.0",
                matchWebGLToCanvasSize: false,
            };

            if (typeof window.createUnityInstance !== 'function') {
                console.error("window.createUnityInstance is not defined. Unity loader script might not have loaded correctly.");
                return;
            }

            window
                .createUnityInstance(canvas, config, (progress) => {
                    console.log(`Loading: ${Math.round(progress * 100)}%`);
                })
                .then((instance) => {
                    unityInstanceRef.current = instance;
                    console.log("Unity loaded");
                })
                .catch((e) => {
                    console.error("Unity failed to load:", e);
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                });
        };

        document.body.appendChild(script);

        return () => {
            const currentUnityInstance = unityInstanceRef.current;
            if (currentUnityInstance) {
                console.log("Attempting to quit Unity instance...");
                currentUnityInstance.Quit()
                    .then(() => {
                        console.log("Unity instance successfully quitted.");
                        unityInstanceRef.current = null;
                        const unityCanvas = document.querySelector("#unity-canvas");
                        if (unityCanvas && unityCanvas.parentNode) {
                            unityCanvas.parentNode.removeChild(unityCanvas);
                        }
                    })
                    .catch((err) => {
                        console.error("Error quitting Unity instance:", err);
                    });
            }
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div
                id="unity-container"
                style={{ width: 960, height: 600, zIndex: 10 }}
            >
                <canvas
                    id="unity-canvas"
                    width="960px"
                    height="800px"
                    tabIndex={-1}
                ></canvas>
            </div>
        </div>
    );
};