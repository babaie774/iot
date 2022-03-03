import { UserComment } from "components/basicComponents/chatBox/services";
import { IEmojiData } from "emoji-picker-react";
import { User } from "utils/interfaces";
import styles from "../styles/TextAreaField.module.scss";
export const i18nEmoji = {
  searchPlaceholder: "جستجو",
  recently_used: "ایموجی های اخیر",
  smileys_people: "اسمایلی",
  animals_nature: "حیوانات",
  food_drink: "غذا",
  activities: "فعالیت",
  travel_places: "مسافرت و مکان ها",
  objects: "اشیاء",
  symbols: "علامت ها",
  flags: "پرچم",
  custom: "Custom",
};

//SignIn or Follow Modal open
export const modalOpenCheck = (isLogin: boolean) => {
  if (isLogin === false) {
    return true;
  } else {
    return false;
  }
};
//Sticker Button click handler
export const stickerClick = (
  isLogin: boolean,
  pickerOpen: boolean,
  setPickerOpen: (value: boolean) => void,
  setSigninModal: (value: boolean) => void,
  pickerDelayedOpen?: boolean,
  setPickerClose?: (value: boolean) => void
) => {
  if (!modalOpenCheck(isLogin)) {
    setPickerOpen(!pickerOpen);
  } else {
    setSigninModal(true);
  }
};
//autoFocus textArea
export const autoFocusTextArea = (
  textAreaRef: React.MutableRefObject<null>,
  isLogin: boolean
) => {
  if (textAreaRef?.current && isLogin) {
    (textAreaRef?.current as HTMLTextAreaElement)?.focus();
  }
};

// For adding emojies to typedMessage
export const addEmoji = (
  emoji: IEmojiData,
  textAreaRef: React.MutableRefObject<null>,
  typedMessage: string,
  setMessage: (value: string) => void,
  prevCursor: number | undefined,
  cursorPos: number,
  setCursorPos: React.Dispatch<React.SetStateAction<number>>,
  isLogin?: boolean
) => {
  if (textAreaRef.current) {
    if ("emoji" in emoji) {
      if (cursorPos + 2 === prevCursor) {
        setMessage(
          typedMessage.slice(0, prevCursor) +
            emoji.emoji +
            typedMessage.slice(prevCursor)
        );
      } else {
        setMessage(
          typedMessage.slice(0, cursorPos) +
            emoji.emoji +
            typedMessage.slice(cursorPos)
        );
      }
      (textAreaRef.current as HTMLTextAreaElement).style.height = "auto";
      (textAreaRef.current as HTMLTextAreaElement).style.height =
        (textAreaRef.current as HTMLTextAreaElement).scrollHeight + "px";
      if (setCursorPos) setCursorPos(cursorPos + emoji.emoji.length);
    }
  }
};
//Resize the text area and update text
export const textAreaValueChange = (
  textAreaRef: React.MutableRefObject<null>,
  setMessage?: (value: string) => void
) => {
  if (textAreaRef.current) {
    const textArea = textAreaRef.current as HTMLTextAreaElement;
    textArea.style.height = "auto";
    //Check for empty enters
    if (textArea.value.replace(/\n/g, "").length !== 0) {
      textArea.style.height = textArea.scrollHeight + "px";
    } else {
      //if its just enters erase it
      textArea.value = "";
      textArea.style.height = "30px";
    }
    if (setMessage) setMessage(textArea.value);
  }
};
//SignIn or Follow Modal open
export const textAreaFocus = (
  e: React.FocusEvent<HTMLTextAreaElement>,
  isLogin: boolean,
  setSigninModal: (value: boolean) => void,
  pickerOpen: boolean,
  setPicker: (value: boolean) => void
) => {
  if (modalOpenCheck(isLogin)) {
    setSigninModal(true);
    (e.target as HTMLTextAreaElement).blur();
  } else if (pickerOpen) {
    setPicker(false);
  }
};

//KeyDown Handler for updating cursor position
export const textAreaKeyDown = (
  textAreaRef: React.MutableRefObject<null>,
  setCursorPos: React.Dispatch<React.SetStateAction<number>>
) => {
  if (textAreaRef.current) {
    setCursorPos((textAreaRef.current as HTMLTextAreaElement).selectionEnd);
  }
};

//Keypress handler -> Enter for send message
export const textAreaKeypressHandler = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  ownStream: boolean,
  isLogin: boolean,
  currentUser: User,
  typedMessage: string,
  setMessage: (value: string) => void,
  setNewComment: React.Dispatch<React.SetStateAction<UserComment>>,
  setCommentsArray: (value: UserComment[]) => void
) => {
  const textArea = e.target as HTMLTextAreaElement;
  const textTemp = `${textArea.value}`;
  if (
    e.key === "Enter" &&
    !e.shiftKey &&
    textTemp.replace(/\n/g, "").length !== 0
  ) {
    createNewMessage(
      ownStream,
      isLogin,
      currentUser,
      typedMessage,
      setMessage,
      setNewComment,
      setCommentsArray
    );
  }
};
//Create new message
export const createNewMessage = (
  ownStream: boolean,
  isLogin: boolean,
  currentUser: User,
  typedMessage: string,
  setMessage: (value: string) => void,
  setNewComment: React.Dispatch<React.SetStateAction<UserComment>>,
  setCommentsArray: (value: UserComment[]) => void
) => {
  if (isLogin === true && typedMessage !== "") {
    const toBeSentMessage: UserComment = {
      comment: typedMessage.trim().replaceAll(/\n\s*\n/g, "\n"),
      user: {
        ...currentUser,
      },
      ownStream: false,
    };
    setMessage("");
    // setCommentsArray([...commentsArray, toBeSentMessage]);
    setNewComment(toBeSentMessage);
  }
};

//Send new message
export const sendMessage = (
  ownStream: boolean,
  isLogin: boolean,
  currentUser: User,
  typedMessage: string,
  setMessage: (value: string) => void,
  setNewComment: React.Dispatch<React.SetStateAction<UserComment>>,
  setCommentsArray: (value: UserComment[]) => void,
  setSigninModal: (value: boolean) => void
) => {
  const textArea = document.querySelector(
    `.${styles.textArea}`
  ) as HTMLTextAreaElement;
  if (!modalOpenCheck(isLogin)) {
    createNewMessage(
      ownStream,
      isLogin,
      currentUser,
      typedMessage,
      setMessage,
      setNewComment,
      setCommentsArray
    );
    textArea.value.replace(/\n/g, "");
    textArea.value = "";
    textArea.style.height = "30px";
    setMessage("");
  } else {
    setSigninModal(true);
  }
};

export const clickOutsidePicker = (
  event: MouseEvent,
  pickerRef: React.MutableRefObject<null>,
  pickerTriggerRef: React.MutableRefObject<null>,
  setPicker: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (
    pickerRef.current &&
    pickerTriggerRef.current &&
    ((pickerRef.current as HTMLDivElement).contains(
      event.target as HTMLDivElement
    ) ||
      (pickerTriggerRef.current as HTMLButtonElement).contains(
        event.target as HTMLButtonElement
      ))
  ) {
    return;
  }
  setPicker(false);
};
