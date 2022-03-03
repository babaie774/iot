import {
  accountBaseApi,
  serverBaseApi,
  storageBaseApi,
  streamBaseApi,
  vodBaseApi,
} from "api";
import { Stream } from "utils/interfaces";
import { defaultImages } from "./defaultImages";

// {
//   0: {
//     success: true,
//     msg: "ok"
//   },
//   1: {
//     msg: "unknown error occurred",
//     success: false,
//   },
//   2: {
//     msg: "rate limit",
//     success: false,
//   },
//   3: {
//     msg: "username or password invalid",
//     success: false,
//   },
//   4: {
//     msg: "sent data format invalid",
//     success: false,
//   },
// 404: {msg: "resource not found", success: false},
//

interface translatorResponce {
  error: any;
  msg: string;
  status: number;
  success: boolean;
  data: any;
}

interface fetchOtpInputs {
  phone_number: string;
}

interface signUpInputs {
  phone_number: string;
  otp: string;
}
interface signUpOutputs {
  _key: string;
  phone_number: string;
  jwt_token: string;
}

interface showProfileInputs {
  user_key: string;
}

interface showProfileOutputs {
  _key: string;
  about_me: any[]; // TODO add about me structure
  bio: string;
  cover_image_url: string;
  donate_url: string;
  followers: any[]; // TODO add followers structure
  followers_count: number;
  followings: any[]; // TODO add followings structure
  followings_count: number;
  full_name: string;
  image_url: string;
  phone_number: string;
  profile_status: string;
  social_link: any[]; // TODO add social_link structure
  username: string;
}
interface showMyProfileOutputs {
  _key: string;
  about_me: any[]; // TODO add about me structure
  bio: string;
  cover_image_url: string;
  donate_url: string;
  followers: any[]; // TODO add followers structure
  followers_count: number;
  followings: any[]; // TODO add followings structure
  followings_count: number;
  full_name: string;
  image_url: string;
  phone_number: string;
  profile_status: string;
  social_link: any[]; // TODO add social_link structure
  username: string;
}
interface JWTOnly {
  jwt_token: string;
}

interface vodIndexProps {
  queryParams: object;
}

const fetchOtp = async (
  params: fetchOtpInputs
): Promise<translatorResponce> => {
  const resp: any = await accountBaseApi({
    method: "POST",
    url: "/accounts/get_signup_otp_code",
    data: {
      user: {
        phone_number: params.phone_number,
      },
    },
  });

  const res = resp.data;

  if (res === "Created") {
    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: "",
    };
  } else if (res?.error === "rate limiting" && res.upto > 0) {
    return {
      error: res.error,
      msg: `rate limit error up to ${res.upto}`,
      status: 3,
      success: false,
      data: {
        upto: res.upto,
      },
    };
  } else if (res?.errors?.phone_number === ["has invalid format"]) {
    return {
      error: "has invalid format",
      msg: "phone number is invalid",
      status: 4,
      success: false,
      data: "",
    };
  } else {
    const response: translatorResponce = {
      error: "output structure is unknown",
      msg: "unknown error occurred",
      status: 1,
      success: false,
      data: "",
    };
    console.error(response);
    return response;
  }
};

const signUp = async (params: signUpInputs): Promise<translatorResponce> => {
  const resp: any = await accountBaseApi({
    method: "POST",
    url: "/accounts/signup_with_otp_code",
    data: {
      user: {
        phone_number: `+98${params.phone_number}`,
        totp_token: params.otp,
      },
    },
  });
  const res = resp.data;

  if (res === "Unauthorized") {
    return {
      error: "unauthorized",
      msg: "invalid one time password",
      status: 3,
      success: false,
      data: "",
    };
  } else if (res === "Bad Request") {
    return {
      msg: "invalid phone number or one time password format",
      error: "has invalid format",
      status: 4,
      success: false,
      data: "",
    };
  } else if (res?.token && res?.user?._key && res?.user?.phone_number) {
    const data: signUpOutputs = {
      _key: res.user._key,
      phone_number: res.user.phone_number,
      jwt_token: res.token,
    };
    return {
      msg: "login successfully",
      error: "",
      status: 0,
      success: true,
      data: data,
    };
  }
  const response: translatorResponce = {
    error: "output structure is unknown",
    msg: "unknown error occurred",
    status: 1,
    success: false,
    data: "",
  };
  console.error(response);

  return response;
};

const showProfile = (params: showProfileInputs): translatorResponce => {
  const resp: any = serverBaseApi({
    method: "GET",
    url: `/profile/${params.user_key}`,
  });
  const res = resp.data;
  if (res === "Not Found") {
    return {
      error: "Not Found",
      msg: "user not found",
      status: 404,
      success: false,
      data: "",
    };
  } else if (
    res?._key &&
    (res?.about_me === {} || res?.about_me) &&
    (res?.bio === null || res?.bio) &&
    (res?.cover_image_url === null || res?.cover_image_url) &&
    (res?.donate_url === null || res?.donate_url) &&
    (res?.followers === {} || res?.followers) &&
    (res?.followers_count === 0 || res?.followers_count) &&
    (res?.followings === {} || res?.followings) &&
    (res?.followings_count === 0 || res?.followings) &&
    (res?.full_name === null || res?.full_name) &&
    (res?.image_url === null || res?.image_url) &&
    res?.phone_number &&
    (res?.profile_status === null || res?.profile_status) &&
    (res?.social_link === {} || res?.social_link) &&
    (res?.username === null || res?.username)
  ) {
    if (res.bio === null) {
      res.bio = "";
    }
    if (res.cover_image_url === null) {
      res.cover_image_url = "";
    }
    if (res.donate_url === null) {
      res.donate_url = "";
    }
    if (res.full_name === null) {
      res.full_name = "";
    }
    if (res.image_url === null) {
      res.image_url = "";
    }
    if (res.profile_status === null) {
      res.profile_status = "";
    }

    const data: showProfileOutputs = {
      _key: res._key,
      about_me: res.about_me,
      bio: res.bio,
      cover_image_url: res.cover_image_url,
      donate_url: res.donate_url,
      followers: res.followers,
      followers_count: res.followers_count,
      followings: res.followings,
      followings_count: res.followings_count,
      full_name: res.full_name,
      image_url: res.image_url,
      phone_number: res.phone_number,
      profile_status: res.profile_status,
      social_link: res.social_link,
      username: res.username,
    };
    return {
      msg: "profile data fetched successfuly",
      error: "",
      status: 0,
      success: true,
      data: data,
    };
  }
  const response: translatorResponce = {
    error: "output structure is unknown",
    msg: "unknown error occurred",
    status: 1,
    success: false,
    data: "",
  };
  console.error(response);
  return response;
};

