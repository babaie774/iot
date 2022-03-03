import { defaultImages } from "utils/defaultImages";
import icons from "utils/icons";
import { translator } from "utils/translator";

export interface followingUsersTypes {
  _key: string;
  followers_count: number;
  image_url: string;
  username: string;
}
export const handleSortUsers = (
  followingUsers: followingUsersTypes[],
  onlineUsers: any
) => {
  const onlineUser = followingUsers.filter((item) =>
    onlineUsers.includes(item._key)
  );
  const offlineUser = followingUsers.filter(
    (item) => !onlineUsers.includes(item._key)
  );
  return onlineUser.concat(offlineUser);
};

export const fetchingData = async (
  setFollowingUsers: (value: any) => void,
  token: string | null
) => {
  const usersData: any = await translator("followings", {
    token: { jwt_token: token },
  });

  setFollowingUsers(usersData?.data);
};

export const subMenuItems = (userId: string, isLogin: boolean) =>
  isLogin
    ? [
        {
          icon: icons.home(),
          name: "home",
          displayName: "صفحه اصلی",
          link: "/",
        },
        {
          icon: icons.explore(),
          name: "explore",
          displayName: "کاوش",
          link: "/explore",
        },
        {
          icon: icons.followings(),
          name: "followings",
          displayName: "دنبال شده ها",
          link: `/user/${userId || 123}/followings`,
        },
      ]
    : [
        {
          icon: icons.home(),
          name: "home",
          displayName: "صفحه اصلی",
          link: "/",
        },
        {
          icon: icons.explore(),
          name: "explore",
          displayName: "کاوش",
          link: "/explore",
        },
      ];
export const panelSubMenuItems = (userId: string, isLogin: boolean) => [
  {
    icon: icons.dashboard(),
    name: "dashboard",
    displayName: "داشبورد",
    link: `/user/${userId || 123}/dashboard`,
  },
  {
    icon: icons.stream(),
    name: "stream",
    displayName: "پخش زنده",
    link: `/user/${userId || 123}/stream`,
  },
  {
    icon: icons.stats(),
    name: "streamStats",
    displayName: "آمارهای پخش زنده",
    link: `/user/${userId || 123}/stream-stats`,
  },
  {
    icon: icons.clip(),
    name: "clips",
    displayName: "کلیپ های من",
    link: `/user/${userId || 123}/clips`,
  },
  {
    icon: icons.followings(),
    name: "followings",
    displayName: "دنبال کنندگان",
    link: `/user/${userId || 123}/followersPanel`,
  },
];
export const users = [
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: true,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: true,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: true,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: true,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: true,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: true,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: true,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: true,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
  {
    name: "esme in karbar kheily kheily tulani ast",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
  {
    name: "eliiiiii",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
  {
    name: "last",
    key: "12333333",
    profileImageUrl: defaultImages.user,
    isOnline: false,
  },
];
