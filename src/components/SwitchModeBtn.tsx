import * as React from "react";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { setIsGameStart, setMode } from "../redux/slices/gameSlice";
import music from "../assets/music.mp3"
import { buttonClickSound } from "../App";
const musicGame = new Audio(music);
const SwitchModeBtn = () => {
  const mode = useAppSelector((state) => state.game.isPlayerrFirst);
  const isGameStart = useAppSelector((state) => state.game.isGameStart);
  const [isSoundOn, seIsSoundOn] = React.useState(true)
  const dispatch = useAppDispatch();
  React.useEffect(() => {}, [mode, isGameStart]);
  React.useEffect(() => {
    const handleMusicEnd = () => {
      musicGame.currentTime = 0;
      musicGame.play(); 
    };
  
    musicGame.addEventListener("ended", handleMusicEnd);
  
    return () => {
      musicGame.removeEventListener("ended", handleMusicEnd);
    };
  }, []);
  const onClickSound = () => {
    seIsSoundOn(!isSoundOn)
    if(isSoundOn) {
      musicGame.volume = 0
    }
    else {
      musicGame.volume = 1
    }
  }
  return (
    <div className="menu">
      {isSoundOn ? <img onClick={() => onClickSound()} className="menu__soundBtn" src="/img/audio-speaker-on.svg" alt="soundOn" /> : <img onClick={() => onClickSound()} className="menu__soundBtn"  src="/img/audio-speaker-off.svg" alt="soundOff" />}
      <div>
        <div className="menu__buttonLabel">
          <div className="switchModeLabel">
            {mode ? "Player first" : "Ai first"}
          </div>
          <div
            onClick={() => {dispatch(setMode()); buttonClickSound.play()}}
            className={`BtnContainer ${mode ? "jscLeft" : "jscRight"} ${isGameStart && 'disabledbutton'}`}
          >
            <div className="BtnContainer__circle"></div>
          </div>
        </div>
        <div className="startButtonContainer">
          <div
            onClick={() => {dispatch(setIsGameStart()); musicGame.play()}}
            className="startButton"
          >
            {isGameStart ? "Restart" : "Start"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchModeBtn;