const showMyProfile = async (params: JWTOnly): Promise<translatorResponce> => {
  const resp: any = await serverBaseApi({
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
    url: `/profile`,
  });
  const res = resp.data.data;

  if (res === "Not Found") {
    return {
      error: "Not Found",
      msg: "user not found",
      status: 404,
      success: false,
      data: "",
    };
  } else if (
    !!(
      res?._key &&
      (res?.about_me === {} || res?.about_me) &&
      (res?.bio === null || res?.bio) &&
      (res?.cover_image_url === null || res?.cover_image_url) &&
      (res?.donate_url === null || res?.donate_url === "" || res?.donate_url) &&
      (res?.followers === {} || res?.followers) &&
      (res?.followers_count === 0 || res?.followers_count) &&
      (res?.followings === {} || res?.followings) &&
      (res?.followings_count === 0 || res?.followings) &&
      (res?.full_name === null || res?.full_name) &&
      (res?.image_url === null || res?.image_url) &&
      res?.phone_number &&
      (res?.profile_status === null || res?.profile_status) &&
      (res?.social_link === {} || res?.social_link) &&
      (res?.username === null || res?.username)
    )
  ) {
    if (res.bio === null) {
      res.bio = "";
    }
    if (res.cover_image_url === null) {
      res.cover_image_url = "";
    }
    if (res.donate_url === null) {
      res.donate_url = "";
    }
    if (res.full_name === null) {
      res.full_name = "";
    }
    if (res.image_url === null) {
      res.image_url = "";
    }
    if (res.profile_status === null) {
      res.profile_status = "";
    }

    const data: showMyProfileOutputs = {
      _key: res._key,
      about_me: res.about_me,
      bio: res.bio,
      cover_image_url: res.cover_image_url,
      donate_url: res.donate_url,
      followers: res.followers,
      followers_count: res.followers_count,
      followings: res.followings,
      followings_count: res.followings_count,
      full_name: res.full_name,
      image_url: res.image_url,
      phone_number: res.phone_number,
      profile_status: res.profile_status,
      social_link: res.social_link,
      username: res.username,
    };
    return {
      msg: "profile data fetched successfuly",
      error: "",
      status: 0,
      success: true,
      data: data,
    };
  }
  const response: translatorResponce = {
    error: "output structure is unknown",
    msg: "unknown error occurred",
    status: 1,
    success: false,
    data: "",
  };
  console.error(response);
  return response;
};

const vodIndex = async (params: vodIndexProps) => {
  const resp = await vodBaseApi({
    method: "GET",
    url: `/vods`,
    params: params.queryParams,
  });
  return resp.data;
};
interface showVodProps {
  vod_key: string;
}
const showVod = async (
  params: showVodProps,
  setResponse: (a: object) => void,
  setError: (a: object) => void
) => {
  return vodBaseApi({
    method: "GET",
    url: `/vods/${params.vod_key}`,
  })
    .then((res: object) => {
      setResponse(res);
    })
    .catch((err: object) => {
      setError(err);
    });
};
interface streamIndexProps {
  queryParams: object;
}
const streamIndex = async (
  params: streamIndexProps,
  setResponse: (a: object) => void,
  setError: (a: object) => void
) => {
  return streamBaseApi({
    method: "GET",
    url: `/streams`,
    params: params.queryParams,
  })
    .then((res: object) => {
      setResponse(res);
    })
    .catch((err: object) => {
      setError(err);
    });
};
interface showStreamProps {
  stream_key: string;
}
const showStream = async (
  params: showStreamProps,
  setResponse: (a: object) => void,
  setError: (a: object) => void
) => {
  return streamBaseApi({
    method: "GET",
    url: `/stream/${params.stream_key}`,
  })
    .then((res: object) => {
      setResponse(res);
    })
    .catch((err: object) => {
      setError(err);
    });
};
interface categoryIndexProps {
  queryParams: object;
}
const categoryIndex = async (
  params: categoryIndexProps,
  setResponse: (a: object) => void,
  setError: (a: object) => void
) => {
  return serverBaseApi({
    method: "GET",
    url: `/categories`,
    params: params.queryParams,
  })
    .then((res: object) => {
      setResponse(res);
    })
    .catch((err: object) => {
      setError(err);
    });
};
interface showCategoryProps {
  category_key: string;
}
const showCategory = async (
  params: showCategoryProps,
  setResponse: (a: object) => void,
  setError: (a: object) => void
) => {
  return streamBaseApi({
    method: "GET",
    url: `/categories/${params.category_key}`,
  })
    .then((res: object) => {
      setResponse(res);
    })
    .catch((err: object) => {
      setError(err);
    });
};
interface followUserProps {
  user_key: string;
  jwt_token: string;
}
const followUser = async (params: followUserProps) => {
  const resp: any = serverBaseApi({
    method: "POST",
    url: `/profile/social/follow/${params.user_key}`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
  });
  return resp.data;
};
interface unFollowUserProps {
  user_key: string;
  jwt_token: string;
}
const unFollowUser = async (params: unFollowUserProps) => {
  const resp: any = serverBaseApi({
    method: "POST",
    url: `/profile/social/unfollow/${params.user_key}`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
  });
  return resp.data;
};
interface addOrEditAboutMeProps {
  jwt_token: string;
  data: {
    created_at: string;
    description: string;
    image_url: null;
    link: string;
    title: string;
  };
  id: string;
}
const addOrEditAboutMe = async (params: addOrEditAboutMeProps) => {
  const res: any = await serverBaseApi({
    method: "PUT",
    url: `/profile`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
    data: {
      profile: {
        about_me: {
          [params.id]: params.data,
        },
      },
    },
  });
};
interface uploadImageProps {
  jwt_token: string;
  file: any;
}
const uploadAboutMeImage = async (params: uploadImageProps) => {
  let formData = new FormData();
  formData.append("storage[file]", params.file);
  formData.append("storage[upload_token]", "about_me_pic");
  const res: any = await storageBaseApi({
    method: "POST",
    url: `/upload`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
    data: formData,
  });
  return res.data;
};
interface UpdateProfileParams {
  jwt_token: string;
  data: {
    username?: string;
    full_name?: string;
    bio?: string;
    image_url?: string;
    cover_image_url?: string;
    profile_status?: string;
  };
}

const updateProfile = async (params: UpdateProfileParams) => {
  const res: any = await serverBaseApi({
    method: "PUT",
    url: `/profile`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
    data: {
      profile: params.data,
    },
  });
  return res.data;
};

