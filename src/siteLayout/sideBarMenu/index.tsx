import UserBadge from "components/basicComponents/userBadge";
import React, { useEffect, useState } from "react";
import {
  handleSortUsers,
  subMenuItems,
  followingUsersTypes,
  fetchingData,
} from "./services";
import styles from "./styles/SideBarMenu.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import icons from "utils/icons";
import logo from "utils/logo";
import { useApp } from "context/AppProvider";
interface SideBarMenuProps {
  collapse: boolean;
  isLogin: boolean;
  userId: string;
  subMenuItems: (userId: string, isLogin: boolean) => SideMenuItems[];
  handleCollapseMenu: () => void;
  panel: boolean;
  sideBarStreamMode: boolean;
  overlay: boolean;
}
interface SideMenuItems {
  icon: JSX.Element;
  name: string;
  displayName: string;
  link: string;
}

function SideBarMenu({
  collapse = false,
  isLogin = false,
  userId,
  subMenuItems,
  panel = false,
  sideBarStreamMode,
  overlay,
  handleCollapseMenu,
}: SideBarMenuProps) {
  let { pathname } = useRouter();
  let { user_id } = useRouter().query;
  const [followingUsers, setFollowingUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState<followingUsersTypes[]>([]);
  const [filterdUsers, setFilterdUsers] = useState<followingUsersTypes[]>([]);
  const [offset, setOffset] = useState(10);
  const [currectPathname, setCurrectPathname] = useState(pathname);

  const {
    state: { onlineUsers },
  } = useApp();

  useEffect(() => {
    if (user_id) {
      setCurrectPathname(pathname.replace("[user_id]", user_id.toString()));
    }
  }, [pathname, user_id]);

  useEffect(() => {
    if (followingUsers)
      setSortedUsers(handleSortUsers(followingUsers, onlineUsers));
  }, [followingUsers, onlineUsers]);

  useEffect(() => {
    setFilterdUsers(sortedUsers.slice(0, offset));
  }, [sortedUsers, offset]);

  const handleLoadMore = () => {
    if (offset <= sortedUsers.length) setOffset(offset + 10);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetchingData(setFollowingUsers, token);
  }, []);

  return (
    <div
      className={`${styles.sideBarMenu}
      ${collapse ? styles.collapsedMenu : ""} ${
        overlay ? styles.sideBarStreamMode : ""
      } ${overlay && !sideBarStreamMode ? styles.hiddenMenu : ""} `}
    >
      {overlay && (
        <>
          <div className={styles.subWrapper}>
            <span onClick={handleCollapseMenu} className={styles.hamburgerMenu}>
              {icons.hamburgerMenu()}
            </span>
            <Link href="/">
              <div className={`${styles.logo} ${styles.sub}`}>
                <span className={styles.logoAvatar}>{logo.avatar()}</span>
                <span className={styles.logoTypo}>{logo.typo()}</span>
              </div>
            </Link>
          </div>
          <span className={styles.thickDivider} />
        </>
      )}
      <div className={styles.subMenus}>
        {subMenuItems(userId, isLogin).map((item, index) => {
          return (
            <Link href={item.link} key={index}>
              <div
                key={index}
                className={`${styles.subMenuItem} ${
                  currectPathname === item.link ? styles.activeMenu : ""
                }`}
              >
                {currectPathname === item.link && (
                  <span className={styles.activeIndicator} />
                )}

                <span className={styles.subMenuIcon}>{item.icon}</span>
                <span className={styles.subMenuText}>{item.displayName}</span>
              </div>
            </Link>
          );
        })}
      </div>
      {!panel && <span className={styles.divider} />}
      {isLogin && !panel && (
        <div
          className={`${styles.users} ${collapse ? styles.shortenUsers : ""}`}
        >
          {filterdUsers.map((user, index) => (
            <div key={index} className={styles.userBadgeContainer}>
              <UserBadge avatarOnly={collapse} user={user} />
            </div>
          ))}
          {filterdUsers.length !== sortedUsers.length && (
            <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
              نمایش بیشتر
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SideBarMenu;
