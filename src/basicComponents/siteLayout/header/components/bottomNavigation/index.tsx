import React, { useEffect, useState } from "react";
import Link from "next/link";
import { bottomNavigationLinks } from "./services";
import styles from "./styles/BottomNavigation.module.scss";
import { useRouter } from "next/router";
import { User } from "utils/interfaces";
interface BottomNavigationProps {
  userId: string;
  isLogin: boolean;
  bottomNavigationLinks: (
    userId: string,
    isLogin: boolean
  ) => BottomNavigationLinks[];
}
interface BottomNavigationLinks {
  icon: JSX.Element;
  title: string;
  link: string;
  key: number;
}
function BottomNavigation({
  userId,
  isLogin,
  bottomNavigationLinks,
}: BottomNavigationProps) {
  let { pathname } = useRouter();
  let { user_id } = useRouter().query;

  const [currectPathname, setCurrectPathname] = useState(pathname);

  useEffect(() => {
    if (user_id) {
      setCurrectPathname(pathname.replace("[user_id]", user_id.toString()));
    }
  }, [pathname, user_id]);

  return (
    <div className={styles.bottomNavigation}>
      {bottomNavigationLinks(userId, isLogin).map((item) => (
        <Link href={item.link} key={item.key}>
          <a
            className={`${currectPathname === item.link ? styles.active : ""} ${
              styles.navigationLink
            }`}
          >
            <span className={styles.navigationLink__icon}>{item.icon}</span>
            <span className={styles.navigationLink__title}>{item.title}</span>
          </a>
        </Link>
      ))}
    </div>
  );
}

export default BottomNavigation;