const uploadProfilePicture = async (params: uploadImageProps) => {
  let formData = new FormData();
  formData.append("storage[file]", params.file);
  formData.append("storage[upload_token]", "profile_picture");
  const res: any = await storageBaseApi({
    method: "POST",
    url: `/upload`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
    data: formData,
  });
  updateProfile({
    jwt_token: params.jwt_token,
    data: { image_url: res.data.url },
  });
  return res.data;
};

const uploadProfileCover = async (params: uploadImageProps) => {
  let formData = new FormData();
  formData.append("storage[file]", params.file);
  formData.append("storage[upload_token]", "profile_cover");
  const res: any = await storageBaseApi({
    method: "POST",
    url: `/upload`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
    data: formData,
  });
  updateProfile({
    jwt_token: params.jwt_token,
    data: { cover_image_url: res.data.url },
  });
  return res.data;
};

const showFollowings = async (params: JWTOnly) => {
  const res: any = await serverBaseApi({
    method: "GET",
    url: `/profile/social/followings/`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
  });

  return res.data;
  // .then((res: object) => {
  //   setResponse(res);
  // })
  // .catch((err: object) => {
  //   setError(err);
  // });
};
interface uploadClipInputs {
  formData: any;
  jwt_token: string;
}
const uploadClip = async (params: uploadClipInputs) => {
  const resp = await vodBaseApi({
    method: "POST",
    url: `/vods`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
    data: params.formData,
  });
  return resp.data;
};
interface showFollowingsIndexProps {
  jwt_token: string;
  queryParams: object;
}
const showFollowingStreams = async (params: showFollowingsIndexProps) => {
  const resp: any = await serverBaseApi({
    method: "GET",
    url: `/profile/social/followings?info=true`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
  });

  const res = resp?.data?.data;
  if (resp?.statusText === "OK") {
    const data = res.map((follower: any, index: number) => {
      if (follower?.streams.length > 0) {
        return {
          name: follower?.streams[0]?.title,
          key: follower?.streams[0]?._key,
          viewerCount: 66768,
          imageUrl: defaultImages.clip,
          streamer: {
            key: follower?.profile_id,
            name: "UserDefault",
            profileImageUrl: "/defaultUserImg.png",
            isOnline: true,
          },
          game: {
            name: "warzone",
            key: "shit",
          },
        };
      }
      return undefined;
    });
    const filteredData = data.filter((obj: any) => {
      if (obj !== undefined) return obj;
    });
    return {
      error: "",
      msg: "Following data fetched successfuly",
      status: 0,
      success: true,
      data: filteredData,
    };
  } else {
    return {
      error: `Error ${resp?.statusText ?? "Unknown"}`,
      msg: "some error",
      status: 404,
      success: false,
      data: "",
    };
  }
};
const showFollowingNewVODs = async (params: showFollowingsIndexProps) => {
  const resp: any = await serverBaseApi({
    method: "GET",
    url: `/profile/social/followings?info=true`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
  });

  const res = resp.data.data;
  if (resp?.statusText === "OK") {
    const data = res.map((follower: any, index: number) => {
      if (follower?.vods.length > 0) {
        return {
          name: follower?.vods[0]?.title,
          key: follower?.vods[0]?._key,
          game: "",
          viewerCount: 10503,
          imageUrl: "/dota2play.png",
          streamer: {
            key: follower?.profile_id,
            name: "UserDefault",
            profileImageUrl: "/defaultUserImg.png",
            isOnline: false,
          },
          date: "2021-12-25T15:34:57",
        };
      }
      return undefined;
    });
    const filteredData = data.filter((obj: any) => {
      if (obj !== undefined) return obj;
    });
    return {
      error: "",
      msg: "Following data fetched successfuly",
      status: 0,
      success: true,
      data: filteredData,
    };
  } else {
    return {
      error: `Error ${resp?.statusText ?? "Unknown"}`,
      msg: "some error",
      status: 404,
      success: false,
      data: "",
    };
  }
};
interface showFollowersProps {
  jwt_token: string;
  queryParams: object;
}
const showFollowers = async (params: showFollowersProps) => {
  return serverBaseApi({
    method: "GET",
    url: `/profile/social/followers`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
  });
  // .then((res: object) => {
  //   setResponse(res);
  // })
  // .catch((err: object) => {
  //   setError(err);
  // });
};
interface createStreamProps {
  jwt_token: string;
}
const createStream = async (params: showFollowersProps) => {
  return serverBaseApi({
    method: "POST",
    url: `/my/stream/init`,
  });
};
interface createProfileProps {
  jwt_token: string;
}
const createProfile = async (params: createProfileProps) => {
  const resp: any = await serverBaseApi({
    method: "POST",
    url: `/profile/init`,
    headers: {
      Authorization: `Bearer ${params.jwt_token}`,
    },
  });
};

