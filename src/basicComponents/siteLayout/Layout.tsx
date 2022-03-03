import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import SideBarMenu from "./sideBarMenu";
import Header from "./header";
import Login from "login";
import BottomNavigation from "./header/components/bottomNavigation";
import ChatBox from "basicComponents/chatBox";
import { panelSubMenuItems, subMenuItems } from "./sideBarMenu/services";
import {
  bottomNavigationLinks,
  panelBottomNavigationLinks,
} from "./header/components/bottomNavigation/services";
import { useApp } from "context/AppProvider";
import { useContextDispatcher } from "context/actions";
import { useRouter } from "next/router";
import NProgress from "nprogress";

interface LayoutProps {
  title: string;
  withBottomNavigation?: boolean;
  children: JSX.Element;
  overlay?: boolean;
  panel?: boolean;
  showLoginModal?: boolean;
  isStream?: boolean;
  withHeader?: boolean;
  mobileHeader?: boolean;
}

const Layout = ({
  title,
  withBottomNavigation = true,
  panel = false,
  children,
  showLoginModal = false,
  overlay = false,
  isStream = false,
  withHeader = false,
  mobileHeader = false,
}: LayoutProps) => {
  const [show, setShow] = useState(false);
  const [openChat, setOpenChat] = useState(true);
  const [sideBarStreamMode, setSideBarStreamMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = () => {
      NProgress.start();
      setLoading(true);
    };
    const handleRouteEnd = () => {
      NProgress.done();
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteEnd);
    router.events.on("routeChangeError", handleRouteEnd);
    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteEnd);
      router.events.off("routeChangeError", handleRouteEnd);
    };
  }, [router.events]);
  const [omitHeader, setOmitHeader] = useState(false);

  const {
    state: { currentUser, isLogin, sidebarCollapsed },
  } = useApp();
  const {
    getCurrentUser,
    setIsLogin,
    getOnlineUsers,
    getStreams,
    setSidebarCollapsed,
  } = useContextDispatcher();

  const handleCollapseMenu = () => {
    if (overlay) {
      setSideBarStreamMode(!sideBarStreamMode);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
      // setCollapseSideMenu(!collapseSideMenu);
    }
  };

  useEffect(() => {
    setShow(showLoginModal);
  }, [showLoginModal]);

  useEffect(() => {
    setIsLogin(localStorage.getItem("isLogin") === "true");
    getOnlineUsers();
    getStreams();
  }, [getOnlineUsers, getStreams,setIsLogin]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser(token);
    }
  }, [isLogin,getCurrentUser]);
  useEffect(() => {
    if (show && innerWidth <= 768) {
      setOmitHeader(true);
    }
  }, [show]);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title ? title : ""}</title>
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
          <link rel="shortcut icon" href="/gameriaLogo.ico" />
      </Head>
      <Header
        isLogin={!!isLogin}
        handleCollapseMenu={handleCollapseMenu}
        setShowLogin={setShow}
        panel={panel}
        useId={currentUser?.key}
        user={currentUser}
        withHeader={withHeader}
        mobileHeader={mobileHeader}
        omitHeader={omitHeader}
      />
      <Login show={show} setShow={setShow} setOmitHeader={setOmitHeader} />

      <main className="main">
        {sideBarStreamMode && overlay ? (
          <div
            className="sideMenuStreamModeOverlay"
            onClick={handleCollapseMenu}
          ></div>
        ) : (
          ""
        )}
        <SideBarMenu
          isLogin={!!isLogin}
          collapse={sidebarCollapsed}
          userId={currentUser?.key}
          panel={panel}
          subMenuItems={panel ? panelSubMenuItems : subMenuItems}
          sideBarStreamMode={sideBarStreamMode}
          overlay={overlay}
          handleCollapseMenu={handleCollapseMenu}
        />
        {isStream && (
          <div className="chatRoom">
            <ChatBox
              openChat={openChat}
              setOpenChat={setOpenChat}
              setloginModal={setShow}
            />
          </div>
        )}
        <div
          className={`content ${sidebarCollapsed ? "expandContent" : ""} ${
            overlay ? "fullWidth" : ""
          } ${isLoading ? "isLoading" : ""}
          ${withBottomNavigation ? "" : "contentWithoutNavigation"}`}
          // className={`content ${collapseSideMenu ? "expandContent" : ""}`}
        >
          {isLoading && (
            <>
              <div className={`isLoadingOverlay`}></div>
              <div
                className={`spinner ${sidebarCollapsed ? "expanded" : ""} ${
                  overlay ? "stream" : ""
                }`}
                role="spinner"
              >
                <div className="spinner-icon"></div>
              </div>
            </>
          )}
          {children}
        </div>
        {withBottomNavigation && (
          <BottomNavigation
            isLogin={!!isLogin}
            bottomNavigationLinks={
              panel ? panelBottomNavigationLinks : bottomNavigationLinks
            }
            userId={currentUser?.key}
          />
        )}
      </main>
    </>
  );
};

export default Layout;
