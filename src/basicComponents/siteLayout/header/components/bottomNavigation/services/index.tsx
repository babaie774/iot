import icons from "utils/icons";

export const bottomNavigationLinks = (userId: string, isLogin: boolean) =>
  isLogin
    ? [
        {
          icon: icons.followings(),
          title: "دنبال شده ها",
          link: `/user/${userId || 123}/followings`,
          key: 1,
        },

        {
          icon: icons.explore(),
          title: "کاوش",
          // link: "/explore?activeTab=category",
          link: "/explore",
          key: 3,
        },
        {
          icon: icons.home(),
          title: "صفحه اصلی",
          link: "/",
          key: 2,
        },
      ]
    : [
        {
          icon: icons.explore(),
          title: "کاوش",
          // link: "/explore?activeTab=category",
          link: "/explore",
          key: 3,
        },
        {
          icon: icons.home(),
          title: "صفحه اصلی",
          link: "/",
          key: 2,
        },
      ];
export const panelBottomNavigationLinks = (
  userId: string,
  isLogin: boolean
) => [
  {
    icon: icons.dashboard(),
    title: "داشبورد",
    link: `/user/${userId || 123}/dashboard`,
    key: 1,
  },

  {
    icon: icons.stats(),
    title: "آمارهای پخش زنده",
    link: `/user/${userId || 1234}/stream-stats`,
    key: 2,
  },
  {
    icon: icons.clip(),
    title: "کلیپ های من",
    link: `/user/${userId || 123}/clips`,
    key: 3,
  },
  {
    icon: icons.followings(),
    title: "دنبال کنندگان",
    link: `/user/${userId || 123}/followersPanel`,
    key: 4,
  },
];
