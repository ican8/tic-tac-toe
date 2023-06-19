import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";

export type Position = ("X" | "O" | null)[];

function App() {
  const [position, setPosition] = useState<Position>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | null | undefined>(null);

  useEffect(() => {
    if (winner !== null) return;
    if (currentPlayer === "O") setTimeout(() => playRandomMove(position), 1000);
  }, [currentPlayer, position]);

  const handleOnclick = (index: number) => {
    if (position[index]) return;
    setPosition((prev) =>
      prev.map((item, idx) => (idx === index ? currentPlayer : item))
    );
    // console.log(
    //   "POS => ",
    //   position.map((item, idx) => (idx === index ? currentPlayer : item))
    // );
    // console.log(
    //   "Winner => ",
    //   checkResult(
    //     position.map((item, idx) => (idx === index ? currentPlayer : item))
    //   )
    // );
    setWinner(
      checkResult(
        position.map((item, idx) => (idx === index ? currentPlayer : item))
      )
    );
    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  const checkResult = (position: Position) => {
    // returns winning player
    // null if game is not over yet and undefined is game is drawn
    // console.log("Position => ");
    if (
      position[0] &&
      position[0] === position[1] &&
      position[0] === position[2]
    ) {
      return position[0];
    }
    if (
      position[3] &&
      position[3] === position[4] &&
      position[3] === position[5]
    ) {
      return position[3];
    }
    if (
      position[6] &&
      position[6] === position[7] &&
      position[6] === position[8]
    ) {
      return position[6];
    }
    if (
      position[0] &&
      position[0] === position[3] &&
      position[0] === position[6]
    ) {
      return position[0];
    }
    if (
      position[1] &&
      position[1] === position[4] &&
      position[1] === position[7]
    ) {
      return position[1];
    }
    if (
      position[2] &&
      position[2] === position[5] &&
      position[2] === position[8]
    ) {
      return position[2];
    }
    if (
      position[0] &&
      position[0] === position[4] &&
      position[0] === position[8]
    ) {
      return position[0];
    }
    if (
      position[2] &&
      position[2] === position[4] &&
      position[2] === position[6]
    ) {
      return position[2];
    }
    return position.includes(null) ? null : undefined;
  };

  const getChildrenPositions = (
    currentPostion: Position,
    nextPlayer: "X" | "O"
  ) => {
    const possiblePositions = [];
    for (let i = 0; i < currentPostion.length; i++) {
      if (!currentPostion[i]) {
        possiblePositions.push(
          currentPostion.map((item, index) => (index === i ? nextPlayer : item))
        );
      }
    }
    return possiblePositions;
  };

  const minimax = (params: {
    position: Position;
    depth: number;
    isMaximizingPlayer: boolean;
  }): number => {
    const { position, depth, isMaximizingPlayer } = params;
    const staticResult = checkResult(position);
    if (staticResult !== null) {
      return !staticResult ? 0 : staticResult === "X" ? 10 : -10;
    }
    const children: Position[] = getChildrenPositions(
      position,
      isMaximizingPlayer ? "X" : "O"
    );
    let maxEval = Number.NEGATIVE_INFINITY;
    let minEval = Number.POSITIVE_INFINITY;

    if (isMaximizingPlayer) {
      for (const child of children) {
        const score = minimax({
          position: child,
          depth: depth + 1,
          isMaximizingPlayer: false,
        });
        if (maxEval < score) {
          maxEval = score;
        }
      }
    } else {
      for (const child of children) {
        const score = minimax({
          position: child,
          depth: depth + 1,
          isMaximizingPlayer: true,
        });
        if (minEval > score) {
          minEval = score;
        }
      }
    }
    return isMaximizingPlayer ? maxEval : minEval;
  };

  const playRandomMove = (position: Position) => {
    let minScore = Number.POSITIVE_INFINITY;
    let nextPosition = position;
    for (let i = 0; i < position.length; i++) {
      if (position[i] === null) {
        position[i] = "O";
        const score = minimax({
          position,
          depth: 0,
          isMaximizingPlayer: true,
        });
        if (score < minScore) {
          minScore = score;
          nextPosition = [...position];
        }
        position[i] = null;
      }
    }
    setPosition(nextPosition);
    setWinner(checkResult(nextPosition));
    setCurrentPlayer("X");
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <Board
        position={position}
        onClick={!winner && currentPlayer === "X" ? handleOnclick : () => {}}
      />
      <h2>
        {winner === null
          ? `Current Player ${currentPlayer}`
          : winner
          ? `Player ${winner} Wins!`
          : "Game Drawn"!}
      </h2>
    </>
  );
}

export default App;
