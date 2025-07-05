export const initialStore = () => {
  return {
    message: null,
    currentGame: {
      correctAnswers: 0,
      lastAnswerCorrect: false,
      rowCorrectAnswers: 0,
      points: 0,
      hearts:3
    },
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

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
            ? store.currentGame.points + 10 + store.currentGame.rowCorrectAnswers
            : store.currentGame.points,
          hearts: isCorrect
            ? store.currentGame.hearts
            : store.currentGame.hearts -1,
        },
      };

    default:
      throw Error("Unknown action.");
  }
}
