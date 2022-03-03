import React, { useEffect, useRef, useState } from "react";

import { User } from "utils/interfaces";
import styles from "./styles/TextAreaField.module.scss";
import icons from "utils/icons";
import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import {
  addEmoji,
  autoFocusTextArea,
  clickOutsidePicker,
  i18nEmoji,
  sendMessage,
  stickerClick,
  textAreaFocus,
  textAreaKeyDown,
  textAreaKeypressHandler,
  textAreaValueChange,
} from "./services";
import { UserComment } from "../../services";
import useMountAnimation from "utils/customHooks/useMountAnimation";
interface TextAreaFieldProps {
  ownStream: boolean;
  isLogin: boolean;
  currentUser: User;
  openChat: boolean;
  setSigninModal: (value: boolean) => void;
  setNewComment: React.Dispatch<React.SetStateAction<UserComment>>;
  setCommentsArray: React.Dispatch<React.SetStateAction<UserComment[]>>;
}
function TextAreaField({
  ownStream,
  isLogin,
  currentUser,
  setSigninModal,
  openChat,
  setNewComment,
  setCommentsArray,
}: TextAreaFieldProps) {
  const [typedMessage, setMessage] = useState("");
  const [pickerOpen, setPicker] = useState(false);
  const prevCursorPosRef = useRef<undefined | number>();
  const [cursorPos, setCursorPos] = useState(0);
  const textAreaRef = useRef(null);
  const pickerRef = useRef(null);
  const pickerTriggerRef = useRef(null);
  // const [pickerOpen, pickerDelayedOpen, setPickerOpen, setPickerClose] =
  // useMountAnimation(false, 300);
  useEffect(() => {
    const windowResized = () => {
      if (window.innerWidth < 1024) {
        setPicker(false);
      }
    };
    window.addEventListener("resize", windowResized);
    return () => window.removeEventListener("resize", windowResized);
  }, []);

  useEffect(() => {
    autoFocusTextArea(textAreaRef, isLogin);
  }, [openChat, isLogin]);

  //Hold prev value of cursor
  useEffect(() => {
    prevCursorPosRef.current = cursorPos;
  });
  const prevCursor = prevCursorPosRef.current;

  // Click outside to close picker
  useEffect(() => {
    window.addEventListener(
      "click",
      (e) => clickOutsidePicker(e, pickerRef, pickerTriggerRef, setPicker)
    );
    return () =>
      window.removeEventListener(
        "click",
        (e) => clickOutsidePicker(e, pickerRef, pickerTriggerRef, setPicker)
      );
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.pickerWrapper} ${styles.pickerShow}`}
        ref={pickerRef}
      >
        {pickerOpen && (
          <Picker
            onEmojiClick={(e, emojiObject) =>
              addEmoji(
                emojiObject,
                textAreaRef,
                typedMessage,
                setMessage,
                prevCursor,
                cursorPos,
                setCursorPos,
                isLogin
              )
            }
            disableAutoFocus={true}
            disableSkinTonePicker={true}
            native
            groupNames={i18nEmoji}
            disableSearchBar={true}
            groupVisibility={{
              flags: false,
            }}
          />
        )}
      </div>
      <div className={`${styles.inputWrapper}`}>
        <div className={`${styles.inputBox}`}>
          <p className={`${styles.textAreaWrapper}`}>
            <textarea
              className={`${styles.textArea} ${styles.persian}`}
              rows={1}
              value={typedMessage}
              onFocus={(e) =>
                textAreaFocus(e, isLogin, setSigninModal, pickerOpen, setPicker)
              }
              onInput={(e) => textAreaValueChange(textAreaRef, setMessage)}
              onKeyPress={(e) =>
                textAreaKeypressHandler(
                  e,
                  ownStream,
                  isLogin,
                  currentUser,
                  typedMessage,
                  setMessage,
                  setNewComment,
                  setCommentsArray
                )
              }
              onKeyUp={() => textAreaKeyDown(textAreaRef, setCursorPos)}
              onClick={() => textAreaKeyDown(textAreaRef, setCursorPos)}
              placeholder="دیدگاهتان را بنویسید"
              ref={textAreaRef}
            />
          </p>
        </div>
        <button
          className={`${styles.btnCustom} ${styles.stickerBtn}`}
          onClick={() =>
            stickerClick(isLogin, pickerOpen, setPicker, setSigninModal)
          }
          ref={pickerTriggerRef}
        >
          {icons.sticker()}
        </button>

        <button
          className={`${styles.btnCustom} ${styles.sendBtn}`}
          onClick={() =>
            sendMessage(
              ownStream,
              isLogin,
              currentUser,
              typedMessage,
              setMessage,
              setNewComment,
              setCommentsArray,
              setSigninModal
            )
          }
        >
          {icons.sendMessage()}
        </button>
      </div>
    </div>
  );
}

export default TextAreaField;
