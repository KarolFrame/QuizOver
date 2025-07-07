export const initialStore = () => {
  return {
    message: null,
    auth: {
      isAuthenticated: false,
      userEmail: null,
    },

    user: {
      id: null,
      email: '',
      is_active: true,
      experience_points: 0,
      friends: [],
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
    }
  }
};

export default function storeReducer(store, action, state = {}) {
  if (!state) throw new Error("Reducer missing state argument");

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
      case "AUTH_LOGIN_SUCCESS":
        return {
          ...state,
          auth: {
            isAuthenticated: true,
            userEmail: action.payload.email
          }
			};

		case "AUTH_LOGOUT":
			return {
				...state,
				auth: {
					isAuthenticated: false,
					userEmail: null
				}
			};
 

    default:
      throw Error("Unknown action.");
  }
};
