import React, { useState, useEffect} from "react";
import CommentBox from "./components/commentBox";
import LoginToChat from "../modals/loginToChat";
import icons from "utils/icons";
import styles from "./styles/ChatBox.module.scss";
import { UserComment, comments } from "./services/index";
import { messages } from "utils/errors";
import { useApp } from "context/AppProvider";
import { useContextDispatcher } from "context/actions";
import TextAreaField from "./components/textAreaField";
import { Socket, Channel } from "phoenix";
import { useRouter } from "next/router";
import { socketBaseUrl } from "api";
import { defaultImages } from "utils/defaultImages";
interface ChatBoxProps {
  ownStream?: boolean;
  setloginModal?: React.Dispatch<React.SetStateAction<boolean>>;
  isFollowed?: boolean;
  openChat?: boolean;
  setOpenChat?: (vlaue: boolean) => void;
  showLoginModal?: boolean;
}
type userCommentSocket = {
  created_at: number;
  msg: string;
  username: string | null;
  _key: string;
  image_url: string | null;
};
type ConnectionState =
  | "init"
  | "connecting"
  | "open"
  | "closing"
  | "closed"
  | "error";
type ChannelState =
  | "init"
  | "closed"
  | "errored"
  | "timeout"
  | "joined"
  | "joining"
  | "leaving";

