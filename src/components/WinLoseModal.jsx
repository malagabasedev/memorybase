import { Button } from "./Button";
import { Modal } from "./Modal";
import { Heading } from "./Heading";
import sadFace from "../assets/images/disappointed-face.png";
import grinningFace from "../assets/images/grinning-face-with-smiling-eyes.png";

const loseData = {
  img: {
    url: sadFace,
    alt: "Sad face",
  },
  title: (
    <>
      You have <span className="title-underline">LOST!</span>
    </>
  ),
  desc: (
    <>
      Unfortunately,{" "}
      <b>you have clicked on a color that you've already selected before.</b>
      <br></br>
      Don't be discouraged! Use this experience to sharpen your memory skills
      and try again. With practice, you'll improve your ability to remember the
      shuffled colors and their positions. Good luck, and enjoy the game!
    </>
  ),
};

const winData = {
  img: {
    url: grinningFace,
    alt: "Grinning face",
  },
  title: (
    <>
      CONGRATS, the victory is <span className="title-underline">YOURS!</span>
    </>
  ),
  desc: (
    <>
      Thanks for playing my memory card game made with React and don't forget to
      visit me on{" "}
      <a href="https://github.com/DarkWool" target="_blank">
        Github. ♥
      </a>
    </>
  ),
};

export function WinLoseModal({
  variant,
  isVisible,
  onResetGame,
  onBackToMenu,
}) {
  const data = variant === "lose" ? loseData : winData;
  const { img, title, desc } = data;

  return (
    <Modal isVisible={isVisible} styles="game-modal">
      <div>
        <img src={img.url} alt={img.alt} className="game_modal-face" />
      </div>
      <div>
        <Heading level={2} styles="game_modal-title">
          {title}
        </Heading>
        <p>{desc}</p>

        <div className="game_modal-btns-container">
          <Button
            variant="accent"
            styles="text-transform-upper"
            onClick={onResetGame}
          >
            Play again
          </Button>
          <Button variant="secondary" onClick={onBackToMenu}>
            GO BACK TO MENU
          </Button>
        </div>
      </div>
    </Modal>
  );
}
