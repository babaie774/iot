import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "utils/interfaces";
import styles from "./styles/CommentBox.module.scss";
import icons from "utils/icons";
import { ImageBaseUrl } from "api";
import { useApp } from "context/AppProvider";
import { defaultImages } from "utils/defaultImages";
interface CommentBoxProps {
  comment: string;
  user: User;
  ownStream?: boolean;
}
function CommentBox({
  comment = "خیلی خوب بود",
  user: {
    name = "Mahdiano",
    key = "1",
    profileImageUrl = defaultImages.user,
    isOnline = true,
  },
  ownStream = false,
}: CommentBoxProps) {
  /* NOTICE: IF MORE COLORS ADDED LATAR, CHANGE THIS NUMBER */
  const colorsNum: number = 7;
  const color: number = (Number(key) % colorsNum) + 1;

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
        isOnline: onlineUsers.includes(key),
        streamKey: getUserStreamKey(key),
      });
    }
  }, [onlineUsers, streams,key]);

  return (
    <div className={`${styles.cloud} ${styles.persian}`}>
      <div className={`${styles.userWrapper}`}>
        <Link
          passHref
          href={
            !userData.isOnline
              ? `/user/${key}/profile`
              : `/stream/${userData.streamKey}`
          }
        >
          <a
            className={`${styles.userImg} ${
              userData.isOnline && styles.online
            }`}
          >
            <Image
              src={
                profileImageUrl && profileImageUrl !== ""
                  ? `${ImageBaseUrl}${profileImageUrl}`
                  : defaultImages.user
              }
              loader={() => {
                return profileImageUrl && profileImageUrl !== ""
                  ? `${ImageBaseUrl}${profileImageUrl}`
                  : `/UserImgDefault.png`;
              }}
              alt={name}
              layout="fill"
            />
          </a>
        </Link>
        <Link
          passHref
          href={
            !userData.isOnline
              ? `/user/${key}/profile`
              : `/stream/${userData.streamKey}`
          }
        >
          <a
            className={`${styles.userName} ${styles[`chatColor${color}`]} ${
              styles.english
            }`}
          >
            {`:${name && name !== "" ? name : `user${key}`} `}
            {ownStream === true ? icons.videoCamera() : ""}
          </a>
        </Link>
      </div>
      <pre className={`${styles.comment} ${styles.persian}`}>{comment}</pre>
    </div>
  );
}

export default CommentBox;
