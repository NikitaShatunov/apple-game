import * as React from "react";
import { useAppDispatch, useAppSelector } from "../redux/redux";
import { setIsGameStart, setMode } from "../redux/slices/gameSlice";

import { buttonClickSound } from "../App";

const SwitchModeBtn = () => {
  const mode = useAppSelector((state) => state.game.isPlayerrFirst);
  const isGameStart = useAppSelector((state) => state.game.isGameStart);
  const dispatch = useAppDispatch();
  React.useEffect(() => {}, [mode, isGameStart]);
  return (
    <div className="menu">
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
            onClick={() => {dispatch(setIsGameStart())}}
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
