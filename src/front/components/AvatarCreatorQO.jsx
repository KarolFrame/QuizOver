import React, { useState, useCallback } from 'react';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { Button } from './Button';

export const AvatarCreatorQO = ({ desactivate, onAvatarExportedCallback }) => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const config = {
        clearCache: true,
        bodyType: 'fullbody',
        mode: '2d',
        onAvatarLoaded: () => {
            console.log('¡Avatar cargado en Ready Player Me!');
        },
        onUserSet: (event) => {
            console.log(`ID de usuario de Ready Player Me: ${event.data.id}`);
        },
        onAssetLoaded: (event) => {
            console.log(`Activo cargado en Ready Player Me: ${event.data.assetId}`);
        },
        onError: (error) => {
            console.error('Error de Ready Player Me:', error);
        },
    };

    const handleAvatarExported = useCallback((event) => {
        console.log('Evento de Avatar Exportado desde Ready Player Me:', event);
        if (event && event.data && event.data.url) {
            const { url } = event.data;
            const thumbnailUrl = url.replace('.glb', '.png');
            setAvatarUrl(thumbnailUrl);
            if (onAvatarExportedCallback) {
                onAvatarExportedCallback(thumbnailUrl);
            }
        }
    }, [onAvatarExportedCallback, desactivate]);

    return (
        <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center p-4" style={{ zIndex: 10 }}>
            {!avatarUrl ? (
                <div className="w-full h-full max-w-3xl rounded-lg overflow-hidden shadow-lg">
                    <AvatarCreator
                        className="w-full h-full"
                        config={config}
                        onAvatarExported={handleAvatarExported}
                    />
                </div>
            ) : (
                <div className="mt-8 text-center bg-primary p-6 rounded-lg shadow-xl">
                    <h2 className="text-xl font-semibold mb-4 text-white">Your Avatar:</h2>
                    <img src={avatarUrl} alt="Ready Player Me Avatar" className="w-48 h-auto mx-auto rounded-full border-4 border-purple-500" />
                    <Button label="Continue" variant="info" size="sm" onClick={desactivate} />
                </div>
            )}
        </div>
    );
};