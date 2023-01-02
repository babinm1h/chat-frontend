import { IAttachment } from '../../types/entities';

export interface IPlayerState {
  activeAudio: IAttachment | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}
