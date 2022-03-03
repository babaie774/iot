import { User } from "utils/interfaces";

const currentUser: User = {
  name: "",
  key: "",
  profileImageUrl: "",
  isOnline: false,
  followers: 0,
  optionalLink: "",
  profileBannerUrl: "",
  phone_number: "",
};
const isLogin: boolean = false;
const sidebarCollapsed: boolean = false;
const onlineUsers: string[] = [];
const streams: any[] | null = null;

export default {
  currentUser,
  isLogin,
  onlineUsers,
  streams,
  sidebarCollapsed,
};
