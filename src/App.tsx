import * as React from "react";
import "./App.scss";
import GamerBasket from "./components/GamerBasket";
import { useAppDispatch, useAppSelector } from "./redux/redux";
import itemPick from "./assets/itemPick.mp3";
import win from "./assets/win.mp3";
import lose from "./assets/fail.mp3";
import click from "./assets/click.mp3";

import {
  clearGamerState,
  setOpponentPick,
  setPlayerPick,
  setResidue,
} from "./redux/slices/gameSlice";
import { bestMove } from "./utils/minimax";
import SwitchModeBtn from "./components/SwitchModeBtn";
import ModalWindow from "./components/ModalWindow";

export const buttonClickSound = new Audio(click);

function App() {
  const [isWin, setIsWin] = React.useState(false);
  const [isGameEnded, setIsGameEnded] = React.useState(false);
  const mode = useAppSelector((state) => state.game.isPlayerrFirst);
  const isGameStart = useAppSelector((state) => state.game.isGameStart);
  const dispatch = useAppDispatch();
  const applesPickMax = useAppSelector((state) => state.game.applesPick);
  const playerPick = useAppSelector((state) => state.game.playerCurrentPick);
  const residue = useAppSelector((state) => state.game.residue);
  const isGameClassic = useAppSelector((state) => state.game.isGameClassic);
  const ownResidue = useAppSelector((state) => state.game.ownResidue);
  const opponentPick = useAppSelector(
    (state) => state.game.opponentCurrentPick
  );
  const playerAmount = useAppSelector((state) => state.game.playerAmount);
  const opponentAmount = useAppSelector((state) => state.game.opponentAmount);

  const soundOfPick = new Audio(itemPick);
  const soundWin = new Audio(win);
  const soundLose = new Audio(lose);

  React.useEffect(() => {
    // who is a winner when residue is 0
    if (residue === 0) {
      if (isGameStart) {
        if (playerAmount % 2 === 0) {
          setIsWin(true);
          soundWin.play();
        } else {
          setIsWin(false);
          soundLose.play();
        }
        setIsGameEnded(true);
      }
    }
  }, [residue, isGameEnded, opponentAmount, playerAmount]);

  React.useEffect(() => {
    //if ai picks first
    if (!mode && isGameStart) {
      if (residue > 1) {
        const aiMove = bestMove(residue, applesPickMax);
        dispatch(setOpponentPick(aiMove));
      }
    }
  }, [isGameStart, mode, isGameClassic]);
  const onClickRestart = () => {
    buttonClickSound.play();
    if (isGameClassic) {
      dispatch(setResidue(25));
    } else {
      dispatch(setResidue(ownResidue));
    }

    dispatch(clearGamerState());
    setIsGameEnded(false);
  };
  const onClickApplePick = (n: number) => {
    //if player picks first
    soundOfPick.play();
    dispatch(setPlayerPick(n));
    if (residue > 1) {
      const aiMove = bestMove(residue - n, applesPickMax);
      dispatch(setOpponentPick(aiMove));
    }
  };

  React.useEffect(() => {}, [playerPick, opponentPick]);
  return (
    <div className="gameArea">
      <ModalWindow />
      {isGameEnded && isWin && (
        <div className="blackBg">
          <div className="gameEnd">
            <div>
              You are a winner!
              <br />
              <div className="containerButton">
                <button onClick={() => onClickRestart()}>Restart</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isGameEnded && !isWin && (
        <div className="blackBg">
          <div className="gameEnd">
            <div>
              Ai is a winner :(
              <br />
              <div className="containerButton">
                <button onClick={() => onClickRestart()}>Restart</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <img className="webCorner" src="/img/web.png" alt="web" />
      <div className="table__wrapper">
        <div className="table__container">
          <div>
            <SwitchModeBtn />
            <h1>{residue} apples left</h1>
            <div className="table__container__quantityOfApple">
              {new Array(residue).fill(0).map((_, id) => (
                <div
                  id={String(id)}
                  className="table__container__quantityOfApple__apple"
                >
                  🍎
                </div>
              ))}
            </div>
          </div>
          <div className="playerArea">
            <GamerBasket gamerAmount={playerAmount} gamer={"Your basket"} />
          </div>

          <div className="buttonNext">
            {isGameStart && (
              <>
                {new Array(applesPickMax).fill(1).map((_, i) => (
                  <div
                  id={String(i)}
                    className={`${residue < i + 1 ? "disabledbutton" : ""}`}
                    onClick={() => onClickApplePick(i + 1)}
                  >
                    🍎 {i + 1}
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="opponentArea">
            <GamerBasket
              gamerAmount={opponentAmount}
              gamer="Opponent's basket"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
