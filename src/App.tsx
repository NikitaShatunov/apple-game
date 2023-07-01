import * as React from "react";
import "./App.scss";
import GamerBasket from "./components/GamerBasket";
import { useAppDispatch, useAppSelector } from "./redux/redux";
import {
  clearGamerState,
  setOpponentPick,
  setPlayerPick,
  setResidue,
} from "./redux/slices/gameSlice";
import { bestMove } from "./utils/alphaBetaAi";
import SwitchModeBtn from "./components/SwitchModeBtn";

function App() {
  const [isWin, setIsWin] = React.useState(false);
  const [isGameEnded, setIsGameEnded] = React.useState(false);
  const mode = useAppSelector((state) => state.game.isPlayerrFirst);
  const isGameStart = useAppSelector((state) => state.game.isGameStart);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const playerPick = useAppSelector((state) => state.game.playerCurrentPick);
  const residue = useAppSelector((state) => state.game.residue);
  const refModal = React.useRef<HTMLDivElement>(null);
  const refSpider = React.useRef<HTMLImageElement>(null);
  const opponentPick = useAppSelector(
    (state) => state.game.opponentCurrentPick
  );
  const playerAmount = useAppSelector((state) => state.game.playerAmount);
  const opponentAmount = useAppSelector((state) => state.game.opponentAmount);

  React.useEffect(() => {
    if (residue === 0) {
      if (isGameStart) {
        if (playerAmount % 2 === 0) setIsWin(true);
        else setIsWin(false);
        setIsGameEnded(true);
      }
    }
  }, [residue, isGameEnded, opponentAmount, playerAmount]);
  React.useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      let path = event.composedPath().includes(refModal.current as Node && refSpider.current as Node);
      if (!path) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  },[isModalOpen])
  React.useEffect(() => {
    if (!mode && isGameStart) {
      if (residue > 1) {
        const aiMove = bestMove(residue);
        dispatch(setOpponentPick(aiMove));
      }
    }
  }, [isGameStart, mode]);
  const onClickRestart = () => {
    dispatch(setResidue(25));
    dispatch(clearGamerState());
    setIsGameEnded(false);
  };
  const onClickApplePick = (n: number) => {
    dispatch(setPlayerPick(n));
    if (residue > 1) {
      const aiMove = bestMove(residue - n);
      dispatch(setOpponentPick(aiMove));
    }
  };
  const onClickSpider = () => {
    setIsModalOpen(!isModalOpen);
  };
  React.useEffect(() => {}, [playerPick, opponentPick]);
  return (
    <div className="gameArea">
      <div ref={refModal}
        className={`modalWindow ${
          isModalOpen ? "modalWindowOpen" : "modalWindowClose"
        }`}
      >
        <h2>Rules:</h2>
        <div className="rules">
          Two people are playing a game. From the pile of 25 apples, each
          player takes either 1, 2 or 3 apples on each turn. The game is over
          once all apples are taken. Whoever has the even amount of apples
          wins.
          <br />
          When you are ready to play, select the game mode and press start. After each pick, you will see the total amount of your apples.
        </div>
      </div>
      <img
        onClick={() => onClickSpider()} ref={refSpider}
        className={`spiderCorner ${isModalOpen ? "spiderCornerDown" : ""}`}
        src="/img/spider.webp"
        alt="spider"
      />
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
                  id={id + "id"}
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
                {" "}
                {residue >= 3 ? (
                  <>
                    {" "}
                    <div onClick={() => onClickApplePick(1)}>🍎</div>
                    <div onClick={() => onClickApplePick(2)}>🍎🍎</div>
                    <div onClick={() => onClickApplePick(3)}>🍎🍎🍎</div>
                  </>
                ) : residue >= 2 ? (
                  <>
                    {" "}
                    <div onClick={() => onClickApplePick(1)}>🍎</div>
                    <div onClick={() => onClickApplePick(2)}>🍎🍎</div>
                    <div
                      className="disabledbutton"
                      onClick={() => onClickApplePick(3)}
                    >
                      🍎🍎🍎
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div onClick={() => onClickApplePick(1)}>🍎</div>
                    <div
                      className="disabledbutton"
                      onClick={() => onClickApplePick(2)}
                    >
                      🍎🍎
                    </div>
                    <div
                      className="disabledbutton"
                      onClick={() => onClickApplePick(3)}
                    >
                      🍎🍎🍎
                    </div>{" "}
                  </>
                )}
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
