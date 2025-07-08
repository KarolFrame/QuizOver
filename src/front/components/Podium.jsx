import React, { useEffect, useState } from 'react';
import './Podium.scss';

export const Podium = ({ data }) => {
  const target = data ?? [75, 100, 50];
  const [h, setH] = useState([0, 0, 0]);

  useEffect(() => {
    setTimeout(() => setH(target), 100);
  }, [target]);

  return (
    <div className="podium w-full max-w-md mx-auto mb-8">
      <div className="bar second" style={{ height: `${h[1]}%` }} />
      <div className="bar first" style={{ height: `${h[0]}%` }} />
      <div className="bar third" style={{ height: `${h[2]}%` }} />
    </div>
  );
};
export default Podium;
