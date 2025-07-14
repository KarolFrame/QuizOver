export const initialStore = () => {
  return {
    message: null,
    auth: {
      isAuthenticated: false,
      userEmail: null,
      token: null,
    },

    user: {
      id: null,
      email: "",
      is_active: true,
      experience_points: 0,
      friends: [],
      user_info: null,
    },
    currentGame: {
      correctAnswers: 0,
      lastAnswerCorrect: false,
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
    case "SET_ANSWER_RESULT":
      const isCorrect = action.payload.isCorrect;
      return {
        ...store,
        currentGame: {
          ...store.currentGame,
          correctAnswers: isCorrect
            ? store.currentGame.correctAnswers + 1
            : store.currentGame.correctAnswers,
          lastAnswerCorrect: isCorrect,
          rowCorrectAnswers: isCorrect
            ? store.currentGame.rowCorrectAnswers + 1
            : 0,
          points: isCorrect
            ? store.currentGame.points +
              10 +
              store.currentGame.rowCorrectAnswers
            : store.currentGame.points,
          hearts: isCorrect
            ? store.currentGame.hearts
            : store.currentGame.hearts - 1,
        },
      };
    case "SET_DEFAULT_STATS":
      return {
        ...store,
        currentGame: {
          correctAnswers: 0,
          lastAnswerCorrect: false,
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

    case "REGISTER_SUCCESS":
      return {
        ...store,
        auth: {
          isAuthenticated: true,
          userEmail: action.payload.email,
          token: action.payload.token,
        },
        user: {
          ...store.user,
          id: action.payload.user_id,
          email: action.payload.email,
          user_info: action.payload.user_info,
        },
      };
  
    case "LOGIN_SUCCESS":
      return {
        ...store,
        auth: {
          isAuthenticated: true,
          userEmail: action.payload.email,
          token: action.payload.token,
        },
        user: {
          ...store.user,
          id: action.payload.user_id,
          email: action.payload.email,
          user_info: action.payload.user_info,
          experience_points: action.payload.experience_points || 0,
          friends: action.payload.friends || [],
        },
        message: null,
      };

    case "LOAD_AUTH_FROM_LOCALSTORAGE":
      return {
        ...store,
        auth: {
          isAuthenticated: true,
          token: action.payload.token,
          userEmail: action.payload.email,
        },
        user: {
          ...store.user,
          email: action.payload.email,
          user_info: action.payload.user_info,
          id: action.payload.user_id,
          experience_points: action.payload.experience_points || 0,
          friends: action.payload.friends || [],
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
        user: {
          ...store.user,
          user_info: action.payload,
        },
      };

    case "SET_FRIENDS":
      return {
        ...store,
        user: {
          ...store.user,
          friends: action.payload,
        },
      };

    case "ADD_FRIEND":
      return {
        ...store,
        user: {
          ...store.user,
          friends: [...store.user.friends, {
            ...action.payload,
            score: action.payload.score??0,
          }],
        },
      };
 
    

    default:
      console.warn(`Acción desconocida: ${action.type}`);
      return store;
  }
};
