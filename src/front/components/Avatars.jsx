
import React from 'react';

export const Avatars = ({ entries, displayOrder = [2, 1, 3] }) => {

  const borderImages = {
    1: '/images/borders/border1.png',
    2: '/images/borders/border2.png',
    3: '/images/borders/border3.png',
  };
  const defaultEntries = [
    { position: 2, name: 'Carolina', score: '3,456', avatar: "/favicon.ico" },
    { position: 1, name: 'Sofi', score: '5,589', avatar: "/favicon.ico" },
    { position: 3, name: 'Gen', score: '2,456', avatar: "/favicon.ico" },
  ];

  const list = (entries ?? defaultEntries).sort((a, b) => {
    return displayOrder.indexOf(a.position) - displayOrder.indexOf(b.position);
  });

  return (
    <div className="w-full max-w-md mx-auto mt-2 mb-8">
      <div className="flex justify-between items-end" style={{ height: '250px' }}>
        {list.map(({ position, name, score, avatar }) => (
          <div key={position} className="flex flex-col items-center space-y-2">
            <div className={`relative ${position === 1 ? 'w-45 h-45' : 'w-24 h-24'}`}>
              <img
                src={avatar}
                className={`rounded-full object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
                 ${position === 1 ? 'w-24 h-24' : 'w-20 h-20'}`}
              />
              <img
                src={borderImages[position]}
                alt={`Border for position ${position}`}
                className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
              />
            </div>
            <div
              className={`text-white font-medium ${position === 1 ? 'text-2xl' : 'text-md'} "whitespace-nowrap overflow-hidden text-ellipsis"`}
              style={{ maxWidth: '4rem' }}
            >
              {name}
            </div>
            <div className='bg-primary rounded-full'>
              <div className="px-2 py-1 rounded-full text-white font-bold text-lg">
                {score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avatars;
