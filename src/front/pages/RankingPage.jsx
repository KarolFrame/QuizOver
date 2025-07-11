import React, { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import Avatars from '../components/Avatars';
import Podium from '../components/Podium';
import Lista from '../components/Lista';
import { getGlobalRanking } from '../services/rankingService';

export const RankingPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const { data: ranking, loading, error } = store.ranking.global;

  useEffect(() => {
    const fetchRanking = async () => {
      dispatch({ type: 'FETCH_GLOBAL_RANKING_START' });

      try {
        const data = await getGlobalRanking();
        dispatch({ type: 'FETCH_GLOBAL_RANKING_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_GLOBAL_RANKING_FAILURE', payload: error.message });
      }
    };

    fetchRanking();
  }, [dispatch]);


  if (loading) return <div className="text-white">Loading ranking...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!ranking || ranking.length === 0) return <div className="text-gray-400">No ranking data available.</div>;

  const maxPoints = ranking[0]?.experience_points || 1;

  const podiumEntries = ranking.slice(0, 3).map((user, index) => ({
    position: index + 1,
    id: user.id,
    name: user.user_info.userName,
    score: user.experience_points,
    heightPercentage: Math.round((1 - index * 0.33) * 110),
    avatar: user.user_info.avatar,
  }));


  const listRest = ranking.slice(3).map((user, index) => ({
    position: index + 4,
    id: user.id,
    name: user.user_info?.userName,
    score: user.experience_points,
    avatar: user.user_info?.avatar,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-4">
      <header className="w-full max-w-md text-center mb-6">
        <h1 className="text-white font-semibold text-4xl mb-2">Global Ranking</h1>
      </header>
      <div>
        <Avatars entries={podiumEntries} />
        <Podium data={podiumEntries.map(entry => entry.heightPercentage)} />
        <Lista entries={listRest} />
      </div>
    </div>
  );
};
