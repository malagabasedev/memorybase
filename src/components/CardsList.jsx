import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { ColorCard } from "./ColorCard";

let canClickCards = true;

export function CardsList({
  score,
  cards,
  cardsVariant,
  onCardClick,
  assessTurnOutcome,
}) {
  const [cardsRevealed, setCardsRevealed] = useState(false);
  let timer = useRef(null);

  useEffect(() => {
    if (!cardsRevealed) {
      timer = setTimeout(() => {
        setCardsRevealed(true);
      }, 400);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [score]);

  return (
    <>
      <section className="game_cards-board">
        {cards.map((color) => {
          return (
            <CSSTransition
              key={color.id}
              in={cardsRevealed}
              timeout={500}
              classNames="color-card"
            >
              <ColorCard
                color={color}
                variant={cardsVariant}
                onClick={() => {
                  if (!canClickCards) return;
                  canClickCards = false;

                  const turnResult = assessTurnOutcome(color.id);
                  if (turnResult) {
                    // The game should immediately end if it has been won or lost
                    onCardClick(color.id, turnResult);
                    canClickCards = true;
                    return;
                  }

                  // Apply the "unmount" transition
                  setCardsRevealed(false);
                  setTimeout(() => {
                    // Invoke onCardClick after the transition is finished
                    onCardClick(color.id, turnResult);
                    canClickCards = true;
                  }, 400);
                }}
              />
            </CSSTransition>
          );
        })}
      </section>
    </>
  );
}
