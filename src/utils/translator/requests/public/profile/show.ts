import { serverBaseApi } from "api";
import {
  ShowProfileInputs,
  ShowProfileOutputs,
  JWTOnly,
} from "utils/translator/interfaces";

import { translateSchema, Schema } from "utils/translator/schema";
import {
  createResponce,
  TranslatorResponce,
  outputStructureUnknown,
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
      ifNullReplaceWith: [],
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
    };
    return createResponce(0, "profile data fetched successfuly", "", data);
  }
  return outputStructureUnknown(errors);
};
export const showProfile = async (
  params: ShowProfileInputs
): Promise<TranslatorResponce> => {
  const resp: any = await serverBaseApi({
    method: "GET",
    url: `/profile/${params.user_key}`,
  });
  return processShowProfileResponce(resp);
};
