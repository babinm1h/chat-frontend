import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MicroIcon, MutedMicroIcon, PhoneDownIcon, VideoIcon, VideoMutedIcon } from '../../../assets/icons';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useSocket } from '../../../hooks/useSocket';
import useMediaStream from '../../../hooks/webrtc/useMediaStream';
import { userSelector } from '../../../redux/slices/auth.slice';
import { SocketEvents } from '../../../types/socketEvents.types';

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.currentTheme.background.primary};
  height: 100%;
  z-index: 5;
  justify-content: center;
  padding: 20px 10px;
  top: 0;
  left: 0;
`;

const StVideo = styled.video`
  height: 100%;
  width: 100%;
  display: block;
`;

const StVideoWrapper = styled.div`
  max-height: 300px;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #000;
  border-radius: 6px;
`;

const StControls = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 5px 10px;
  align-items: center;
`;

const StControlsItems = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  button {
    svg {
      color: #fff;
    }
  }
`;

const StUsers = styled.div`
  min-width: 100px;
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
`;

const StControlBtn = styled.button<{ red?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #333;
  ${({ red }) =>
    red &&
    `
    background-color: red;
  `}
  svg {
    color: #fff;
  }
`;

const StName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 14px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const CallOverlay = () => {
  const { myStream, remoteStream, caller, receiver } = useAppSelector((state) => state.call);

  const { toggleMicro, toggleVideo, micro, video } = useMediaStream(myStream);

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socket = useSocket();

  const handleHangUp = () => {
    socket.emit(SocketEvents.videoCallHangup, { callerId: caller?.id, receiverId: receiver?.id });
  };

  useEffect(() => {
    if (myStream && myVideoRef.current) {
      myVideoRef.current.srcObject = myStream;
    }
  }, [myStream, myVideoRef.current]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, remoteVideoRef.current]);

  return (
    <StWrapper>
      <StUsers>
        <StVideoWrapper>
          <StVideo ref={myVideoRef} playsInline autoPlay />
        </StVideoWrapper>

        <StVideoWrapper>
          <StVideo ref={remoteVideoRef} playsInline autoPlay />
          <StName>{caller?.firstName}</StName>
        </StVideoWrapper>
      </StUsers>

      <StControls>
        <StControlsItems>
          <StControlBtn onClick={() => toggleMicro('audio')}>
            {micro ? <MicroIcon size={27} /> : <MutedMicroIcon size={27} />}
          </StControlBtn>

          <StControlBtn onClick={toggleVideo}>
            {video ? <VideoIcon size={27} /> : <VideoMutedIcon size={27} />}
          </StControlBtn>

          <StControlBtn onClick={handleHangUp} red>
            <PhoneDownIcon size={27} style={{ marginBottom: '2px' }} />
          </StControlBtn>
        </StControlsItems>
      </StControls>
    </StWrapper>
  );
};

export default CallOverlay;
