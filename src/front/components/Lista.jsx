import React from 'react';

/**
 * Lista
 *
 * Muestra la lista de jugadores en posiciones 4 en adelante.
 * entries: array de { position, name, score }
 */
export const Lista = ({ entries }) => {
  const defaultEntries = [
    { position: 4, name: 'Player4', score: 1000 },
    { position: 5, name: 'Player5', score: 900 },
    { position: 6, name: 'Player6', score: 800 },
    { position: 7, name: 'Player7', score: 700 },
  ];
  const list = entries ?? defaultEntries;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <ul className="space-y-2">
        {list.map(({ position, name, score }) => (
          <li
            key={position}
            className="flex items-center justify-between bg-bg-light p-2 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-white">
                {position}
              </div>
              <span className="text-white font-medium text-sm">{name}</span>
            </div>
            <span className="text-white font-bold text-sm">
              {score.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lista;
