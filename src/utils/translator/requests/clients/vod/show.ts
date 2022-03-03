import { vodBaseApi } from "api";
import {
  SingleVod,
  JWTOnly,
  UploadVodInputs,
  setProgress,
} from "utils/translator/interfaces";

import { translateSchema, Schema } from "utils/translator/schema";
import {
  createResponce,
  TranslatorResponce,
  outputStructureUnknown,
} from "utils/translator/requests";

const vodData: Schema = {
  type: "map",
  innerDataType: {
    _key: {
      type: "string",
      canNull: false,
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
    // creator: {
    //   type: "map",
    //   innerDataType: {
    //     _key: {
    //       type: "string",
    //       canNull: false,
    //     },
    //     donate_url: {
    //       type: "string",
    //       canNull: true,
    //       ifNullReplaceWith: "",
    //     },
    //     followers_count: {
    //       type: "number",
    //       canNull: true,
    //       ifNullReplaceWith: 0,
    //     },
    //     full_name: {
    //       type: "string",
    //       canNull: true,
    //       ifNullReplaceWith: "",
    //     },
    //     image_url: {
    //       type: "string",
    //       canNull: true,
    //       ifNullReplaceWith: "",
    //     },
    //     username: {
    //       type: "string",
    //       canNull: true,
    //       ifNullReplaceWith: "",
    //     },
    //   },
    // },
    duration: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: 0,
    },
    description: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    file_url: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    title: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    publish_status: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    total_views: {
      type: "number",
      canNull: true,
      ifNullReplaceWith: 0,
    },
    inserted_at: {
      type: "navedatetime",
      canNull: false,
    },
    updated_at: {
      type: "navedatetime",
      canNull: false,
    },
  },
};

export const uploadVod = async (params: {
  token: JWTOnly;
  vod: UploadVodInputs;
  setProgress: setProgress;
}): Promise<TranslatorResponce> => {
  let formData = new FormData();
  let percentCompletedFile = 0;
  let percenteCompletedCover = 0;
  const fileSize = params.vod.vod_file.size;
  const coverSize = params.vod.cover_image_file.size;
  formData.append("vod[title]", params.vod.title);
  formData.append("vod[category_id]", params.vod.category_id);
  formData.append("vod[vod_file]", params.vod.vod_file);
  formData.append("vod[cover_image_file]", params.vod.cover_image_file);
  const resp: any = await vodBaseApi({
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    data: formData,
    url: `/vods`,
    onUploadProgress: function (progressEvent) {
      percentCompletedFile = Math.round(
        (progressEvent.loaded * 100) / (progressEvent.total - coverSize)
      );
      percenteCompletedCover = Math.round(
        ((progressEvent.loaded - fileSize) * 100) /
          (progressEvent.total - fileSize)
      );
      params.setProgress({
        file: percentCompletedFile < 100 ? percentCompletedFile : 100,
        cover:
          percentCompletedFile >= 100 && percenteCompletedCover > 0
            ? percenteCompletedCover
            : 0,
      });
    },
  });
  const { valid, outData, errors } = translateSchema(resp, resp.data, vodData);
  if (valid) {
    const res = outData;
    params.setProgress({
      file: 100,
      cover: 100,
    });
    // creator: {
    //   _key: res.creator._key,
    //   donate_url: res.creator.donate_url,
    //   followers_count: res.creator.followers_count,
    //   full_name: res.creator.full_name,
    //   image_url: res.creator.image_url,
    //   username: res.creator.username,
    // },
    const data: SingleVod = {
      _key: res._key,
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
      description: res.description,
      file_url: res.file_url,
      title: res.title,
      publish_status: res.publish_status,
      total_views: res.total_views,
      inserted_at: res.inserted_at,
      updated_at: res.updated_at,
    };
    return createResponce(0, "vod data fetched successfuly", "", data);
  }
  return outputStructureUnknown(errors);
};
