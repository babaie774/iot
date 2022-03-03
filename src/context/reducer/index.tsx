import {
  SET_CURRENT_USER,
  SET_IS_LOGIN,
  SET_ONLINE_USERS,
  SET_SIDEBAR_COLLAPSED,
  SET_STREAMS,
} from "../types";

export default (state: any, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case SET_IS_LOGIN:
      return { ...state, isLogin: action.payload };
    case SET_ONLINE_USERS:
      return { ...state, onlineUsers: action.payload };
    case SET_STREAMS:
      return { ...state, streams: action.payload };
    case SET_SIDEBAR_COLLAPSED:
      return { ...state, sidebarCollapsed: action.payload };
    default:
      return state;
  }
};
