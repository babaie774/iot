import React, { useEffect } from "react";
import styles from "./styles/UserPopUpMenu.module.scss";
import Link from "next/link";
import Image from "next/image";
import icons from "utils/icons";
import { popUpLinks, handleLogout } from "./services";
import { User } from "utils/interfaces";
import { ImageBaseUrl } from "api";
import Router, { useRouter } from "next/router";
import { defaultImages } from "utils/defaultImages";

interface UserPopUpMenuProps {
  user: User;
  show: boolean;
  panel: boolean;
  useId: string | null;
  setShow: (value: boolean) => void;
}
function UserPopUpMenu({
  user = {
    name: "elahe",
    isOnline: false,
    key: "1234567",
    profileImageUrl: "",
  },
  useId,
  show = false,
  panel,
  setShow = () => {},
}: UserPopUpMenuProps) {
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("click", function (event: any) {
      if (
        event.target.closest("#popup") ||
        event.target.closest("#userMenuIcon")
      ) {
        return;
      } else {
        setShow(false);
      }
    });
  }, []);

  useEffect(() => {
    let body = document.querySelector("body") as HTMLBodyElement;
    if(show){
      body.setAttribute("class","modalBodyDisabledScroll")
    }else if (!show){
      body.removeAttribute("class")
    }
  } ,[show]);
  
  return (
    <>
      <div
        className={`${show ? styles.show : ""} ${styles.backDrop}`}
        onClick={() => setShow(!show)}
      ></div>
      <div id="popup" className={`${styles.popup} ${show ? styles.show : ""}`}>
        <span className={styles.closeBtn} onClick={() => setShow(!show)}>
          {icons.close()}
        </span>
        {/* <Link href={`/user/${useId || 123}/profile`}> */}
        <div
          className={`${styles.userDetail} ${styles.onlyDesctop}`}
          onClick={() => {
            setShow(false);
            Router.push(`/user/${useId || 123}/profile`);
          }}
        >
          <div className={styles.userImg}>
            <Image
              src={
                user && user?.profileImageUrl && user.profileImageUrl
                  ? `${ImageBaseUrl}${user.profileImageUrl}`
                  : defaultImages.user
              }
              loader={() =>
                user && user?.profileImageUrl && user.profileImageUrl
                  ? `${ImageBaseUrl}${user.profileImageUrl}`
                  : "/UserImgDefault.png"
              }
              alt={user.name}
              layout="fill"
            />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {user && user?.name && user.name !== ""
                ? user.name
                : `User${user.key}`}
            </span>
            <span className={styles.followersCount}>
              {user?.followers} دنبال کننده
            </span>
          </div>
          <span className={styles.arrowIcon}>{icons.leftArrow()}</span>
        </div>
        {/* </Link> */}
        <div className={`${styles.userDetail} ${styles.onlyMobile}`}>
          <div className={styles.userImg}>
            <Image
              src={
                user && user?.profileImageUrl && user.profileImageUrl
                  ? `${ImageBaseUrl}${user.profileImageUrl}`
                  : defaultImages.user
              }
              loader={() =>
                user && user?.profileImageUrl && user.profileImageUrl
                  ? `${ImageBaseUrl}${user.profileImageUrl}`
                  : "/UserImgDefault.png"
              }
              alt={user.name}
              layout="fill"
            />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {user && user?.name && user.name !== ""
                ? user.name
                : `User${user.key}`}
            </span>
            <span className={styles.followersCount}>
              {user?.followers} دنبال کننده
            </span>
          </div>
          <Link href={`/user/${useId || 123}/profile`}>
            <a className={styles.profileBtn}>
              {icons.user()}
              پروفایل
            </a>
          </Link>
        </div>
        <div className={styles.linksBox}>
          {popUpLinks(useId, panel).map((item: any, index: number) => (
            <Link key={index} href={item.link}>
              <a className={styles.link}>
                <span className={styles.linkIcon}>{item.icon}</span>
                <span className={styles.linkTitle}>{item.title}</span>
              </a>
            </Link>
          ))}
          <div className={styles.link} onClick={() => handleLogout(router)}>
            <span className={styles.linkIcon}>{icons.logOut()}</span>
            <span className={styles.linkTitle}>خروج از حساب کاربری</span>
          </div>
        </div>
        <span className={styles.version}>ورژن بتا (۰.۰.۱)</span>
      </div>
    </>
  );
}

export default UserPopUpMenu;
