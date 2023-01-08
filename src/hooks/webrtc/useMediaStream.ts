import * as React from 'react';

export type Status = 'loading' | 'idle' | 'rejected' | 'success';

export default function useMediaStream(stream: MediaStream | null = null) {
  const [status, setStatus] = React.useState<Status>('loading');

  const [m, setM] = React.useState(false);
  const [v, setV] = React.useState(true);

  React.useEffect(() => {
    if (stream) {
      setStatus('idle');

      const [audio, video] = stream.getTracks();
      setM(!audio.enabled);
      setV(video.enabled);
    } else {
    }
  }, [stream]);

  function toggle(kind: 'audio' | 'video' = 'audio') {
    if (!stream) throw new Error('Failed. Could not find stream');

    const track = stream.getTracks().find((track) => track.kind === kind);

    if (!track) throw new Error(`Failed. Could not find ${kind} track in given stream`);

    if (track.enabled) {
      track.enabled = false;
      track.kind === 'audio' ? setM(false) : setV(false);
    } else {
      track.enabled = true;
      track.kind === 'audio' ? setM(true) : setV(true);
    }
  }

  async function toggleVideo(cb?: unknown) {
    if (!stream) throw new Error('There is no a video stream to toggle');

    const videoTrack = stream.getVideoTracks()[0];

    if (videoTrack.readyState === 'live') {
      videoTrack.enabled = false;
      videoTrack.stop(); // * turns off web cam light indicator
      setV(false);
    } else {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const newVideoTrack = newStream.getVideoTracks()[0];

      if (typeof cb === 'function') {
        cb(newVideoTrack);
      }

      stream.removeTrack(videoTrack);

      const [screenTrack] = stream.getVideoTracks();

      if (screenTrack) {
        stream.removeTrack(screenTrack);
        stream.addTrack(newVideoTrack);
        stream.addTrack(screenTrack);
      } else stream.addTrack(newVideoTrack);

      setV(true);
    }
  }

  return {
    stream,
    micro: m,
    video: v,
    toggle,
    toggleMicro: toggle,
    toggleVideo,
    isLoading: status === 'loading',
    isError: status === 'rejected',
    isSuccess: status === 'success' || status === 'idle',
  };
}
