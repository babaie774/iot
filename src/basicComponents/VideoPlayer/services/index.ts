import videojs, { VideoJsPlayer } from "video.js";

export const keyPressHandler = (
  event: videojs.KeyboardEvent,
  player: VideoJsPlayer | undefined
) => {
  if (player) {
    if (event.keyCode === 32) {
      //Space key for PLAY/PAUSE
      event.preventDefault()
      player.paused() ? player.play() : player.pause();
    } else if (event.keyCode === 77) {
      //M key for Toggle Mute
      player.muted() ? player.muted(false) : player.muted(true);
    } else if (event.keyCode === 70) {
      //F key for Toggle FullScreen
      player.isFullscreen()
        ? player.exitFullscreen()
        : player.requestFullscreen();
    } else if (event.keyCode === 38 && event.shiftKey) {
      //ArrowUp + Shift Key for increasing Volume
      event.repeat
        ? player.volume(player.volume() + 0.1)
        : player.volume(player.volume() + 0.01);
    } else if (event.keyCode === 40 && event.shiftKey) {
      //ArrowDown + Shift Key for decreasing Volume
      event.repeat
        ? player.volume(player.volume() - 0.1)
        : player.volume(player.volume() - 0.01);
    }
  }
};

const vh = (v: number) => {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
};

export const fixedHeightHandle = (
  fixedHeight: boolean | undefined,
  videoJSContainer: HTMLDivElement
) => {
  if (fixedHeight) {
    if (videoJSContainer.clientWidth * (9 / 16) > vh(80)) {
      videoJSContainer.style.paddingTop = `${vh(80)}px`;
    } else {
      videoJSContainer.style.paddingTop = "56.25%";
    }
  }
};