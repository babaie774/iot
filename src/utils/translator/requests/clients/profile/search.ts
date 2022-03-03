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
  queryBuilder,
} from "utils/translator/requests";

const searchProfileData: Schema = {
  type: "list",
  canNull: true,
  ifNullReplaceWith: [],
  innerListType: {
    type: "map",
    innerDataType: {
      _key: {
        type: "string",
        canNull: false,
      },
      followers_count: {
        type: "number",
        canNull: true,
        ifNullReplaceWith: 0, //TODO default image url
      },
      image_url: {
        type: "string",
        canNull: true,
        ifNullReplaceWith: "", //TODO default image url
      },
      username: {
        type: "string",
        canNull: true,
        ifNullReplaceWith: "",
      },
    },
  },
};

const processShowProfileResponce = (resp: any): TranslatorResponce => {
  const { valid, outData, errors } = translateSchema(
    resp,
    resp.data,
    searchProfileData
  );
  if (valid) {
    const data: ShowProfileOutputs[] = outData.map((res: any) => {
      return {
        _key: res._key,
        followers_count: res.followers_count,
        image_url: res.image_url,
        username: res.username,
      };
    });
    return createResponce(0, "profile data fetched successfuly", "", data);
  }
  return outputStructureUnknown(errors);
};
export const followings = async (params: {
  token: JWTOnly;
  queryParams: any;
}): Promise<TranslatorResponce> => {
  const resp: any = await serverBaseApi({
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    url: `/profile/my/social/followings${queryBuilder(
      params.queryParams || {},
      true
    )}`,
  });
  return processShowProfileResponce(resp);
};

export const followers = async (params: {
  token: JWTOnly;
  queryParams: any;
}): Promise<TranslatorResponce> => {
  const resp: any = await serverBaseApi({
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    url: `/profile/my/social/followers${queryBuilder(
      params.queryParams,
      true
    )}`,
  });
  return processShowProfileResponce(resp);
};
