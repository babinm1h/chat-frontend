import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'rejected';

export default function useScreen(stream: MediaStream | null) {
  const [status, setStatus] = useState<Status>('idle');
  const [screenTrack, setScreenTrack] = useState<MediaStreamTrack | null>(null);

  /**
   * @param onstarted an optional function that is called when screen sharing is started
   * @param onended an optional function that is called when screen sharing is stopped
   */
  async function startShare(onstarted: () => void = () => {}, onended: () => void = () => {}) {
    setStatus('loading');

    try {
      if (!stream) return;

      // @ts-ignore
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      const [screenTrack] = screenStream.getTracks();

      setScreenTrack(screenTrack);
      stream.addTrack(screenTrack);
      setStatus('success');

      onstarted();

      screenTrack.onended = () => {
        stopShare(screenTrack);
        onended();
      };
    } catch (e) {
      console.error('Failed to share screen');
      console.error(e);
      setStatus('rejected');
    }
  }

  function stopShare(screenTrack: MediaStreamTrack) {
    if (!stream) return;

    screenTrack.stop();
    stream.removeTrack(screenTrack);
    setScreenTrack(null);
    setStatus('idle');
  }

  return {
    screenTrack,
    startShare,
    stopShare,
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'rejected',
  };
}
