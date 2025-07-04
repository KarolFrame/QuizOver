// src/front/pages/RankingPage.jsx

import React from 'react';
import Avatars from '../components/Avatars';
import Podium from '../components/Podium';
import Lista from '../components/Lista';

export const RankingPage = () => {
  // Datos fijos de ejemplo para el top 3
  const podiumEntries = [
    { position: 2, name: 'Carolina', score: 3456, heightPct: 75 },
    { position: 1, name: 'Sofi',    score: 5676, heightPct: 100 },
    { position: 3, name: 'Gen',     score: 2456, heightPct: 50 },
  ];

  // Datos fijos de ejemplo para el resto
  const listRest = [
    { position: 4, name: 'Player4', score: 1000 },
    { position: 5, name: 'Player5', score: 900 },
    { position: 6, name: 'Player6', score: 800 },
    { position: 7, name: 'Player7', score: 700 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-4">
      {/* Título */}
      <header className="w-full max-w-md text-center mb-6">
        <h1 className="text-white text-xl font-semibold">Final Score</h1>
      </header>

      {/* Avatars */}
      <Avatars entries={podiumEntries} />

      {/* Podio */}
      <Podium data={podiumEntries.map(e => e.heightPct)} />

      {/* Lista del resto */}
      <Lista entries={listRest} />
    </div>
  );
};

export default RankingPage;
