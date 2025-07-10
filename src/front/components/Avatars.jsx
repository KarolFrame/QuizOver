import React from 'react';

export const Avatars = ({ entries, displayOrder = [2, 1, 3] }) => {
  const defaultEntries = [
    { position: 2, name: 'Carolina', score: '3,456', avatar: "/faviocon.ico" },
    { position: 1, name: 'Sofi', score: '5,589', avatar: "/faviocon.ico" },
    { position: 3, name: 'Gen', score: '2,456', avatar: "/faviocon.ico" },
  ];

  const list = (entries ?? defaultEntries).sort((a, b) => {
    return displayOrder.indexOf(a.position) - displayOrder.indexOf(b.position);
  });

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-end" style={{ height: '200px' }}>
        {list.map(({ position, name, score, avatar }) => (
          <div key={position} className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-2xl font-bold text-color">
              {position}
              <img src={avatar} />
            </div>
            <div
              className="text-white font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ maxWidth: '4rem' }}
            >
              {name}
            </div>
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