function ChatBox(params: ChatBoxProps) {
  const [pushMessage, setPushMessage] = useState<UserComment>({
    ownStream: false,
    user: {
      key: "",
      name: "",
      isOnline: false,
      profileImageUrl: defaultImages.user,
    },
    comment: "",
  });
  const [isSiginiModalOpen, setSigninModal] = useState(false);
  const [commentsArray, setCommentsArray] = useState(comments);
  //context variables and methods
  const {
    state: { currentUser, isLogin },
  } = useApp();
  const { getCurrentUser } = useContextDispatcher();

  //socket vaariables and states
  const [newMessage, setNewMessage] = useState(false);
  const [channel, setChannel] = useState<Channel>();
  const [socketStatus, setSocketStatus] = useState<ConnectionState>("init");
  const [channelStatus, setChannelStatus] = useState<ChannelState>("init");
  const { stream_id, user_id } = useRouter().query;

  //Open/Close Chat
  const barClickHandler = () => {
    if (params.setOpenChat) params.setOpenChat(!params.openChat);
  };
  //If login succesfully dont show Login to chat modal
  useEffect(() => {
    if (isLogin) {
      setSigninModal(false);
      const token = localStorage.getItem("token");
      getCurrentUser(token ?? "");
    }
  }, [isLogin, getCurrentUser]);
  //scroll to bottom when chatBox is opening or when there is a new message
  useEffect(() => {
    const commentsContaienr = document.querySelector(
      `.${styles.comments}`
    ) as HTMLDivElement;
    if (
      newMessage &&
      (params.openChat === true || params.openChat === undefined)
    ) {
      commentsContaienr.scrollTop = 0;
      setNewMessage(false);
    }
  }, [newMessage, params.openChat]);

  //Socket effect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user_id !== undefined || stream_id !== undefined) {
      const socketParams = isLogin
        ? {
            params: { token: token },
          }
        : undefined;
      const socket = new Socket(
        `${socketBaseUrl}/user_socket`,
        socketParams ?? undefined
      );
      const channel = socket.channel(
        `live_stream:${
          params.ownStream && params.ownStream === true ? user_id : stream_id
        }`
      );
 
      setChannel(channel);
      //Socket initialaztion
      socket.connect();
      socket.onOpen(() => setSocketStatus("open"));
      socket.onError(() => setSocketStatus("error"));
      socket.onClose(() => setSocketStatus("closed"));
      //Channel init
      channel
        .join()
        .receive("ok", () => {
          setChannelStatus("joined");
        })
        .receive("error", () => setChannelStatus("errored"))
        .receive("timeout", () => setChannelStatus("timeout"));
      channel.on("new_msg", (res: userCommentSocket) => {
        const newMessage: UserComment = {
          comment: res.msg,
          user: {
            name: res?.username ? res?.username : "",
            key: res._key,
            isOnline: false,
            profileImageUrl:
              res?.image_url && res?.image_url !== "" ? res?.image_url : "",
          },
          ownStream:
            params.ownStream && params.ownStream === true
              ? user_id === res._key
              : stream_id === res._key,
        };
        comments.push(newMessage);
        // setCommentsArray([...commentsArray, newMessage]);
        setNewMessage(true);
      });
      return () => {
        comments.splice(0, comments.length);
        channel.leave();
        socket.disconnect();
      };
    }
  }, [stream_id, user_id, isLogin,channel,params.ownStream]);
  // Push message effect
  useEffect(() => {
    if (channelStatus === "joined" && socketStatus === "open" && channel) {
      channel
        .push("send_msg", { msg: pushMessage.comment }, 10000)
        .receive("ok", () => console.log("Socket: created message"))
        .receive("error", () => console.warn("Socket: create failed"))
        .receive("timeout", () => console.warn("Socket: Networking issue..."));
    } else {
      console.warn("Socket: Not joined yet");
    }
  }, [pushMessage, channelStatus, socketStatus, channel]);

  return (
    <>
      {!params?.ownStream && (
        <LoginToChat
          show={isSiginiModalOpen}
          setShow={setSigninModal}
          happyOrSad={false}
          message={messages.loginFirstErr}
          actionBtnText={"ورود | ثبت نام"}
          setActionBtnState={params?.setloginModal}
        />
      )}

      <div
        className={`${styles.chatBox} ${
          params.openChat || params?.ownStream ? styles.open : ""
        } ${params?.ownStream && styles.stream}`}
      >
        {!params?.ownStream && (
          <div className={`${styles.bar}`}>
            <button
              className={`${styles.btnCustom} ${styles.headerIconOpen}`}
              onClick={barClickHandler}
            >
              {icons.closeChat()}
            </button>
            <button
              className={`${styles.btnCustom} ${styles.notif} ${
                newMessage && styles.newMessage
              }`}
              onClick={barClickHandler}
            >
              {icons.meassageNotification()}
            </button>
          </div>
        )}
        <div
          className={`${styles.wrapper}
       ${(params.openChat || params?.ownStream) && styles.open}
       `}
        >
          {!params?.ownStream && (
            <>
              <div className={`${styles.headerMobile} ${styles.persian}`}>
                به بخش گفتگو خوش آمدید
              </div>
              <div className={`${styles.header}`}>
                <span className={`${styles.title} ${styles.persian}`}>
                  گفتگو
                </span>
                <button
                  className={`${styles.btnCustom} ${styles.headerIconClose}`}
                  onClick={barClickHandler}
                >
                  {icons.closeChat()}
                </button>
              </div>
            </>
          )}
          <div className={`${styles.comments}`}>
            {comments
              .slice(0)
              .reverse()
              .map((comment: UserComment, index: number) => {
                return (
                  <>
                    <CommentBox
                      key={comments.length - index}
                      comment={comment.comment}
                      user={{
                        name: comment.user.name,
                        key: comment.user.key,
                        profileImageUrl: comment.user.profileImageUrl,
                        isOnline: comment.user.isOnline,
                      }}
                      ownStream={comment.ownStream ?? false}
                    />
                  </>
                );
              })}
          </div>
          <TextAreaField
            ownStream={params?.ownStream ? params?.ownStream : false}
            isLogin={isLogin}
            currentUser={currentUser}
            setSigninModal={setSigninModal}
            openChat={params?.openChat !== undefined ? params.openChat : true}
            setNewComment={setPushMessage}
            setCommentsArray={setCommentsArray}
          />
        </div>
      </div>
    </>
  );
}

export default ChatBox;
