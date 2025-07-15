const normalizeFriends = (friendsArray) => {
  const result = {};
  (friendsArray || []).forEach(friend => {
    result[friend.id] = {
      ...friend,
      score: friend.score ?? 0,
    };
  });
  return result;
};

export const initialStore = () => {
  return {
    message: null,

    auth: {
      isAuthenticated: false,
      email: null,
    },

    profile: {
      id: null,
      experience_points: 0,
      xpForNextLevel: 1000,
      level: 1,
      friends: [], 
      user_info: null,
    },

    currentGame: {
      correctAnswers: 0,
      lastAnswerCorrect: { value: false, timestamp: null },
      rowCorrectAnswers: 0,
      points: 0,
      hearts: 3,
    },

    ranking: {
      global: {
        data: [],
        loading: false,
        error: null,
      },
    },
  };
};

export const storeReducer = (store, action) => {
  switch (action.type) {
    case "SET_ANSWER_RESULT": {
      const isCorrect = action.payload.isCorrect;
      return {
        ...store,
        currentGame: {
          ...store.currentGame,
          correctAnswers: isCorrect
            ? store.currentGame.correctAnswers + 1
            : store.currentGame.correctAnswers,
          lastAnswerCorrect: {
            value: isCorrect,
            timestamp: Date.now(),
          },
          rowCorrectAnswers: isCorrect
            ? store.currentGame.rowCorrectAnswers + 1
            : 0,
          points: isCorrect
            ? store.currentGame.points + 10 + store.currentGame.rowCorrectAnswers
            : store.currentGame.points,
          hearts: isCorrect
            ? store.currentGame.hearts
            : store.currentGame.hearts - 1,
        },
      };
    }

    case "SET_DEFAULT_STATS":
      return {
        ...store,
        currentGame: {
          correctAnswers: 0,
          lastAnswerCorrect: { value: false, timestamp: null },
          rowCorrectAnswers: 0,
          points: 0,
          hearts: 3,
        },
      };

    case "FETCH_GLOBAL_RANKING_START":
      return {
        ...store,
        ranking: {
          ...store.ranking,
          global: {
            ...store.ranking.global,
            loading: true,
            error: null,
          },
        },
      };

    case "FETCH_GLOBAL_RANKING_SUCCESS":
      return {
        ...store,
        ranking: {
          ...store.ranking,
          global: {
            ...store.ranking.global,
            data: action.payload,
            loading: false,
            error: null,
          },
        },
      };

    case "FETCH_GLOBAL_RANKING_FAILURE":
      return {
        ...store,
        ranking: {
          ...store.ranking,
          global: {
            ...store.ranking.global,
            loading: false,
            error: action.payload,
          },
        },
      };

    // case "SET_FRIENDS":
    //   return {
    //     ...store,
    //     profile: {
    //       ...store.profile,
    //       friends: normalizeFriends(action.payload)
    //     }
    //   }

    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...store,
        auth: {
          isAuthenticated: true,
          email: action.payload.email,
        },
        profile: {
          id: action.payload.user_id,
          experience_points: action.payload.experience_points || 0,
          user_info: action.payload.user_info,
          friends: action.payload.friends,
        },
        message: null,
      };

    case "LOAD_AUTH_FROM_LOCALSTORAGE":
      return {
        ...store,
        auth: {
          isAuthenticated: true,
          email: action.payload.email,
        },
        profile: {
          id: action.payload.user_id,
          experience_points: action.payload.experience_points || 0,
          user_info: action.payload.user_info,
          friends: normalizeFriends(action.payload.friends),
        },
      };

    case "AUTH_LOGOUT":
      return {
        ...initialStore(),
        message: "Sesión cerrada correctamente.",
      };

    case "UPDATE_USER_INFO":
      return {
        ...store,
        profile: {
          ...store.profile,
          user_info: {
            ...store.profile.user_info,
            ...action.payload,
          },
        },
      };

    case "SET_FRIENDS":
      return {
        ...store,
        profile: {
          ...store.profile,
          friends: normalizeFriends(action.payload),
        },
      };

    case "ADD_FRIEND":
      return {
        ...store,
        profile: {
          ...store.profile,
          friends: {
            ...store.profile.friends,
            [action.payload.id]: {
              ...(action.payload ?? {}),
              score: action.payload?.score ?? 0,
            },
          },
        },
      };

    default:
      console.warn(`Acción desconocida: ${action.type}`);
      return store;
  }
};
