export function bestMove(applesLeft, maxApple) {
  let bestScore = -Infinity;
  let bestMove;
  if (applesLeft === 0) {
    return 0; 
  }
  for (let i = 1; i <= maxApple; i++) {
    if (applesLeft >= i) {
      const score = minimax(applesLeft - i, 0, false, maxApple);
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  } 
  return bestMove;
}

function minimax(apples, depth, isMaximizing, maxApple) {
  if (apples === 0) {
    return depth % 2 === 0 ? 0 : 1; 
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 1; i <= maxApple; i++) {
      if (apples >= i) {
        const score = minimax(apples - i, depth + 1, false, maxApple);
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 1; i <= maxApple; i++) {
      if (apples >= i) {
        const score = minimax(apples - i, depth + 1, true, maxApple);
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}
