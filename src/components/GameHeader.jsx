import { useEffect, useRef } from "react";

export function GameHeader({ bestScore, score, level }) {
  const scoreRef = useRef(null);

  useEffect(() => {
    let timer;
    if (score !== 0) {
      const node = scoreRef.current;
      node.classList.add("scale");
      setTimeout(() => node.classList.remove("scale"), 220);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [score]);

  return (
    <header className="game_header">
      <div>
        <span className="game_header-best">Best: {bestScore}</span>
      </div>

      <div className="game_header-middle">
        <h1 className="main-title game_header-title">
          Remember <br />
          <span className="text-stroke text-transparent">my</span> color
        </h1>
        <hr className="game_header-separator"></hr>
        <p>
          <span className="fw-700">Level:&nbsp;</span> {level}
        </p>
      </div>

      <div className="game_header-right">
        <span className="btn-primary d-inline-block game_score" ref={scoreRef}>
          Score: {score}
        </span>
      </div>
    </header>
  );
}
