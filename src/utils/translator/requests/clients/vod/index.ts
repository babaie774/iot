import { vodBaseApi } from "api";
import { VodIndexInputs, Vod, JWTOnly } from "utils/translator/interfaces";

import { translateSchema, Schema } from "utils/translator/schema";
import {
  createResponce,
  TranslatorResponce,
  outputStructureUnknown,
  queryBuilder,
} from "utils/translator/requests";

const vodData: Schema = {
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
      title: {
        type: "string",
        canNull: true,
        ifNullReplaceWith: "",
      },
      duration: {
        type: "string",
        canNull: true,
        ifNullReplaceWith: 0,
      },
      inserted_at: {
        type: "navedatetime",
        canNull: false,
      },
      total_views: {
        type: "number",
        canNull: true,
        ifNullReplaceWith: 0,
      },
      category: {
        type: "map",
        innerDataType: {
          _key: {
            type: "string",
            canNull: false,
          },
          metadata: {
            type: "map",
            innerDataType: {
              company_name: {
                type: "string",
                canNull: true,
                ifNullReplaceWith: "",
              },
              release_year: {
                type: "number",
                canNull: true,
                ifNullReplaceWith: 0,
              },
            },
          },
          title: {
            type: "string",
            canNull: true,
            ifNullReplaceWith: "",
          },
        },
      },
      cover_image_url: {
        type: "string",
        canNull: true,
        ifNullReplaceWith: "",
      },
      creator: {
        type: "map",
        innerDataType: {
          _key: {
            type: "string",
            canNull: false,
          },
          donate_url: {
            type: "string",
            canNull: true,
            ifNullReplaceWith: "",
          },
          followers_count: {
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
            ifNullReplaceWith: "",
          },
          username: {
            type: "string",
            canNull: true,
            ifNullReplaceWith: "",
          },
        },
      },
    },
  },
};

export const showFollowsVods = async (params: {
  token: JWTOnly;
}): Promise<TranslatorResponce> => {
  const resp: any = await vodBaseApi({
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    url: `/vods/my/followings`,
  });

  // vodData

  const { valid, outData, errors } = translateSchema(resp, resp.data, vodData);
  if (valid) {
    const data: Vod[] = outData.map((res: any) => {
      return {
        _key: res._key,
        title: res.title,
        description: res.description,
        inserted_at: res.inserted_at,
        total_views: res.total_views,
        category: {
          _key: res.category._key,
          metadata: {
            company_name: res.category.metadata.company_name,
            release_year: res.category.metadata.release_year,
          },
          title: res.category.title,
        },
        cover_image_url: res.cover_image_url,
        duration: res.duration,
        creator: {
          _key: res.creator._key,
          donate_url: res.creator.donate_url,
          followers_count: res.creator.followers_count,
          full_name: res.creator.full_name,
          image_url: res.creator.image_url,
          username: res.creator.username,
        },
      };
    });
    return createResponce(0, "vod data fetched successfuly", "", data);
  }
  return outputStructureUnknown(errors);
};
