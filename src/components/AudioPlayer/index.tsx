import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PauseIcon, PlayIcon } from '../../assets/icons';
import { IAttachment } from '../../types/entities';
import { formatDuration } from '../../utils/time.helpers';

const StPlayer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  user-select: none;
`;

const StPlayBtn = styled.button`
  svg {
    color: ${({ theme }) => theme.currentTheme.text.primary};
  }
`;

const StDuration = styled.span`
  font-size: 10px;
  white-space: nowrap;
`;

const StProgress = styled.div`
  min-width: 150px;
  width: 100%;
  background-color: #fff;
  position: relative;
  height: 2px;
  cursor: pointer;
`;
const StFill = styled.div`
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  height: 2px;
  width: 0;
  border-radius: 999px;
`;

const StThumb = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.common.primaryBlue};
  position: absolute;
  margin-left: -4px;
  top: -6px;
  left: -2px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
`;

interface IProps {
  audio: IAttachment;
  activeAudio: IAttachment | null;
  onSetActiveAudio: (a: IAttachment | null) => void;
}

export function toPercent(value: number, min: number = 0, max: number = 100) {
  return ((value - min) / (max - min)) * 100;
}

const AudioPlayer: FC<IProps> = ({ audio, activeAudio, onSetActiveAudio }) => {
  const audioRef = useRef(new Audio(audio.path));
  const audioElemRef = useRef<HTMLAudioElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove as any);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (trackRef.current && isDragging) {
      const rect = trackRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      let newProgress = (relativeX / rect.width) * 100;
      if (newProgress > 99) newProgress = 99;
      if (newProgress < 0) newProgress = 0;
      setProgress(newProgress);

      const newTime = (audioRef.current.duration / 100) * newProgress;
      audioRef.current.currentTime = newTime;
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const handlePlay = () => {
    if (activeAudio?.id !== audio.id) onSetActiveAudio(audio);
    setIsPlaying(true);
    audioRef.current.play();
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        handlePlay();
      } else {
        handlePause();
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    const rect = trackRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const newProgress = (relativeX / rect.width) * 100;
    setProgress(newProgress);

    const newTime = (audioRef.current.duration / 100) * newProgress;
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    if (isDragging) {
      handlePause();
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.02;
    audioRef.current.ontimeupdate = () => {
      const duration = audioRef.current.duration || 0;
      setProgress((audioRef.current.currentTime / duration) * 100);
    };

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.onended = () => {
      setIsPlaying(false);
      if (activeAudio?.id !== audio.id) onSetActiveAudio(null);
      audioRef.current.currentTime = 0;
    };
  }, [audioRef.current]);

  useEffect(() => {
    if (activeAudio?.id !== audio.id) {
      setIsPlaying(false);
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }, [activeAudio]);

  useEffect(() => {
    if (!activeAudio || activeAudio.id !== audio.id) return;
    return () => {
      onSetActiveAudio(null);
      audioRef.current.pause();
    };
  }, [activeAudio, audio.id]);

  return (
    <StPlayer>
      <StPlayBtn onClick={togglePlay}>
        {isPlaying && activeAudio?.id === audio.id ? <PauseIcon size={38} /> : <PlayIcon size={38} />}
      </StPlayBtn>
      <StDuration>{audioRef.current.currentTime ? formatDuration(audioRef.current.currentTime) : '00:00'}</StDuration>
      <StProgress ref={trackRef} onMouseDown={handleMouseDown}>
        <StFill style={{ width: `${progress}%` }} />
        <StThumb style={{ left: `${progress}%` }} />
      </StProgress>
      <audio hidden preload="none" key={audio.id} src={audio.path} ref={audioElemRef} />
      <StDuration>{duration ? formatDuration(duration) : '00:00'}</StDuration>
    </StPlayer>
  );
};

export default AudioPlayer;
