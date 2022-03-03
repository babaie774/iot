import React, { FC, useEffect, useRef, useState } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import {
  fixedHeightHandle,
  keyPressHandler,
} from "./services/index";
// Styles
import qualitySelector from "videojs-hls-quality-selector";
import qualityLevels, {
  QualityLevelList,
} from "videojs-contrib-quality-levels";
import styles from "./styles/VideoPlayer.module.scss";
import StreamInfoHover from "./components/streamInfoHover";
import i18nFa from "./services/i18nFa.json";
interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
  StreamURL?: string;
  isStream?: boolean;
  noRadius?: boolean;
  stream?: any;
  owner?: boolean;
  fixedHeight?: boolean;
}
/********************************** ATTENTION */
// if you wanna use this component on stream page pass isStream
// optional prop as true to display right styles
/******************************************** */

const initialOptions: videojs.PlayerOptions = {
  autoplay: "muted",
  preload: "auto",
  aspectRatio: "16:9",
  controls: true,
  fluid: true,
  language: "fa",
  controlBar: {
    volumePanel: {
      inline: true,
      volumeControl: {
        vertical: false,
      },
    },
    liveDisplay: true,
    pictureInPictureToggle: false,
    durationDisplay: true,
    currentTimeDisplay: true,
    fullscreenToggle: true,
  },
  userActions: {
    hotkeys: (event) => {
      keyPressHandler(event, undefined);
    },
  },
};

const VideoPlayer: FC<IVideoPlayerProps> = ({
  options,
  StreamURL = "",
  isStream,
  noRadius,
  stream,
  owner,
  fixedHeight,
}) => {
  const videoRef = useRef<any>();
  const [player, setPlayer] = useState<VideoJsPlayer | undefined>(undefined);

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      //Plugins Configuration
      videojs.registerPlugin("qualityLevels", qualityLevels);
      videojs.registerPlugin("hlsQualitySelector", qualitySelector);
      //Add fa language to video js
      videojs.addLanguage("fa", i18nFa);
      //Construct videoPlayer
      const playerTemp = videojs(
        videoElement,
        {
          ...initialOptions,
          ...options,
          //Most Browsers only allow video play when its 'muted'
          autoplay: isStream && isStream === true ? "muted" : false,
          plugins: {
            qualityLevels: {},
          },
          liveui: isStream && isStream === true ? true : false,
        },
        () => {}
      );
      playerTemp.playsinline(true);
      setPlayer(playerTemp);
      // Stream info in hover *************************
      /* This Element added to Control Bar in purpose of simplify 
         Hide/Unhide logic and more synchronous functionality with
         VideoPlayer.
      */
      playerTemp.on(playerTemp, "fullscreenchange", (e) => {
        const isFullScreen = playerTemp.isFullscreen();
        const hoverComp = document.getElementById(
          "hoverInfoElement"
        ) as HTMLDivElement;
        const controlBar = document.querySelector(
          ".vjs-control-bar"
        ) as HTMLDivElement;
        playerTemp.focus();
        if (videoRef) {
          if (isFullScreen) {
            hoverComp.classList.remove("displayNone");
            if (videoRef.current) controlBar.appendChild(hoverComp);
          } else {
            hoverComp.classList.add("displayNone");
          }
        }
      });
    } else {
      // change src & poster if VP isnt disposed.
      if (player && options.sources) {
        player.src(options.sources[0].src);
        if (options.poster) player.poster(options.poster);
      }
    }
  }, [options, videoRef, StreamURL, player, isStream]);

  //Add Keypress shortcut function to VideoPlayer & setup plugins
  useEffect(() => {
    if (player) {
      player.hlsQualitySelector({ displayCurrentQuality: true });
      if (player.options_.userActions && player.options_.userActions.hotkeys) {
        player.options_.userActions.hotkeys = (event) => {
          keyPressHandler(event, player);
        };
      }
    }
  }, [player]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      if (player) {
        player.dispose();
        setPlayer(undefined);
      }
    };
  }, [player, setPlayer]);

  //Video Player Fixed Height
  useEffect(() => {
    if (player) {
      const videoJSContainer = document.querySelector(
        ".video-js"
      ) as HTMLDivElement;
      fixedHeightHandle(fixedHeight, videoJSContainer);
      window.addEventListener("resize", () =>
        fixedHeightHandle(fixedHeight, videoJSContainer)
      );
      return () => {
        window.removeEventListener("resize", () =>
          fixedHeightHandle(fixedHeight, videoJSContainer)
        );
      };
    }
  }, [player, fixedHeight]);

  //Space cause player to play in clip mode
  useEffect(() => {
    const spaceKeyPlay = (e: KeyboardEvent) => {
      if (player && e.code === "Space" && !player.hasStarted()) {
        //for the very first time!
        player.play();
        player.focus();
      }
    };
    if (!isStream) window.addEventListener("keydown", spaceKeyPlay);
    return () => {
      if (!isStream) window.removeEventListener("keydown", spaceKeyPlay);
    };
  }, [isStream, player]);
  return (
    <>
      <video
        ref={videoRef}
        className={`video-js ${isStream && isStream === true ? `stream` : ""} ${
          noRadius && noRadius === true ? "noRadius" : ""
        }`}
        onPlay={() => player?.focus()}
      ></video>
      <div
        id="hoverInfoElement"
        className={`displayNone ${styles.infoInHover} ${
          !isStream ? styles.clip : ""
        }`}
      >
        {stream !== undefined && (
          <StreamInfoHover
            stream={{
              name: `${stream?.title}`,
              key: `${stream?._key}`,
              game: {
                name: `${stream?.category?.title}`,
                key: `${stream?.category?._key}`,
              },
              streamer: {
                name: isStream
                  ? stream?.streamer?.username &&
                    stream?.streamer?.username !== ""
                    ? stream?.streamer?.username
                    : `user${stream?.streamer?._key}`
                  : stream?.creator?.username &&
                    stream?.creator?.username !== ""
                  ? stream?.creator?.username
                  : `user${stream?.creator?._key}`,
                key: isStream
                  ? `${stream?.streamer?._key}`
                  : `${stream?.creator?._key}`,
                profileImageUrl: isStream
                  ? stream?.streamer?.image_url
                  : stream?.creator?.image_url,
                isOnline: false,
              },
              viewerCount: stream?.total_views,
              ended: !isStream,
              duration: stream?.duration,
            }}
            owner={owner ?? false}
            isInfoHoverOpen={true}
          />
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
