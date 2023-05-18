const WINNER_COMB = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function minimax(
  state: Map<number, "X" | "O">,
  depth: number,
  player: "X" | "O"
): { move: number; score: number } {
  let best =
    player === "X"
      ? { move: -1, score: -Infinity }
      : { move: -1, score: Infinity };

  if (depth === 0 || isWinner(state, "X") || isWinner(state, "O")) {
    const evaluationScore = isWinner(state, "X")
      ? 1
      : isWinner(state, "O")
      ? -1
      : 0;
    return { move: -1, score: evaluationScore };
  }

  for (let i = 0; i < 9; i++) {
    if (!state.has(i)) {
      state.set(i, player);
      const currentScore = minimax(
        state,
        depth - 1,
        player === "X" ? "O" : "X"
      );
      state.delete(i);
      currentScore.move = i;

      if (player === "X") {
        if (currentScore.score > best.score) best = currentScore;
      } else if (currentScore.score < best.score) best = currentScore;
    }
  }
  return best;
}

function isWinner(state: Map<number, "X" | "O">, player: "X" | "O") {
  return WINNER_COMB.find((comb) =>
    comb.every((cell) => state.get(cell) === player)
  );
}
