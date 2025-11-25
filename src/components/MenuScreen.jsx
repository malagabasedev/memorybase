import { Heading } from "./Heading";
import { Button } from "./Button";
import { Tooltip } from "./Tooltip";
import { colorsData } from "../colorsData";
import { ColorCard } from "./ColorCard";

const menuColors = colorsData.filter(
  (color) => color.id === "c68" || color.id === "c54" || color.id === "c57"
);

export function MenuScreen({ onGameStart }) {
  const tooltipContent = (
    <>
      <div style={{ fill: "white", flexShrink: 0 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
        </svg>
      </div>
      <div>
        <Heading level={2} styles="menu_tooltip-title">
          How to play?
        </Heading>
        <p>
          The goal is to avoid clicking the same color twice. After you click
          one of the colors, they will be shuffled and you need to click on
          another color, but <b>it can't be one that has been clicked before</b>{" "}
          or the <b>game will be over.</b>
        </p>
        <p>
          In <b>expert mode</b> you will have to trust in your eyes more than
          ever for the colors will have no name this time!
        </p>
      </div>
    </>
  );

  return (
    <div className="menu-wrapper">
      <section className="menu">
        <div className="menu_content">


          <div className="menu_content-title">
            <Heading styles="main-title menu_title">
              Remember <br />
              <span className="text-stroke text-transparent">my</span> color
            </Heading>

            <div className="menu_help">
              <Tooltip content={tooltipContent}>
                <Button variant="secondary" styles="btn-circular">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" />
                  </svg>
                </Button>
              </Tooltip>
            </div>
          </div>

          <Heading level={2} styles="menu_subtitle">
            Memory Game
          </Heading>
          <div className="menu_game-modes">
            <Button variant="secondary" onClick={() => onGameStart("normal")}>
              PLAY
            </Button>
            <Button variant="secondary" onClick={() => onGameStart("expert")}>
              EXPERT MODE
            </Button>
          </div>
        </div>

        <div className="menu_deco-col">
          <ColorCard color={menuColors[0]} inlineStyles={{ "--order": 0 }} />
          <ColorCard color={menuColors[1]} inlineStyles={{ "--order": 1 }} />
          <ColorCard color={menuColors[2]} inlineStyles={{ "--order": 2 }} />
        </div>
      </section>
    </div>
  );
}
