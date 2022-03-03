import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles/StreamInfoHover.module.scss";
import { numFormatter, SecToTimer } from "../../../../../utils/index";
import icons from "../../../../../utils/icons";
import { Stream } from "utils/interfaces";
import { fileBaseURL, ImageBaseUrl, siteUrl } from "api";
import { defaultImages } from "utils/defaultImages";
import { useApp } from "context/AppProvider";
interface StreamInfoHoverProps {
  stream: Stream;
  owner: boolean;
  isInfoHoverOpen: boolean;
}
/*********** How to Use This component? */
/* if you want to use this beside some other elements
  you should pass a styleClass to this component

  Lets say we want to use this component in some styles like this :
        Stream Info Hover Component         Some other component
  _________________________________________________________       
  | 12k 00:35                 [ShareIcon] | [SettingIcon] |
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
  you should use a wrapper to contain this component beside 
  the external elemet

  and use flex 
  like this :

  <div className="d-flex align-items-center">
    <StreamInfoHover props />
    <span>icons.setting</span>
  </div>
  */
function StreamInfoHover({
  stream: {
    name = "ارانگل اسکواد با بچه ها",
    key = "123",
    game = {
      name: "PUBG Mobile",
      key: "pubgmobile",
    },
    streamer = {
      name: "Mahdiano",
      key: "1",
      profileImageUrl: "/UserImg.jpg",
      isOnline: true,
    },
    viewerCount = 12000,
    ended = false,
    duration = "200",
  },
  owner = false,
  isInfoHoverOpen = false,
}: StreamInfoHoverProps) {
  let formattedDuration = SecToTimer(Number(duration));
  const [userData, setUserOnline] = useState({
    isOnline: false,
    streamKey: "",
  });
  const {
    state: { onlineUsers, streams },
  } = useApp();

  useEffect(() => {
    if (streams) {
      const getUserStreamKey = (user_id: string) => {
        const stream = streams.filter(
          (stream: any) => stream.streamer._key === user_id
        );
        return stream[0]?._key;
      };
      setUserOnline({
        isOnline: onlineUsers.includes(streamer.key),
        streamKey: getUserStreamKey(streamer.key),
      });
    }
  }, [onlineUsers, streams]);

  return (
    <div
      className={`${styles.card} ${isInfoHoverOpen ? styles.show : ""} ${
        ended ? styles.clip : ""
      }`}
    >
      {/* user Profile */}
      {!owner && (
        <span
          className={`${styles.userImg} ${
            ended
              ? userData.isOnline
                ? styles.streaming
                : ""
              : styles.streaming
          }`}
        >
          <Link
            href={
              ended && userData.isOnline
                ? `stream/${userData.streamKey}`
                : `/user/${streamer.key}/profile`
            }
          >
            <a>
              <Image
                src={
                  streamer.profileImageUrl && streamer.profileImageUrl !== ""
                    ? `${ImageBaseUrl}${streamer.profileImageUrl}`
                    : defaultImages.user
                }
                loader={() => {
                  return streamer.profileImageUrl &&
                    streamer.profileImageUrl !== ""
                    ? `${ImageBaseUrl}${streamer.profileImageUrl}`
                    : defaultImages.user;
                }}
                alt={streamer.name}
                layout="fill"
              />
            </a>
          </Link>
        </span>
      )}
      <div className={`${styles.desc}`}>
        {/* Streamer name */}
        {!owner && (
          <Link
            passHref
            href={
              ended && userData.isOnline
                ? `stream/${userData.streamKey}`
                : `/user/${streamer.key}/profile`
            }
          >
            <a>
              <span className={`${styles.userName} ${styles.english}`}>
                {streamer.name && streamer.name !== '' ? streamer.name : `user${streamer.key}`}
              </span>
            </a>
          </Link>
        )}
        {/* Stream name */}
        <div className={styles.streamNameConitaner}>
          <p className={`${styles.streamName} ${styles.persian} `}>{name}</p>
        </div>
        {/* GameName */}
        <Link passHref href={`/game/${game.key}`}>
          <a className={`${styles.english}`}>
            <span className={`${styles.gameName} ${styles.english} `}>
              {game.name}
              {icons.gamePad()}
            </span>
          </a>
        </Link>
        {/* Share button */}
        <button
          className={`${styles.btnCustom} ${styles.shareBtn}`}
          onClick={() =>
            navigator.clipboard.writeText(
              `${siteUrl}${ended ? "clip/" : "stream/"}${key}`
            )
          }
        >
          {icons.share()}
        </button>
      </div>
      {/* Online info or viewer */}
      <span className={styles.info}>
        {!ended ? (
          <>
            <span className={`${styles.viewers} ${styles.persian}`}>
              {<i className={`${styles.streamDot}`}></i>}
              {numFormatter(viewerCount)}
            </span>
            <span className={`${styles.duration} ${styles.persian}`}>
              {`${formattedDuration.hour} : ${formattedDuration.minute}`}
            </span>
          </>
        ) : (
          <>
            <span
              className={`${styles.offlineViewers} ${styles.viewers} ${styles.persian}`}
            >
              <span> بازدید کننده</span>
              {numFormatter(viewerCount)}
              {icons.eyeOpen()}
            </span>
          </>
        )}
      </span>
    </div>
  );
}

export default StreamInfoHover;
