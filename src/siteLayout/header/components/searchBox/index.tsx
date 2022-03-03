import React, { useEffect, useState } from "react";
import icons from "utils/icons";
import { handleKeyDown, handleSearch } from "./services";
import styles from "./styles/SearchBox.module.scss";
import Router, { useRouter } from "next/router";
import SearchDropDown from "./components/searchDropDown";

interface SearchBoxProps {
  setShowSearchDropdown: (val: boolean) => void;
  setShowSeachBox: (val: boolean) => void;
  showSeachBox: boolean;
  showSearchDropdown: boolean;
  searchInputRef: any;
}
function SearchBox({
  showSeachBox,
  setShowSeachBox,
  showSearchDropdown,
  setShowSearchDropdown,
  searchInputRef,
}: SearchBoxProps) {
  const [searchText, setSearchText] = useState<any>("");
  const [results, setResults] = useState<any>({
    users: [],
  });
  const { query } = useRouter();
  const [timerCounter, setTimerCounter] = useState(3);
  const handleChangeSearchText = (event: any) => {
    let { value } = event.target;
    setSearchText(value);
    setTimerCounter(3);
    if (value.trim() && !showSearchDropdown) setShowSearchDropdown(true);
    else if (!value.trim()) setShowSearchDropdown(false);
  };
  useEffect(() => {
    const { q } = query;
    if (q) setSearchText(q);
  }, [query]);
  useEffect(() => {
    setInterval(() => {
      setTimerCounter((prv) => prv - 1);
    }, 400);
  }, []);
  useEffect(() => {
    if (timerCounter === 0 && searchText) {
      handleSearch(setResults, searchText);
    }
  }, [timerCounter, searchText]);
  useEffect(() => {
    window.addEventListener("click", function (event: any) {
      if (
        event.target.closest("#searchBox") ||
        event.target.closest("#searchIcon")
      ) {
        return;
      } else {
        setShowSearchDropdown(false);
      }
    });
  }, []);
  return (
    <div
      id="searchBox"
      className={`${styles.searchBox}  ${showSeachBox ? styles.show : ""}`}
    >
      <span
        className={styles.backBtn}
        onClick={() => {
          setShowSeachBox(false);
          setShowSearchDropdown(false);
          setSearchText("");
        }}
      >
        {icons.leftArrow()}
      </span>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="جستجو در سایت..."
        value={searchText}
        /*    onFocus={() => {
            if (!searchText) setShowSearchDropdown(true);
          }} */
        onKeyDown={(event) =>
          handleKeyDown(
            event,
            setShowSearchDropdown,
            setShowSeachBox,
            searchText
          )
        }
        onChange={handleChangeSearchText}
      />
      <div
        className={styles.searchIcon}
        onClick={() => {
          if (searchText.trim()) {
            setShowSeachBox(false);
            setShowSearchDropdown(false);
            Router.push(`/search?activeTab=streams&q=${searchText}`);
          }
        }}
      >
        <span>{icons.searchInput()}</span>
      </div>
      <span className={styles.close_search} onClick={() => setSearchText("")}>
        {icons.close()}
      </span>
      {showSearchDropdown && results.users.length && (
        <SearchDropDown
          setShowSeachBox={setShowSeachBox}
          setShowSearchDropdown={setShowSearchDropdown}
          data={results}
          searchText={searchText}
        />
      )}
    </div>
  );
}

export default SearchBox;
