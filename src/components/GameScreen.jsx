import { useState, useMemo } from "react";
import { CardsList } from "./CardsList";
import { colorsData } from "../colorsData";
import { GameHeader } from "./GameHeader";
import { WinLoseModal } from "./WinLoseModal";
import { shuffle } from "../utils/shuffle";

const scorePerLevel = [5, 12, 22, 34, 49];
const GAMEOVER = "lose";
const GAMEWON = "win";

export function GameScreen({ gameMode, onBackToMenu }) {
  const [gameStatus, setGameStatus] = useState(null);
  const [level, setLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedColors, setClickedColors] = useState([]);

  const checkForGameOver = (id) => clickedColors.includes(id);

  const checkForWin = () => {
    const totalLevels = scorePerLevel.length;
    if (level < totalLevels) return;

    const nextScore = score + 1;
    return nextScore === scorePerLevel.at(-1) && level === totalLevels;
  };

  const assessTurnOutcome = (id) => {
    if (checkForGameOver(id)) return GAMEOVER;
    else if (checkForWin()) return GAMEWON;
  };

  function handleCardClick(id, turnResult) {
    if (gameStatus != null) return;

    if (turnResult === GAMEOVER) return handleGameOver();
    else if (turnResult === GAMEWON) return handleGameWin();

    setScore((s) => s + 1);
    updateLevel(id);
  }

  function updateLevel(id) {
    const nextScore = score + 1;
    const scoreNeeded = scorePerLevel[level - 1];
    if (nextScore === scoreNeeded) {
      // Start the next level by resetting the clicked colors
      setClickedColors([]);
      setLevel((l) => l + 1);
      return true;
    } else {
      // If level is not updated add the color id to clickedColors
      setClickedColors([...clickedColors, id]);
    }
  }

  function handleResetGame() {
    setGameStatus(null);
    setLevel(1);
    setScore(0);
    setClickedColors([]);
  }

  function handleGameOver() {
    if (score > bestScore) setBestScore(score);
    setGameStatus(GAMEOVER);
  }

  function handleGameWin() {
    const updatedScore = score + 1;
    setScore(updatedScore);
    setBestScore(updatedScore);
    setGameStatus(GAMEWON);
  }

  // Get a random array from data for the current level
  const levelColors = useMemo(() => {
    const index = level - 1;
    const numberOfCards =
      index === 0
        ? scorePerLevel[0]
        : scorePerLevel[index] - scorePerLevel[index - 1];

    return shuffle(colorsData).slice(0, numberOfCards);
  }, [level, gameStatus]);

  // Re-shuffle the level colors / cards so they are on different position each time
  const shuffledColors = useMemo(() => {
    return shuffle(levelColors);
  }, [score]);

  return (
    <>
      <GameHeader bestScore={bestScore} score={score} level={level} />
      <CardsList
        key={gameStatus}
        score={score}
        cards={shuffledColors}
        cardsVariant={gameMode}
        onCardClick={handleCardClick}
        assessTurnOutcome={assessTurnOutcome}
      />

      <WinLoseModal
        variant={gameStatus}
        isVisible={gameStatus}
        onResetGame={handleResetGame}
        onBackToMenu={onBackToMenu}
      />
    </>
  );
}
