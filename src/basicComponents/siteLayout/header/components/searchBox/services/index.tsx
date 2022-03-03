import Router from "next/router";
import { translator } from "utils/translator";

export const handleKeyDown = (
  event: any,
  setShowSearchDropdown: (val: boolean) => void,
  setShowSeachBox: (val: boolean) => void,
  searchText: string | string[]
) => {
  let code = null;
  if (event.keyCode !== undefined) {
    code = event.keyCode;
  } else if (event.key !== undefined) {
    code = event.key;
  } else if (event.keyIdentifier !== undefined) {
    code = event.keyIdentifier;
  }
  if (code === 13 || code === "Enter") {
    setShowSearchDropdown(false);
    setShowSeachBox(false);
    Router.push(`/search?activeTab=streams&q=${searchText}`);
  }
};
export const results = {
  users: [
    {
      name: "Mahdiano",
      key: "1",
      profileImageUrl: "",
      isOnline: true,
      game_name: "Dota 2",
      game_id: 33,
      followerCount: 12000,
      streamId: "48254",
      viewr_count: 12000,
    },
    {
      name: "Mahdiano",
      key: "1",
      profileImageUrl: "/UserImg.jpg",
      isOnline: false,
      streamName: "Dota 2",
      followerCount: 12000,
    },
  ],
  offers: [
    {
      text: "asdffhgkr",
      key: 2,
    },
    {
      text: "asdffhgkr",
      key: 2,
    },
    {
      text: "asdffhgkr",
      key: 2,
    },
  ],
};
export const histories = [
  {
    text: "asdffhgkr",
    key: 2,
  },
  {
    text: "asdffhgkr",
    key: 2,
  },
  {
    text: "asdffhgkr",
    key: 2,
  },
];
export const handleSearch = async (
  setResults: any,
  searchVal: string | string[]
) => {
  const profiles: any = await translator("search_profiles", {
    q: searchVal,
  });
  setResults({
    users: profiles.data,
  });
};
