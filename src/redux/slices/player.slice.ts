import { createSlice } from '@reduxjs/toolkit';
import { IPlayerState } from '../types/player.slice.types';

const initialState: IPlayerState = { activeAudio: null, isPlaying: false, currentTime: 0, duration: 0, volume: 5 };

const playerSlice = createSlice({
  initialState,
  name: 'player',
  reducers: {
    setActiveAudio: (state, action) => {
      state.activeAudio = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
  extraReducers: {},
});

export default playerSlice.reducer;
export const { setActiveAudio, setIsPlaying, setCurrentTime, setDuration, setVolume } = playerSlice.actions;
