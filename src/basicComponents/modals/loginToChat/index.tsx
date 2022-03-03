import React from "react";
import { Modal } from "react-bootstrap";
import styles from "./styles/LoginToChat.module.scss";
import icons from "utils/icons";
import { messages } from "utils/errors";

interface LoginToChatProps {
  show: boolean;
  setShow: (value: boolean) => void;
  happyOrSad: boolean;
  message: string;
  actionBtnText: string;
  actionBtnState?: boolean;
  setActionBtnState: any;
}
const LoginToChat = ({
  show,
  setShow,
  happyOrSad = false,
  message = messages.loginFirstErr,
  actionBtnText = "تایید",
  actionBtnState,
  setActionBtnState,
}: LoginToChatProps) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      className={styles.modal}
    >
      <div className={styles.closeBtn_container}>
        <button className={styles.closeBtn} onClick={() => setShow(false)}>
          {icons.close()}
        </button>
      </div>
      {happyOrSad ? (
        <>
          <div className={styles.happyFace}>{icons.happyFace()}</div>
          <span className={styles.text}>{message}</span>
        </>
      ) : (
        <>
          <div className={styles.happyFace}>{icons.unhappyFace()}</div>
          <span className={styles.text}>{message}</span>
        </>
      )}

      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          onClick={() => {
            setActionBtnState(true);
            setShow(false);
          }}
        >
          {actionBtnText}
        </button>
      </div>
    </Modal>
  );
};

export default LoginToChat;
