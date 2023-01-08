import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICallState } from '../types/call.slice.types';

const initialState: ICallState = {
  peer: null,
  isCalling: false,
  myStream: null,
  remoteStream: null,
  call: null,
  connection: null,
  isReceivingCall: false,
  caller: null,
  callDialogId: null,
  isWaitingForAnswer: false,
  receiver: null,
};

const callSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    setPeer(state, action: PayloadAction<typeof initialState['peer']>) {
      state.peer = action.payload;
    },
    setIsCalling(state, action: PayloadAction<boolean>) {
      state.isCalling = action.payload;
    },
    setIsReceivingCall(state, action: PayloadAction<boolean>) {
      state.isReceivingCall = action.payload;
    },
    setMyStream(state, action: PayloadAction<typeof initialState['myStream']>) {
      state.myStream = action.payload;
    },
    setRemoteStream(state, action: PayloadAction<typeof initialState['remoteStream']>) {
      state.remoteStream = action.payload;
    },
    setCall(state, action: PayloadAction<typeof initialState['call']>) {
      state.call = action.payload;
    },
    setConnection(state, action: PayloadAction<typeof initialState['connection']>) {
      state.connection = action.payload;
    },
    setCaller(state, action: PayloadAction<typeof initialState['caller']>) {
      state.caller = action.payload;
    },
    setCallDialogId(state, action: PayloadAction<typeof initialState['callDialogId']>) {
      state.callDialogId = action.payload;
    },
    setIsWaitingForAnswer(state, action: PayloadAction<boolean>) {
      state.isWaitingForAnswer = action.payload;
    },
    setCallReceiver(state, action: PayloadAction<typeof initialState['receiver']>) {
      state.receiver = action.payload;
    },
    resetCallState(state) {
      state.isCalling = false;
      state.myStream = null;
      state.remoteStream = null;
      state.call = null;
      state.connection = null;
      state.isReceivingCall = false;
      state.caller = null;
      state.callDialogId = null;
      state.isWaitingForAnswer = false;
      state.receiver = null;
    },
  },
  extraReducers: {},
});

export default callSlice.reducer;

export const {
  setPeer,
  setIsCalling,
  setMyStream,
  setRemoteStream,
  setCall,
  setConnection,
  setIsReceivingCall,
  setCaller,
  setCallDialogId,
  setIsWaitingForAnswer,
  resetCallState,
  setCallReceiver,
} = callSlice.actions;
