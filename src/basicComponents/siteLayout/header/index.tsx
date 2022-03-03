import React, { useEffect, useRef, useState } from "react";
import icons from "utils/icons";
import logo from "utils/logo";
import { User } from "../../../utils/interfaces";
import UserPopUpMenu from "./components/userPopUpMenu";
import styles from "./styles/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import Router, { useRouter } from "next/router";

import SearchBox from "./components/searchBox";
import { handleRegister } from "./services";
import { ImageBaseUrl } from "api";

interface HeaderProps {
  isLogin: boolean;
  user?: User;
  panel: boolean;
  handleCollapseMenu: () => void;
  setShowLogin: any;
  useId: string | null;
  withHeader: boolean;
  mobileHeader: boolean;
  omitHeader: boolean;
}

const Header = ({
  isLogin = false,
  panel = false,
  user = {
    name: "elahe",
    isOnline: false,
    key: "1234567",
    profileImageUrl: "",
    phone_number: "",
  },
  useId,
  handleCollapseMenu,
  setShowLogin,
  withHeader,
  mobileHeader,
  omitHeader,
}: HeaderProps) => {
  const searchInputRef = useRef<any>();
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showSeachBox, setShowSeachBox] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { search } = useRouter().query;
  useEffect(() => {
    if (search) {
      setShowSeachBox(true);
    }
  }, [search]);

  return (
    <>
      <header
        className={[
          styles.header,
          withHeader
            ? styles.headerExistence
            : mobileHeader
            ? styles.headerExistenceInMobile
            : omitHeader
            ? styles.headerExistenceInMobile
            : "",
        ].join(" ")}
      >
        <div className={styles.sub}>
          <span onClick={handleCollapseMenu} className={styles.menu}>
            {icons.hamburgerMenu()}
          </span>
          <Link href="/" passHref={true}>
            <div className={`${styles.logo} ${styles.sub}`}>
              <span className={styles.logoAvatar}>{logo.avatar()}</span>
              <span className={styles.logoTypo}>{logo.typo()}</span>
            </div>
          </Link>
        </div>
        <SearchBox
          searchInputRef={searchInputRef}
          setShowSearchDropdown={setShowSearchDropdown}
          setShowSeachBox={setShowSeachBox}
          showSeachBox={showSeachBox}
          showSearchDropdown={showSearchDropdown}
        />
        {isLogin ? (
          <div className={styles.sub}>
            <span
              id="searchIcon"
              className={styles.search_icon}
              onClick={() => {
                setShowSeachBox(true);
                setShowSearchDropdown(true);
                searchInputRef.current.focus();
              }}
            >
              {icons.searchInput()}
            </span>
            {/* <span>{icons.notification()}</span> */}
            <div className={styles.relative}>
              <span
                id="userMenuIcon"
                className={`${styles.user} ${styles.sub}`}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user &&
                user?.profileImageUrl &&
                user.profileImageUrl !== "" ? (
                  <Image
                    src={`${ImageBaseUrl}${user.profileImageUrl}`}
                    alt={user.name}
                    layout="fill"
                    loader={() => `${ImageBaseUrl}${user.profileImageUrl}`}
                    loading="eager"
                  />
                ) : (
                  icons.userDefault()
                )}
              </span>{" "}
              <UserPopUpMenu
                panel={panel}
                user={user}
                useId={useId}
                show={showUserMenu}
                setShow={setShowUserMenu}
              />
            </div>
          </div>
        ) : (
          <button
            className={styles.loginButton}
            onClick={() => setShowLogin(true)}
          >
            ثبت نام | ورود
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