export const oldTranslator = async (key: string, params: any) => {
  let response: any;
  let error: any;
  let mutate: any;
  // const setResponse = (val: object) => {
  //   response = val;
  // };
  // const setError = (val: object) => {
  //   error = val;
  // };

  if (key === "fetchOtp") {
    return await fetchOtp(params);
  } else if (key === "signUp") {
    // await signUp(params);
    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: {
        token:
          "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhY2NvdW50cyIsImV4cCI6MTY0MjQ5Nzc3OSwiaWF0IjoxNjQwMDc4NTc5LCJpc3MiOiJhY2NvdW50cyIsImp0aSI6IjVmOTI2Mzc1LWFhNmItNDY1My04ZWQ3LTU5NWE0NWU5YjI0ZiIsIm5iZiI6MTY0MDA3ODU3OCwic3ViIjoiNzczNTcyNiIsInR5cCI6ImFjY2VzcyJ9.q0sRLZXlWxB7Ql1B9AUiyyV3UpR0i7RrPNpn2ukvY-yLIOtxpLPJyyIrJqszWfxtxXMvdElv8OrMDiAuuRCn7g",
        user: {
          _key: "7735726",
          phone_number: "+989122930805",
        },
      },
    };
  } else if (key === "add_or_edit_about_me") {
    await addOrEditAboutMe(params);
  } else if (key === "upload_about_me_image") {
    const res = await uploadAboutMeImage(params);
    return res;
  } else if (key === "upload_profile_picture") {
    const res = await uploadProfilePicture(params);
    return res;
  } else if (key === "upload_profile_cover") {
    const res = await uploadProfileCover(params);
    return res;
  } else if (key === "show_profile") {
    // await showProfile(params);
    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: {
        _key: "7674914",
        about_me: {
          " 27f41ac5-0afd-4187-a027-1efd973a3a29": {
            created_at: "2021-12-23T12:01:47.463Z",
            description: "some data",
            image_url: null,
            link: "https://www.google.com/",
            title: "title",
          },
          "f180b6b7-5118-4032-b943-69d2ae8555bd": {
            created_at: "2021-12-23T12:01:20.874Z",
            description: "this is description",
            image_url: null,
            link: "https://www.google.com/",
            title: "new",
          },
          "f180b6b7-5218-4032-b943-69d2ae8555bd": {
            created_at: "2021-12-23T12:01:20.874Z",
            description: "this is description",
            image_url: null,
            link: "https://www.google.com/",
            title: "new",
          },
          "f180b6b7-5118-4432-b943-69d2ae8555bd": {
            created_at: "2021-12-23T12:01:20.874Z",
            description: "this is description",
            image_url: null,
            link: "https://www.google.com/",
            title: "new",
          },
          "f180b6b7-5118-4052-b943-69d2ae8555bd": {
            created_at: "2021-12-23T12:01:20.874Z",
            description: "this is description",
            image_url: null,
            link: "https://www.google.com/",
            title: "new",
          },
          "f180b6b7-5118-4032-b943-69g2ae8555bd": {
            created_at: "2021-12-23T12:01:20.874Z",
            description: "this is description",
            image_url: null,
            link: "https://www.google.com/",
            title: "new",
          },
          "f180b6b7-5118-4032-b943-6dd2ae8555bd": {
            created_at: "2021-12-23T12:01:20.874Z",
            description: "this is description",
            image_url: null,
            link: "https://www.google.com/",
            title: "new",
          },
          "f180b6b7-5118-4032-b943-6dd2ae8595bd": {
            created_at: "2021-12-23T12:01:20.874Z",
            description: "this is description",
            image_url: null,
            link: "https://www.google.com/",
            title: "new",
          },
          "f180b6b7-5118-4032-b943-6dd2ae8556bd": {
            created_at: "2021-12-23T12:01:20.874Z",
            description: "this is description",
            image_url: null,
            link: "https://www.google.com/",
            title: "new",
          },
          "f180b6b7-5118-4032-b943-6dd2ae8575bd": {
            created_at: "2021-12-23T12:01:20.874Z",
            description: "this is description",
            image_url: null,
            link: "https://www.google.com/",
            title: "new",
          },
        },
        bio: "This is my test bio",
        cover_image_url: null,
        donate_url: "",
        followers: {},
        followers_count: 0,
        followings: {},
        followings_count: 0,
        full_name: "",
        image_url: "",
        phone_number: "+989353806697",
        profile_status: "initial",
        social_link: {},
        username: null,
      },
    };
  } else if (key === "my_profile") {
    const res = await showMyProfile(params);
    return res;
  } else if (key === "vod_index") {
    const res = await vodBaseApi({
      method: "GET",
      url: `/vods`,
      params: params.queryParams,
    });
    return res.data;
    /*    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: [
        {
          _key: "7991244",
          category: {
            _key: "7383207",
            company_name: "Valve Corporation",
            title: "DOTA2",
          },
          cover_image_url: "/106.png",
          creator: {
            _key: "7674914",
            donate_url: "",
            followers_count: 0,
            full_name: "Farhood Hosseinzadeh",
            image_url: null,
            username: null,
          },
          description: "",
          duration: 0,
          file_url:
            "/uploads/users/7674914/video_7991244/RHOrnFjx1VgIzGM910IuNS692NVdQbkWCAFS1XVf1T7hp5DZ08eKi7FBaRe4yrD/a3sBivAJbNroXhUECrghdat00kSoKqyBtLnPgtft5CZi6dM2dTYRq3We0-9YETK.mp4",
          inserted_at: "2021-12-24T20:48:46",
          publish_status: "published",
          title: "dfghjk",
          total_views: 0,
          updated_at: "2021-12-24T20:48:46",
        },
        {
          _key: "7910347",
          category: {
            _key: "7682494",
            company_name: "Electronic Arts",
            title: "FIFA 22",
          },
          cover_image_url: "/106.png",
          creator: {
            _key: "7735726",
            donate_url: null,
            followers_count: null,
            full_name: null,
            image_url: null,
            username: null,
          },
          description: "description",
          duration: 0,
          file_url:
            "/uploads/users/7735726/vod_cover_image_7910347/SusOv0slHud8h318OSoAgb_WO6PvS08nSYN9QmvxjXXDru5Gof1d1We4-KSo7vE/S0FaxeBzxU5NLDbGOrJuZA14wz6hy2__JZmbXZt_hmpOUctpIHa5nbNV_ptC0K8.jpg",
          inserted_at: "2021-12-23T09:01:10",
          publish_status: "published",
          title: "فوتبالیستا",
          total_views: 0,
          updated_at: "2021-12-23T09:01:10",
        },
        {
          _key: "7873734",
          category: {
            _key: "7383207",
            company_name: "Valve Corporation",
            title: "DOTA2",
          },
          cover_image_url: "/106.png",
          creator: {
            _key: "7674914",
            donate_url: "",
            followers_count: 0,
            full_name: "Farhood Hosseinzadeh",
            image_url: null,
            username: null,
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7409356/video_7873734/khLg3eyMIUInAI_rhVlpKhnQIRt8s0Dhor6I0Qo-pYIaVpebqfvcjHYhCDNCm3E/oBfFexMzOcLhm1TnX1-NF1MZONzhgBFq9nalQk4FDGt54e0Rpn9a9U3EE8bRORj.mp4",
          inserted_at: "2021-12-22T16:49:11",
          publish_status: "published",
          title: "dfghjk",
          total_views: 0,
          updated_at: "2021-12-22T16:49:11",
        },
        {
          _key: "7996416",
          category: {
            _key: "7383207",
            company_name: "Valve Corporation",
            title: "DOTA2",
          },
          cover_image_url: "/106.png",
          creator: {
            _key: "7674914",
            donate_url: "",
            followers_count: 0,
            full_name: "Farhood Hosseinzadeh",
            image_url: null,
            username: null,
          },
          description: "",
          duration: 0,
          file_url:
            "/uploads/users/7674914/video_7996416/WSSOgeKBoXiFYXlyQrHvPaOjC8ExuVh7Q7VN3K-3cJwV_eRMPI0CHEUdQNHmQva/Wcdph1LPo8QA_DfA1M2IJ7EOb7Ne10wASBIBk40VEb5SmjQpgRuYl2uM2ZoMALB.mp4",
          inserted_at: "2021-12-24T23:01:51",
          publish_status: "published",
          title: "dfghjk",
          total_views: 0,
          updated_at: "2021-12-24T23:01:51",
        },
        {
          _key: "7868538",
          category: {
            _key: "7383207",
            company_name: "Valve Corporation",
            title: "DOTA2",
          },
          cover_image_url: "/106.png",
          creator: {
            _key: "7674914",
            donate_url: "",
            followers_count: 0,
            full_name: "Farhood Hosseinzadeh",
            image_url: null,
            username: null,
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7409356/vod_cover_image_7868538/Xg6-u7KjmK2wHVXBQDbuHLty361zzD1QUwxQTsUa43FlVgQ0mhGvHOxMR3-5rGG/mrSyXbBcZF3h0d0yexep-TKp2RW2XNSMyjCh-CPgrog3TVs6bAkIlMJludfGVBu.jpg",
          inserted_at: "2021-12-22T14:59:00",
          publish_status: "published",
          title: "ویدئو تست",
          total_views: 0,
          updated_at: "2021-12-22T14:59:00",
        },
        {
          _key: "7910241",
          category: {
            _key: "7682494",
            company_name: "Electronic Arts",
            title: "FIFA 22",
          },
          cover_image_url: "/106.png",
          creator: {
            _key: "7735726",
            donate_url: null,
            followers_count: null,
            full_name: null,
            image_url: null,
            username: null,
          },
          description: "description",
          duration: 0,
          file_url:
            "/uploads/users/7735726/vod_cover_image_7910241/41RvVANrpwQAwMvhIkuDEsrZMf7tYh8toJ-MEwjlB78gxXYqHU6zVN1tH2sHOwK/yQ5cdK20m6476hN72B_iZrDM7c-ksmj8Gudu1ix7rSqu37jz0eV5-PLrX18cWML.jpg",
          inserted_at: "2021-12-23T08:58:35",
          publish_status: "published",
          title: "فوتبالیستا",
          total_views: 0,
          updated_at: "2021-12-23T08:58:35",
        },
        {
          _key: "7910375",
          category: {
            _key: "7383207",
            company_name: "Valve Corporation",
            title: "DOTA2",
          },
          cover_image_url: "/106.png",
          creator: {
            _key: "7674151",
            donate_url: "",
            followers_count: 1,
            full_name: null,
            image_url: null,
            username: null,
          },
          description: "description",
          duration: 0,
          file_url:
            "/uploads/users/7735726/vod_cover_image_7910375/h2Zq4Dmd4xbT8cc3ywYRe9szE6SnMaOpaHizQJSpgz3DRVX_jiDvgHw8wi677Ie/DmYoGi8jRpXGtiGrGO4XtY9aphIbyjeYUuHY2WbWx1c2fgw3jsKGoKnMN_iDutN.jpg",
          inserted_at: "2021-12-23T09:01:47",
          publish_status: "published",
          title: "فوتبالیستا",
          total_views: 0,
          updated_at: "2021-12-23T09:01:47",
        },
        {
          _key: "7996705",
          category: {
            _key: "7383207",
            company_name: "Valve Corporation",
            title: "DOTA2",
          },
          cover_image_url: "/106.png",
          creator: {
            _key: "7674151",
            donate_url: "",
            followers_count: 1,
            full_name: null,
            image_url: null,
            username: null,
          },
          description: "",
          duration: 0,
          file_url:
            "/uploads/users/7409356/video_7996705/pLL76wAkvgDiYWIJp74ARndH_ELXfFQqFcT2helujo6rk2fcvEg99Ey7BCDR6uO/Ye52W8gb0ezXKe2oRkGh-TsaKVHbOSX-97uX1lh2xPhf77FT8IDI86iDLTezliG.mp4",
          inserted_at: "2021-12-24T23:08:42",
          publish_status: "published",
          title: "dfghjk",
          total_views: 0,
          updated_at: "2021-12-24T23:08:42",
        },
        {
          _key: "7996582",
          category: {
            _key: "7383207",
            company_name: "Valve Corporation",
            title: "DOTA2",
          },
          cover_image_url: "/106.png",
          creator: {
            _key: "7674151",
            donate_url: "",
            followers_count: 1,
            full_name: null,
            image_url: null,
            username: null,
          },
          description: "",
          duration: 0,
          file_url:
            "/uploads/users/7409356/video_7996582/pOadLQrYDZISpuqzhC7wUOFemX5QuIgN7_HB-yabYJbyeTAX44cgaSqHL9ZIctt/s9Cbm5onMxkQDQQ9bvNNvFF1PiQitChqeCqAbaCX75r8cf4dvJRS_K8wft0oNfE.mp4",
          inserted_at: "2021-12-24T23:05:52",
          publish_status: "published",
          title: "dfghjk",
          total_views: 0,
          updated_at: "2021-12-24T23:05:52",
        },
        {
          _key: "8003408",
          category: {
            _key: "7383207",
            company_name: "Valve Corporation",
            title: "DOTA2",
          },
          cover_image_url: "/106.png",
          creator: {
            _key: "7674914",
            donate_url: "",
            followers_count: 0,
            full_name: "Farhood Hosseinzadeh",
            image_url: null,
            username: null,
          },
          description: "",
          duration: 0,
          file_url:
            "/uploads/users/7409356/video_8003408/_97QncJOl7GXllMkgakDxViJteynFzn7IK3gH4Gl0xkiqEqe-bSrIJXQxbUPI0B/_8AAWffctfVymtqWhI2pNpJc40a_SiPz9gWDQ2z4bAJfu8b1owE4sNqB11V9RCR.mp4",
          inserted_at: "2021-12-25T01:53:23",
          publish_status: "published",
          title: "my vod",
          total_views: 0,
          updated_at: "2021-12-25T01:53:23",
        },
      ],
    }; */
  } else if (key === "stream_index") {
    /*  const res = await streamBaseApi({
      method: "GET",
      url: `/streams`,
      params: params.queryParams,
    });
    return res.data; */
    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: [
        {
          _key: "7872174",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url:
            "/uploads/users/7674914/stream_cover_image_7872174/LmRK_cJ0cPpkCWaDHhRvHMl8i5njsnGVPdpKm3ZJeElclazzrPCnq4VUWnvwLl_/HWObeV8OafgnA_ztzA-yAuM_1aD6KcRBgn8oKUSnxotOCOro207RbtCprmBf-YM.png",
          description: null,
          duration: 0,
          end_at: null,
          inserted_at: "2021-12-22T16:17:22",
          live_views: 0,
          start_at: null,
          stream_status: "live",
          streamer: {
            _key: "7674151",
            donate_url: "",
            followers_count: 1,
            full_name: null,
            image_url: null,
            username: null,
          },
          title: "first stream",
          total_views: 0,
          updated_at: "2021-12-22T16:17:22",
          watch_url: null,
        },
        {
          _key: "8041213",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url:
            "/uploads/users/8041144/stream_cover_image_8041213/0vf0mL_7PtsPJyjVLYmnaw6huSbQ5J_MbALkiby9V2WyJyFY7zVyesPRfPTnGoP/daxAMNs5omt_U80YRZ2XcnWpUWuiSsAgiwcpDkLDE4JO54S2nSUThvfixWnCRT0.png",
          description: null,
          duration: 0,
          end_at: null,
          inserted_at: "2021-12-25T15:29:29",
          live_views: 0,
          start_at: null,
          stream_status: "live",
          streamer: {
            _key: "8041144",
            donate_url: "",
            followers_count: 0,
            full_name: null,
            image_url: null,
            username: null,
          },
          title: "hosnaaa",
          total_views: 0,
          updated_at: "2021-12-25T15:29:29",
          watch_url: null,
        },
        {
          _key: "7674914",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url: null,
          description: null,
          duration: 0,
          end_at: null,
          inserted_at: "2022-01-01T13:58:27",
          live_views: 0,
          start_at: null,
          stream_status: "live",
          streamer: {
            _key: "7674914",
            donate_url: "shit",
            followers_count: 0,
            full_name: "Farhood Hosseinzadeh",
            image_url: null,
            username: "FarhoodHs",
          },
          title: "second stream",
          total_views: 0,
          updated_at: "2022-01-01T13:58:27",
          watch_url: "http://194.59.171.44:8080/live/7674914.m3u8",
        },
      ],
    };
  } else if (key === "showVod") {
    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: {
        _key: "8003408",
        category: {
          _key: "7383207",
          company_name: "Valve Corporation",
          title: "DOTA2",
        },
        cover_image_url: "/106.jpg",
        creator: {
          _key: "7674914",
          donate_url: "",
          followers_count: 0,
          full_name: "Farhood Hosseinzadeh",
          username: null,
          image_url: null,
        },
        description: "",
        duration: 0,
        file_url: "/gametr.mp4",
        inserted_at: "2021-12-25T01:53:23",
        publish_status: "published",
        title: "my vod",
        total_views: 0,
        updated_at: "2021-12-25T01:53:23",
      },
    };
  } else if (key === "categoryIndex") {
    const res = await serverBaseApi({
      method: "GET",
      url: `/categories`,
      params: params.queryParams,
    });
    return res.data;
    /*   return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: [
        {
          _key: "7383207",
          company_name: null,
          image_url: "/Dota-2.jpg",
          live_views: 0,
          metadata: {},
          streams_count: 0,
          streams_id: [],
          tags: [],
          title: "DOTA2",
          total_views: 0,
          type: "game",
          videos_count: 0,
          videos_id: [],
        },
        {
          _key: "7682450",
          company_name: null,
          image_url: "/apex.jpg",
          live_views: 0,
          metadata: {},
          streams_count: 0,
          streams_id: [],
          tags: [],
          title: "Apex Legends",
          total_views: 0,
          type: "game",
          videos_count: 0,
          videos_id: [],
        },
        {
          _key: "7682494",
          company_name: null,
          cover_url: null,
          image_url: null,
          live_views: 0,
          metadata: {},
          streams_count: 0,
          streams_id: [],
          tags: [],
          title: "FIFA 22",
          total_views: 0,
          type: "game",
          videos_count: 0,
          videos_id: [],
        },
        {
          _key: "7682526",
          company_name: null,
          image_url: "/cs.jpg",
          live_views: 0,
          metadata: {},
          streams_count: 0,
          streams_id: [],
          tags: [],
          title: "Counter-Strike",
          total_views: 0,
          type: "game",
          videos_count: 0,
          videos_id: [],
        },
        {
          _key: "7682556",
          company_name: null,
          image_url: "/lol.jpg",
          live_views: 0,
          metadata: {},
          streams_count: 0,
          streams_id: [],
          tags: [],
          title: "LOL",
          total_views: 0,
          type: "game",
          videos_count: 0,
          videos_id: [],
        },
        {
          _key: "7682576",
          company_name: null,
          image_url: "/fortnite.jpg",
          live_views: 0,
          metadata: {},
          streams_count: 0,
          streams_id: [],
          tags: [],
          title: "Fortnite",
          total_views: 0,
          type: "game",
          videos_count: 0,
          videos_id: [],
        },
        {
          _key: "7682590",
          company_name: null,
          image_url: "/wow.jpg",
          live_views: 0,
          metadata: {},
          streams_count: 0,
          streams_id: [],
          tags: [],
          title: "WoW",
          total_views: 0,
          type: "game",
          videos_count: 0,
          videos_id: [],
        },
        {
          _key: "7682612",
          company_name: null,
          image_url: "/battlefield.jpg",
          live_views: 0,
          metadata: {},
          streams_count: 0,
          streams_id: [],
          tags: [],
          title: "Battlefield",
          total_views: 0,
          type: "game",
          videos_count: 0,
          videos_id: [],
        },
        {
          _key: "7682646",
          company_name: null,
          image_url: "/darksouls.jpg",
          live_views: 0,
          metadata: {},
          streams_count: 0,
          streams_id: [],
          tags: [],
          title: "Dark Souls",
          total_views: 0,
          type: "game",
          videos_count: 0,
          videos_id: [],
        },
        {
          _key: "7682684",
          company_name: null,
          image_url: "/r6s.jpg",
          live_views: 0,
          metadata: {},
          streams_count: 0,
          streams_id: [],
          tags: [],
          title: "r6s",
          total_views: 0,
          type: "game",
          videos_count: 0,
          videos_id: [],
        },
        // {
        //   _key: "7682450",
        //   company_name: null,
        //   cover_url: "https://s21.picofile.com/file/8445176334/992724_1.png",
        //   image_url: "https://s20.picofile.com/file/8445176250/Image_Shape.png",
        //   live_views: 0,
        //   metadata: {},
        //   streams_count: 0,
        //   streams_id: [],
        //   tags: [],
        //   title: "Apex Legends",
        //   total_views: 0,
        //   type: "game",
        //   videos_count: 0,
        //   videos_id: [],
        // },
      ],
    }; */
  } else if (key === "showCategory") {
    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: {
        _key: "7682450",
        company_name: "Electronic Arts",
        cover_url: null,
        image_url: null,
        live_views: 0,
        metadata: {},
        streams_count: 0,
        streams_id: [],
        tags: ["Actions", "FPS"],
        title: "Apex Legends",
        total_views: 0,
        type: "game",
        videos_count: 0,
        videos_id: [],
      },
    };
  } else if (key === "showFollowings") {
    const res: any = await serverBaseApi({
      method: "GET",
      url: `/profile/social/followings/`,
      headers: {
        Authorization: `Bearer ${params.jwt_token}`,
      },
    });
    return res.data;
    // showFollowings(params);
    // return {
    //   error: "",
    //   msg: "singup otp code sent",
    //   status: 0,
    //   success: true,
    //   data: [
    //     {
    //       _key: "7674914",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674914": true,
    //       },
    //       followings_count: 0,
    //       full_name: "Farhood",
    //       image_url: "",
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674915",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674151",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: "ali",
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674917",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": true,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "8041144",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674915",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674915",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674915",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674914",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674914": true,
    //       },
    //       followings_count: 0,
    //       full_name: "Farhood",
    //       image_url: "",
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674915",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674916",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: "ali",
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674917",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": true,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674918",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674915",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674915",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //     {
    //       _key: "7674915",
    //       about_me: {},
    //       bio: null,
    //       cover_image_url: null,
    //       donate_url: "",
    //       followers: {
    //         "7676946": true,
    //       },
    //       followers_count: 1,
    //       followings: {
    //         "7674918": false,
    //       },
    //       followings_count: 2,
    //       full_name: null,
    //       image_url: null,
    //       phone_number: "+989129217404",
    //       profile_status: null,
    //       social_link: {},
    //       username: null,
    //     },
    //   ],
    // };
  } else if (key === "followUser") {
    const res = await followUser(params);
    return res;
    /*    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: "",
    }; */
  } else if (key === "unFollowUser") {
    const res = await unFollowUser(params);
    return res;
    /*   return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: "",
    }; */
  } else if (key === "createVod") {
    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: {
        _key: "7775508",
        category_id: null,
        category_name: "DOTA 2",
        cover_image_url:
          "/uploads/users/7676946/vod_cover_image_7775508/PhkX9PM9sIkDEMhvfxS5PHj7d7Khmpjz8jdpJo37CNbOHcPX4kcjgD6boyJf2qr/JbtDlIH2evf3Bx29CffQyyk1WWX9UoUYktxSwXaONFwIyan102S2N3FAFdM3mHn.png",
        creator: null,
        description: "some description",
        duration: 0,
        file_url:
          "/uploads/users/7676946/vod_cover_image_7775508/UViY1fhXlPmhebhiB1tWScLoObbUcWFTOrYR7k3-a9fJHdF0RJJdTfVx3Nt-lzG/Mzf1eh-VgQtn9Xb_DFUak4FADYgyTe1Zl-SuSESOqAlT3AW30dnU_o85vz00dPa.png",
        inserted_at: "2021-12-21T05:22:24",
        publish_status: "published",
        title: "react js",
        total_views: 0,
        updated_at: "2021-12-21T05:22:24",
      },
    };
  } else if (key === "updateProfile") {
    const res: any = await serverBaseApi({
      method: "PUT",
      url: `/profile`,
      headers: {
        Authorization: `Bearer ${params.jwt_token}`,
      },
      data: {
        profile: params.data,
      },
    });
    return res.data;
    // const res = await serverBaseApi({
    //   method: "GET",
    //   url: `/profiles`,
    //   params: params.queryParams,
    // });
    // return res.data;
    // return {
    //   error: "",
    //   msg: "singup otp code sent",
    //   status: 0,
    //   success: true,
    //   data: {
    //     _key: "7676946",
    //     about_me: {},
    //     bio: "This is me",
    //     cover_image_url: "some-url-to-cover",
    //     donate_url: "",
    //     followers: {},
    //     followers_count: 0,
    //     followings: {},
    //     followings_count: 0,
    //     full_name: "Farhood Hosseinzadeh",
    //     image_url: "some-url-to-image",
    //     phone_number: "+989398861398",
    //     profile_status: "Tired...!",
    //     social_link: {},
    //     username: "zahra",
    //   },
    // };
  } else if (key === "uploadClip") {
    const res = await uploadClip(params);
    return res;
  } else if (key === "showFollowingStreams") {
    // return await showFollowingStreams(params);
    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: [
        {
          _key: "7680429",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url: null,
          streamer: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: "Mahdi",
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7680429/8aeFgJzfexi-emzoa9upMjqML3qX5ZwNaMmQmCJjwJTgIw-KZo81NgYclf5_tuR/JCz-OG-nGP8UG1ClWzHO3A6ALqVh9JuB5V64sNtBHqSsiIzxyfaOATKUQWMOGpe.png",
          inserted_at: "2021-12-19T11:22:48",
          publish_status: "published",
          title: "my clip",
          total_views: 0,
          live_views: 0,
          updated_at: "2021-12-19T11:22:48",
        },
        {
          _key: "7680429",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url: null,
          streamer: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: "Mahdi",
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7680429/8aeFgJzfexi-emzoa9upMjqML3qX5ZwNaMmQmCJjwJTgIw-KZo81NgYclf5_tuR/JCz-OG-nGP8UG1ClWzHO3A6ALqVh9JuB5V64sNtBHqSsiIzxyfaOATKUQWMOGpe.png",
          inserted_at: "2021-12-19T11:22:48",
          publish_status: "published",
          title: "my clip",
          total_views: 0,
          live_views: 0,
          updated_at: "2021-12-19T11:22:48",
        },
        {
          _key: "7680429",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url: null,
          streamer: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: "Mahdi",
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7680429/8aeFgJzfexi-emzoa9upMjqML3qX5ZwNaMmQmCJjwJTgIw-KZo81NgYclf5_tuR/JCz-OG-nGP8UG1ClWzHO3A6ALqVh9JuB5V64sNtBHqSsiIzxyfaOATKUQWMOGpe.png",
          inserted_at: "2021-12-19T11:22:48",
          publish_status: "published",
          title: "my clip",
          total_views: 0,
          live_views: 0,
          updated_at: "2021-12-19T11:22:48",
        },
        {
          _key: "7680429",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url: null,
          streamer: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: "Mahdi",
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7680429/8aeFgJzfexi-emzoa9upMjqML3qX5ZwNaMmQmCJjwJTgIw-KZo81NgYclf5_tuR/JCz-OG-nGP8UG1ClWzHO3A6ALqVh9JuB5V64sNtBHqSsiIzxyfaOATKUQWMOGpe.png",
          inserted_at: "2021-12-19T11:22:48",
          publish_status: "published",
          title: "my clip",
          total_views: 0,
          live_views: 0,
          updated_at: "2021-12-19T11:22:48",
        },
        {
          _key: "7680429",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url: null,
          streamer: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: "Mahdi",
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7680429/8aeFgJzfexi-emzoa9upMjqML3qX5ZwNaMmQmCJjwJTgIw-KZo81NgYclf5_tuR/JCz-OG-nGP8UG1ClWzHO3A6ALqVh9JuB5V64sNtBHqSsiIzxyfaOATKUQWMOGpe.png",
          inserted_at: "2021-12-19T11:22:48",
          publish_status: "published",
          title: "my clip",
          total_views: 0,
          live_views: 0,
          updated_at: "2021-12-19T11:22:48",
        },
        {
          _key: "7680429",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url: null,
          streamer: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: "Mahdi",
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7680429/8aeFgJzfexi-emzoa9upMjqML3qX5ZwNaMmQmCJjwJTgIw-KZo81NgYclf5_tuR/JCz-OG-nGP8UG1ClWzHO3A6ALqVh9JuB5V64sNtBHqSsiIzxyfaOATKUQWMOGpe.png",
          inserted_at: "2021-12-19T11:22:48",
          publish_status: "published",
          title: "my clip",
          total_views: 0,
          live_views: 0,
          updated_at: "2021-12-19T11:22:48",
        },
        {
          _key: "7680429",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url: null,
          streamer: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: "Mahdi",
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7680429/8aeFgJzfexi-emzoa9upMjqML3qX5ZwNaMmQmCJjwJTgIw-KZo81NgYclf5_tuR/JCz-OG-nGP8UG1ClWzHO3A6ALqVh9JuB5V64sNtBHqSsiIzxyfaOATKUQWMOGpe.png",
          inserted_at: "2021-12-19T11:22:48",
          publish_status: "published",
          title: "my clip",
          total_views: 0,
          live_views: 0,
          updated_at: "2021-12-19T11:22:48",
        },
      ],
    };
  } else if (key === "showFollowingNewVODs") {
    // return await showFollowingNewVODs(params);
    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: [
        {
          _key: "7680429",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url: null,
          creator: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: null,
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7680429/8aeFgJzfexi-emzoa9upMjqML3qX5ZwNaMmQmCJjwJTgIw-KZo81NgYclf5_tuR/JCz-OG-nGP8UG1ClWzHO3A6ALqVh9JuB5V64sNtBHqSsiIzxyfaOATKUQWMOGpe.png",
          inserted_at: "2021-12-19T11:22:48",
          publish_status: "published",
          title: "my clip",
          total_views: 0,
          updated_at: "2021-12-19T11:22:48",
        },
        {
          _key: "7680429",
          category: {
            _key: "7682450",
            metadata: {
              company_name: "Electronic Arts",
              release_year: 2005,
            },
            title: "Apex Legends",
          },
          cover_image_url: null,
          creator: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: null,
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7680429/8aeFgJzfexi-emzoa9upMjqML3qX5ZwNaMmQmCJjwJTgIw-KZo81NgYclf5_tuR/JCz-OG-nGP8UG1ClWzHO3A6ALqVh9JuB5V64sNtBHqSsiIzxyfaOATKUQWMOGpe.png",
          inserted_at: "2021-12-19T11:22:48",
          publish_status: "published",
          title: "my clip",
          total_views: 0,
          updated_at: "2021-12-19T11:22:48",
        },
      ],
    };
  } else if (key === "createProfile") {
    return {
      error: "",
      msg: "singup otp code sent",
      status: 200,
      success: true,
    };
  } else if (key === "showFollowingNewVODs") {
    //return await showFollowingNewVODs(params);

    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: [
        {
          _key: "7680429",
          category_id: "7383207",
          category_name: "DOTA2",
          cover_image_url:
            "/uploads/users/7409356/vod_cover_image_7868538/DT4k1Ba-BiENp0HREuMq2sj16Lian63z41sY4OPs9UTlmMPXUikM-PYvtDxNn2k/PkGMrjFBDK-eaSxHIR8D7aFwfp36eqsDFqCynRPoy4Vk5LxeB436OCYqXpnivAD.jpg",
          creator: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: null,
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7680429/8aeFgJzfexi-emzoa9upMjqML3qX5ZwNaMmQmCJjwJTgIw-KZo81NgYclf5_tuR/JCz-OG-nGP8UG1ClWzHO3A6ALqVh9JuB5V64sNtBHqSsiIzxyfaOATKUQWMOGpe.png",
          inserted_at: "2021-12-19T11:22:48",
          publish_status: "published",
          title: "my clip",
          total_views: 0,
          updated_at: "2021-12-19T11:22:48",
        },
        {
          _key: "7775508",
          category_id: "7383207",
          category_name: "DOTA2",
          cover_image_url:
            "/uploads/users/7676946/vod_cover_image_7775508/PhkX9PM9sIkDEMhvfxS5PHj7d7Khmpjz8jdpJo37CNbOHcPX4kcjgD6boyJf2qr/JbtDlIH2evf3Bx29CffQyyk1WWX9UoUYktxSwXaONFwIyan102S2N3FAFdM3mHn.png",
          creator: {
            _key: "7676946",
            donate_url: null,
            followers_count: null,
            image_url: null,
            username: null,
          },
          description: "some description",
          duration: 0,
          file_url:
            "/uploads/users/7676946/vod_cover_image_7775508/UViY1fhXlPmhebhiB1tWScLoObbUcWFTOrYR7k3-a9fJHdF0RJJdTfVx3Nt-lzG/Mzf1eh-VgQtn9Xb_DFUak4FADYgyTe1Zl-SuSESOqAlT3AW30dnU_o85vz00dPa.png",
          inserted_at: "2021-12-21T05:22:24",
          publish_status: "published",
          title: "ارانگل با بچه ها",
          total_views: 0,
          updated_at: "2021-12-21T05:22:24",
        },
      ],
    };
  } else if (key === "profiles") {
    //get all users  and search
    const res = await serverBaseApi({
      method: "GET",
      url: `/profiles`,
      params: params.queryParams,
    });
    return res.data;
  } else if (key === "showFollowers") {
    return {
      error: "",
      msg: "singup otp code sent",
      status: 0,
      success: true,
      data: [
        {
          _key: "8578432",
          followers_count: 0,
          image_url: null,
          username: null,
        },
      ],
    };
  } else if (key === "stream_init") {
    const res = await streamBaseApi({
      method: "GET",
      url: `/my/stream/server`,
      headers: {
        Authorization: `Bearer ${params.jwt_token}`,
      },
    });
    return res.data;
  } else if (key === "streamSetting") {
    const res = await streamBaseApi({
      method: "GET",
      url: `/my/stream`,
      headers: {
        Authorization: `Bearer ${params.jwt_token}`,
      },
    });
    return res.data;
  } else if (key === "create_stream") {
    const res = await streamBaseApi({
      method: "POST",
      url: `/my/stream/init`,
      headers: {
        Authorization: `Bearer ${params.jwt_token}`,
      },
    });
    return res;
  } else if (key === "update_stream") {
    const res = await streamBaseApi({
      method: "PUT",
      url: `/my/stream`,
      headers: {
        Authorization: `Bearer ${params.jwt_token}`,
      },
      data: {
        stream: {
          title: params.title,
          category_id: params.category_id,
        },
      },
    });
    return res;
  }
};
