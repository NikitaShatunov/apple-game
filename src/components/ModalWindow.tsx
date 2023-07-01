import * as React from "react";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import modalSound from "../assets/modal.mp3"
import {
  setApplesPickOwnGame,
  setIsGameClasssic,
  setOwnResidue,
  setResidue,
} from "../redux/slices/gameSlice";

const ModalWindow = () => {
  const refModal = React.useRef<HTMLDivElement>(null);
  const refSpider = React.useRef<HTMLImageElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [gameMode, setGameMode] = React.useState("classic");
  const [applesQuantity, setAppleQuantity] = React.useState(0);
  const [applesPick, setApplePick] = React.useState(0);
  const [isWarning, setIsWarning] = React.useState(false);
  const isGameClassic = useAppSelector((state) => state.game.isGameClassic);
  const soundOfModal = new Audio(modalSound)
  const dispatch = useAppDispatch();
  const onClickSpider = () => {
    soundOfModal.play()
    setIsModalOpen(!isModalOpen);
  };
  React.useEffect(() => {}, [gameMode]);
  React.useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      let path = event.composedPath().includes(refModal.current as Node);
      let path2 = event.composedPath().includes(refSpider.current as Node);
      if (!path && !path2) {
        if(isModalOpen) soundOfModal.play()
        setIsModalOpen(false);
        setGameMode(isGameClassic ? "classic" : "ownRules");
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [isModalOpen]);

  const onClickSave = () => {
    if (gameMode === "ownRules") {
      if (applesQuantity && applesPick) {
        if (2 * applesQuantity + 1 > applesPick && applesQuantity <= 15) {
          setIsWarning(false);
          dispatch(setOwnResidue(2 * applesQuantity + 1));
          dispatch(setResidue(2 * applesQuantity + 1))
          dispatch(setApplesPickOwnGame(applesPick));
          dispatch(setIsGameClasssic(false))
          setGameMode('ownRules')
          setIsModalOpen(false)
          soundOfModal.play()
        }
        else {
            setIsWarning(true)
            dispatch(setIsGameClasssic(true))
            setGameMode('classic')
        }
      }
      else {
        setIsWarning(true)
        dispatch(setIsGameClasssic(true))
        setGameMode('classic')
    }
    }
    else {
        soundOfModal.play()
        dispatch(setResidue(25))
        dispatch(setIsGameClasssic(true))
        dispatch(setApplesPickOwnGame(3))
        setIsModalOpen(false)
        setIsWarning(false);
    }

  };

  return (
    <>
      <div
        ref={refModal}
        className={`modalWindow ${
          isModalOpen ? "modalWindowOpen" : "modalWindowClose"
        }`}
      >
        <h2>Rules:</h2>
        <div className="rules">
          Two people are playing a game. From the pile of 25 apples, each player
          takes either 1, 2 or 3 apples on each turn. The game is over once all
          apples are taken. Whoever has the even amount of apples wins.
          <br />
          When you are ready to play, select the game mode and press start.
          After each pick, you will see the total amount of your apples.
        </div>
        <h2>Settings:</h2>
        <div className="settingsBlock">
          <input
            onChange={() => setGameMode("classic")}
            checked={gameMode === "classic"}
            type="radio"
            name="radio"
            id="classic"
          />
          <label htmlFor="classic">Classic (25 apples, 1 - 3 picks)</label>
          <br />
          <input
            onChange={() => setGameMode("ownRules")}
            checked={gameMode === "ownRules"}
            type="radio"
            name="radio"
            id="chose"
          />
          <label htmlFor="chose">Own rules</label>

          <input min={1}
            onChange={(e) => setAppleQuantity(+e.target.value)}
            className="inputNumber"
            type="number"
            name="n"
          />
          <label htmlFor="n">Apples (2*n + 1)</label>
          <input min={1}
            onChange={(e) => setApplePick(+e.target.value)}
            className="inputNumber"
            type="number"
            name="n"
          />
          <label htmlFor="m">1 to m aplles to pick</label>
          {isWarning && (
            <div style={{ color: "red" }}>
              Fill in all fields, the number of apples should be more than the
              maximum pick. (Max quantity of Apples is 15)
            </div>
          )}
        </div>
        <div className="rulesButtonContainer">
          <div onClick={() => onClickSave()} className="buttonSave">
            Save
          </div>
        </div>
      </div>
      <img
        onClick={() => onClickSpider()}
        ref={refSpider}
        className={`spiderCorner ${isModalOpen ? "spiderCornerDown" : ""}`}
        src="/img/spider.webp"
        alt="spider"
      />
    </>
  );
};

export default ModalWindow;
