import React, { useEffect, useState } from "react";
import { numFormatter } from "./services";
import Image from "next/image";
import { User } from "utils/interfaces";
import styles from "./styles/UserBadge.module.scss";
import Link from "next/link";
import { useApp } from "context/AppProvider";
import { ImageBaseUrl } from "api";
import { defaultImages } from "utils/defaultImages";
interface followingUsersTypes {
  _key: string;
  followers_count: number;
  image_url: string;
  username: string;
}
interface UserBadgeTypes {
  user: followingUsersTypes;
  clipCount?: number;
  avatarOnly?: boolean;
  secoundSize?: boolean;
}
function UserBadge({
  user = {
    _key: "7674151",
    followers_count: 1,
    image_url: defaultImages.user,
    username: "elii",
  },
  clipCount = 3,
  avatarOnly = false,
  secoundSize = false,
}: UserBadgeTypes) {
  const [isOnline, setIsOnline] = useState(false);
  const [stream, setStream] = useState({
    name: "",
    key: "",
    totalView: 0,
  });
  const checkIsOnline = (key: string) => {
    return onlineUsers.includes(key);
  };
  const {
    state: { onlineUsers, streams },
  } = useApp();

  useEffect(() => {
    setIsOnline(checkIsOnline(user._key));
  }, [user]);

  useEffect(() => {
    if (isOnline && streams) {
      let streamer = streams.filter(
        (each: any) => each.streamer._key === user._key
      );
      setStream({
        name: streamer[0]?.title,
        key: streamer[0]?._key,
        totalView: streamer[0]?.live_views,
      });
    }
  }, [isOnline, streams,user._key]);

  return (
    <div
      className={`${secoundSize ? styles.secoundSize : ""} ${styles.userBadge}`}
    >
      <div className={styles.userInfo}>
        <Link
          passHref
          href={
            isOnline ? `/stream/${stream.key}` : `/user/${user._key}/profile`
          }
        >
          <div
            className={`${styles.userAvatar} ${
              isOnline ? "" : styles.userAvatar_offlineMode
            }`}
          >
            <Image
              src={
                user?.image_url
                  ? `${ImageBaseUrl}${user?.image_url}`
                  : defaultImages.user
              }
              loader={() =>
                user?.image_url
                  ? `${ImageBaseUrl}${user?.image_url}`
                  : defaultImages.user
              }
              alt="userImage"
              layout="fill"
            />
          </div>
        </Link>
        {!avatarOnly && (
          <div className={styles.content}>
            <Link
              passHref
              href={
                isOnline
                  ? `/stream/${stream.key}`
                  : `/user/${user._key}/profile`
              }
            >
              <span className={styles.userName}>
                {user?.username ? user?.username : `user ${user?._key}`}
              </span>
            </Link>

            {isOnline ? (
              <Link passHref href={`/stream/${stream.key}`}>
                <span className={`${styles.details} ${styles.gameName}`}>
                  {stream?.name}
                </span>
              </Link>
            ) : (
              <></>
              // <span className={`${styles.details} ${styles.clipCount}`}>
              //    {`${clipCount} کلیپ جدید`}
              // </span>
            )}
          </div>
        )}
      </div>
      {!avatarOnly ? (
        isOnline ? (
          <div className={styles.liveWrapper}>
            <span className={styles.liveCount}>
              {numFormatter(stream.totalView)}
            </span>
            <div className={styles.liveSimbol}></div>
          </div>
        ) : (
          <span className={styles.offline}>آفلاین</span>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default UserBadge;
