import React from 'react';

/**
 * Avatars
 *
 * Muestra las posiciones 2, 1 y 3 con nombre y puntuación.
 * Recibe prop `entries`: array de { position, name, score }.
 * Si no recibe entries, usa datos por defecto para demo.
 */
export const Avatars = ({ entries }) => {
  const defaultEntries = [
    { position: 2, name: 'Carolina', score: '3,456' },
    { position: 1, name: 'Sofi',    score: '5,676' },
    { position: 3, name: 'Gen',     score: '2,456' },
  ];
  const list = entries ?? defaultEntries;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Contenedor de altura fija para alinear con el podio */}
      <div className="flex justify-between items-end" style={{ height: '200px' }}>
        {list.map(({ position, name, score }) => (
          <div key={position} className="flex flex-col items-center space-y-2">
            {/* Círculo con posición */}
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-2xl font-bold text-white">
              {position}
            </div>

            {/* Nombre debajo del círculo */}
            <div className="text-white font-medium text-sm">
              {name}
            </div>

            {/* Burbuja de puntuación */}
            <div className="px-2 py-1 rounded-full bg-secondary text-white text-xs">
              {score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avatars;
