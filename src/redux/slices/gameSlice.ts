import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  playerCurrentPick: 0,
  playerAmount: 0,
  opponentCurrentPick: 0,
  opponentAmount: 0,
  residue: 25,
  ownResidue: 25,
  isPlayerrFirst: true,
  isGameStart: false,
  applesPick: 3,
  isGameClassic: true,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerPick(state, action) {
        state.playerCurrentPick = action.payload;
        state.playerAmount += action.payload;
        state.residue -= action.payload;
    },
    setOpponentPick(state, action) {
      state.opponentCurrentPick = action.payload;
      state.opponentAmount += action.payload;
      state.residue -= action.payload;
  },
  clearGamerState(state) {
    state.opponentCurrentPick = 0;
    state.opponentAmount = 0;
    state.playerCurrentPick = 0;
    state.playerAmount = 0;
  },
  setResidue(state, action) {
    state.residue = action.payload
  },
  setMode(state) {
    state.isPlayerrFirst = !state.isPlayerrFirst
  },
  setIsGameStart(state) {
    state.isGameStart = !state.isGameStart
    if(!state.isGameStart) {
      state.opponentAmount = 0
      state.playerAmount = 0
      state.residue = state.isGameClassic ? 25 : state.ownResidue
      state.playerCurrentPick = 0
      state.opponentCurrentPick = 0
    }
  },
  setApplesPickOwnGame(state, action) {
    state.applesPick = action.payload
  },
  setIsGameClasssic(state, action) {
    state.isGameClassic = action.payload
  },
  setOwnResidue(state, action) {
    state.residue = action.payload
    state.ownResidue = action.payload
  }
  },
 
});

export const { setPlayerPick, setOpponentPick, clearGamerState, setResidue, setMode, setIsGameStart, setApplesPickOwnGame, setIsGameClasssic, setOwnResidue } = gameSlice.actions;

export default gameSlice.reducer;