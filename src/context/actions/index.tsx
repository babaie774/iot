import { useContext, useCallback } from "react";
import { AppDispatchContext } from "../AppProvider";
import {
  SET_CURRENT_USER,
  SET_IS_LOGIN,
  SET_ONLINE_USERS,
  SET_SIDEBAR_COLLAPSED,
  SET_STREAMS,
} from "../types";

import {} from "context/types";
import { translator } from "utils/translator";

function useContextDispatcher() {
  const dispatch = useContext(AppDispatchContext);

  const getCurrentUser = async (jwt_token: string) => {
    const res = await translator("my_profile", {
      token: { jwt_token: jwt_token },
    });
    const currentUser = {
      name: res.data.username,
      key: res.data._key,
      profileImageUrl: res.data.image_url,
      isOnline: false,
      followers: res.data.followers_count,
      optionalLink: res.data.donate_url,
      profileBannerUrl: res.data.cover_image_url,
      phone_number: res.data.phone_number,
    };
    dispatch({ type: SET_CURRENT_USER, payload: currentUser });
  };
  const getOnlineUsers = async () => {
    const streames: any = await translator("show_streams", {});
    let onlineUsers = [];
    if (streames && streames.data && streames.data.length > 0)
      for (let i = 0; i < streames.data.length; i++) {
        onlineUsers.push(streames.data[i].streamer._key);
      }
    dispatch({ type: SET_ONLINE_USERS, payload: onlineUsers });
  };

  const setIsLogin = async (is_login: boolean) => {
    dispatch({ type: SET_IS_LOGIN, payload: is_login });
  };
  const setSidebarCollapsed = async (sidebarCollapsed: boolean) => {
    dispatch({ type: SET_SIDEBAR_COLLAPSED, payload: sidebarCollapsed });
  };
  const getStreams = async () => {
    const res = await translator("show_streams", {});

    dispatch({ type: SET_STREAMS, payload: res.data });
  };
  return {
    getCurrentUser,
    setIsLogin,
    getOnlineUsers,
    getStreams,
    setSidebarCollapsed,
  };
}
export { useContextDispatcher };
