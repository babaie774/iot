import { serverBaseApi } from "api";
import {
  ShowProfileOutputs,
  JWTOnly,
  UpdateProfileInputs,
  ProfileAboutMe,
} from "utils/translator/interfaces";

import { translateSchema, Schema } from "utils/translator/schema";
import {
  createResponce,
  TranslatorResponce,
  outputStructureUnknown,
  status,
} from "utils/translator/requests";

const profileData: Schema = {
  type: "map",
  innerDataType: {
    _key: {
      type: "string",
      canNull: false,
    },
    about_me: {
      type: "list",
      innerListType: {
        type: "map",
        canNull: false,
        innerDataType: {
          _key: {
            type: "string",
            canNull: false,
          },
          created_at: {
            type: "datetime",
            canNull: false,
          },
          description: {
            type: "string",
            canNull: true,
            ifNullReplaceWith: "",
          },
          image_url: {
            type: "string",
            canNull: true,
            ifNullReplaceWith: "",
          },
          link: {
            type: "string",
            canNull: true,
            ifNullReplaceWith: "",
          },
          title: {
            type: "string",
            canNull: true,
            ifNullReplaceWith: "",
          },
        },
      },
      translateFunction: (_res: any, data: { [key: string]: any }) => {
        const ks = Object.keys(data);
        return ks.map((k: string) => {
          return {
            _key: k,
            ...data[k],
          };
        });
      },
      canNull: true,
      ifNullReplaceWith: [],
    },
    bio: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    cover_image_url: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "", //TODO default image url
    },
    donate_url: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "", //TODO default image url
    },
    followers: {
      type: "list",
      innerListType: {
        type: "string",
        canNull: false,
      },
      translateFunction: (_res: any, data: { [key: string]: boolean }) => {
        return Object.keys(data);
      },
      canNull: true,
      ifNullReplaceWith: [], //TODO default image url
    },
    followers_count: {
      type: "number",
      canNull: true,
      ifNullReplaceWith: 0, //TODO default image url
    },
    followings: {
      type: "list",
      innerListType: {
        type: "string",
        canNull: false,
      },
      translateFunction: (_res: any, data: { [key: string]: boolean }) => {
        return Object.keys(data);
      },
      canNull: true,
      ifNullReplaceWith: [],
    },
    followings_count: {
      type: "number",
      canNull: true,
      ifNullReplaceWith: 0,
    },
    full_name: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    image_url: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "", //TODO default image url
    },
    profile_status: {
      type: "string",
      // type: "enum"
      // acceptValues: ["updated"],
      canNull: false,
    },
    social_link: {
      type: "list",
      canNull: true,
      ifNullReplaceWith: [],
      innerListType: {
        type: "string",
      },
      translateFunction: (_res: any, _data: any) => {
        // ignore social links
        return [];
      },
    },
    username: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    phone_number: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    vods_count: {
      type: "map",
      innerDataType: {
        pending: {
          type: "number",
          canNull: true,
          ifNullReplaceWith: 0,
        },
        failed: {
          type: "number",
          canNull: true,
          ifNullReplaceWith: 0,
        },
        published: {
          type: "number",
          canNull: true,
          ifNullReplaceWith: 0,
        },
      },
    },
  },
};

const processShowProfileResponce = (resp: any): TranslatorResponce => {
  const { valid, outData, errors } = translateSchema(
    resp,
    resp.data,
    profileData
  );
  if (valid) {
    const res = outData;
    const data: ShowProfileOutputs = {
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
      vods_count: res.vods_count,
    };
    return createResponce(0, "profile data fetched successfuly", "", data);
  }
  return outputStructureUnknown(errors);
};
export const showMyProfile = async (params: {
  token: JWTOnly;
}): Promise<TranslatorResponce> => {
  const resp: any = await serverBaseApi({
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    url: `/profile/my`,
  });

  return processShowProfileResponce(resp);
};

export const updateMyProfile = async (params: {
  profile: UpdateProfileInputs;
  token: JWTOnly;
}): Promise<TranslatorResponce> => {
  const body: any = { ...params.profile };
  if (Array.isArray(body.about_me)) {
    const about_me_list = [...body.about_me];
    body.about_me = {};
    about_me_list.map((item) => {
      const new_item = { ...item };
      const key = new_item._key;
      delete new_item._key;
      if (new_item.remove === true) {
        body.about_me[key] = null;
      } else {
        body.about_me[key] = new_item;
      }
    });
  }

  const resp: any = await serverBaseApi({
    method: "PUT",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    data: { profile: body },
    url: `/profile/my`,
  });

  return processShowProfileResponce(resp);
};

export const fallowProfile = async (params: {
  profile_id: string;
  token: JWTOnly;
}): Promise<TranslatorResponce> => {
  const resp: any = await serverBaseApi({
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    url: `/profile/social/follow/${params.profile_id}`,
  });

  if (resp.data === "Created") {
    return {
      error: "",
      msg: "fallowed successfuly",
      statusType: status[0],
      status: 0,
      success: true,
      data: "",
    };
  }
  return outputStructureUnknown([]);
};

export const unFallowProfile = async (params: {
  profile_id: string;
  token: JWTOnly;
}): Promise<TranslatorResponce> => {
  const resp: any = await serverBaseApi({
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    url: `/profile/social/unfollow/${params.profile_id}`,
  });

  if (resp.data === "Created") {
    return {
      error: "",
      msg: "unfallowed successfuly",
      statusType: status[0],
      status: 0,
      success: true,
      data: "",
    };
  }
  return outputStructureUnknown([]);
};

export const createProfile = async (params: {
  token: JWTOnly;
}): Promise<TranslatorResponce> => {
  const resp: any = await serverBaseApi({
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    url: `/profile/init`,
  });
  try {
    if (resp.data === "Created" || resp.data === "created") {
      return {
        error: "",
        msg: "create successfuly",
        statusType: status[0],
        status: 0,
        success: true,
        data: "",
      };
    }
    return outputStructureUnknown([]);
  } catch (error: any) {
    if (error.response.status === 409) {
      return {
        error: "",
        msg: "create successfuly",
        statusType: status[0],
        status: 0,
        success: true,
        data: "",
      };
    }

    throw error;
  }
};
