import React from 'react';
import { Link } from 'react-router-dom';

export const Avatars = ({
  entries,
  displayOrder = [2, 1, 3],
  showDecorations = true,
  scrollable = true,
  height = '250px',
  containerWidth = "w-[100%]"
}) => {
  const borderImages = {
    1: '/images/borders/border1.png',
    2: '/images/borders/border2.png',
    3: '/images/borders/border3.png',
  };

  const defaultEntries = [
    { id: 'default1', position: 2, name: 'Carolina', score: '3,456', avatar: "/favicon.ico" },
    { id: 'default2', position: 1, name: 'Sofi', score: '5,589', avatar: "/favicon.ico" },
    { id: 'default3', position: 3, name: 'Gen', score: '2,456', avatar: "/favicon.ico" },
  ];

  let list = entries ?? defaultEntries;

  if (
    displayOrder &&
    displayOrder.length > 0 &&
    list.every((entry) => entry.position !== undefined)
  ) {
    list = [...list].sort(
      (a, b) => displayOrder.indexOf(a.position) - displayOrder.indexOf(b.position)
    );
  }

  return (
    <div className={`${containerWidth} flex items-center justify-center p-1 mx-auto`}>
      <div
        className={`flex items-end gap-1 md:gap-4 ${scrollable ? 'overflow-x-auto whitespace-nowrap px-2' : 'justify-between'
          }`}
        style={{ height }}
      >
        {list.map(({ position, name, score, avatar, id }) => {
          const pos = position ?? 0;

          return (
            <div key={id || pos} className="flex flex-col items-center space-y-2">
              <div className={`relative ${showDecorations && pos === 1 ? 'w-32 md:w-44' : 'w-20 md:w-24'} aspect-square`}>

                {id ? (
                  <Link to={`/profile/${id}`} className="block w-full h-full rounded-full">
                    <img
                      src={avatar}
                      alt={`${name}'s avatar`}
                      className="rounded-full object-cover w-full h-full z-0"
                    />
                  </Link>
                ) : (
                  <img
                    src={avatar}
                    alt={`${name}'s avatar`}
                    className="rounded-full object-cover w-full h-full z-0"
                  />
                )}
                {showDecorations && borderImages[pos] && (
                  <img
                    src={borderImages[pos]}
                    alt={`Border for position ${pos}`}
                    className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
                  />
                )}
              </div>

              <div
                className={`text-white font-medium ${showDecorations && pos === 1 ? 'text-2xl' : 'text-md'
                  } whitespace-nowrap overflow-hidden text-ellipsis`}
                style={{ maxWidth: '4rem' }}
              >
                {name}
              </div>

              {score && (
                <div className="bg-primary rounded-full">
                  <div className="px-2 py-1 rounded-full text-white font-bold text-lg">{score}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Avatars;
