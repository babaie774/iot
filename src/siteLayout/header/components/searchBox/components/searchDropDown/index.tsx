import React from "react";
import Image from "next/image";
import styles from "./styles/SearchDropDown.module.scss";
import { numFormatter } from "utils";
import Router from "next/router";
import { fileBaseURL } from "api";
import { useApp } from "context/AppProvider";
import { defaultImages } from "utils/defaultImages";
interface SearchDropDownProps {
  data: any;
  searchText: string | string[];
  setShowSearchDropdown: (show: boolean) => void;
  setShowSeachBox: (show: boolean) => void;
}
function SearchDropDown({
  data,
  searchText,
  setShowSearchDropdown,
  setShowSeachBox,
}: SearchDropDownProps) {
  const handleRouteToSearch = () => {
    setShowSeachBox(false);
    setShowSearchDropdown(false);
    Router.push(`/search?activeTab=streams&q=${searchText}`);
  };
  const {
    state: { onlineUsers, streams },
  } = useApp();
  const handleGetUserStream = (user_id: string) => {
    const stream = streams.filter(
      (stream: any) => stream.streamer._key === user_id
    );
    return stream[0];
  };

  return (
    <div className={styles.dropdownBox}>
      {searchText && streams ? (
        <>
          {data?.users?.map((item: any, index: number) => {
            const user_stream = handleGetUserStream(item._key);
            const is_online = onlineUsers.includes(item._key);
            return (
              <div className={`${styles.searchItem} `} key={index}>
                <div className="d-flex align-items-center">
                  <div
                    className={`${styles.userImg} ${
                      is_online && styles.streaming
                    }`}
                  >
                    <div
                      className={`${styles.pointer}  ${styles.imgParent}`}
                      onClick={() => {
                        setShowSeachBox(false);
                        setShowSearchDropdown(false);
                        Router.push(
                          `${
                            is_online
                              ? `/stream/${user_stream._key}`
                              : `/user/${item._key}/profile`
                          }`
                        );
                      }}
                    >
                      <Image
                        src={
                          item.image_url
                            ? `${fileBaseURL}${item.image_url}`
                            : defaultImages.user
                        }
                        loader={() =>
                          item.image_url
                            ? `${fileBaseURL}${item.image_url}`
                            : defaultImages.user
                        }
                        alt={item._key}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <div className={`ms-auto ${styles.desc}`}>
                    <span
                      className={`${styles.userName} ${styles.pointer}  `}
                      onClick={() => {
                        setShowSeachBox(false);
                        setShowSearchDropdown(false);
                        Router.push(
                          `${
                            is_online
                              ? `/stream/${user_stream._key}`
                              : `/user/${item._key}/profile`
                          }`
                        );
                      }}
                    >
                      {item.username ? item.username : `user${item._key}`}
                    </span>

                    <span
                      className={`${styles.steamName} ${
                        is_online ? styles.pointer : ""
                      }  `}
                      onClick={() => {
                        if (is_online) {
                          setShowSeachBox(false);
                          setShowSearchDropdown(false);
                          Router.push(`/game/${user_stream.category._key}`);
                        }
                      }}
                    >
                      {is_online
                        ? user_stream.category.title
                        : `${numFormatter(item.followers_count)} دنبال کننده`}
                    </span>
                  </div>
                </div>
                {is_online && (
                  <div className={styles.followerCount}>
                    <span className={styles.circle} />
                    <span>{numFormatter(user_stream.live_views)}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/*    {data?.offers.map((item: any, index: number) => (
            <div
              className={[styles.offerItem, styles.pointer].join(" ")}
              key={index}
              onClick={handleRouteToSearch}
            >
              <div className={styles.offerIcon}>
                <span>{icons.searchResult()}</span>
              </div>
              <span className={`${styles.searchText} ${styles.offerText}`}>
                {item.text}
              </span>
            </div>
          ))} */}
          <div
            onClick={handleRouteToSearch}
            className={[styles.searchLink, styles.pointer].join(" ")}
          >
            جستجوی دقیق {searchText}
          </div>
        </>
      ) : (
        <>
          {/*   {histories.map((item: any, index: number) => (
            <div
              className={`${styles.offerItem} justify-content-between `}
              key={index}
            >
              <div
                onClick={handleRouteToSearch}
                className={["d-flex align-items-center", styles.pointer].join(
                  " "
                )}
              >
                <div className={styles.historyIcon}>
                  <span>{icons.recently()}</span>
                </div>
                <span className={`${styles.searchText} ${styles.offerText}`}>
                  {item.text}
                </span>
              </div>

              <span className={styles.removeBtn}>{icons.close()}</span>
            </div>
          ))} */}
        </>
      )}
    </div>
  );
}

export default SearchDropDown;
