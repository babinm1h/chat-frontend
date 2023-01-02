export const formatDuration = function (time: number) {
  let mins: string | number = Math.floor(time / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  let secs: string | number = Math.floor(time % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  return mins + ':' + secs;
};
