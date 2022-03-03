import {
  serverBaseApi
} from "api";
import {
  Category
} from 'utils/translator/interfaces';

import {translateSchema, Schema} from 'utils/translator/schema';
import {createResponce, TranslatorResponce, outputStructureUnknown} from 'utils/translator/requests';


const categoryData:Schema = {
  type: "map",
  innerDataType: {
    _key: {
      type: "string",
      canNull: false
    },
    cover_url: {
      type: "string",
      canNull: false
    },
    image_url: {
      type: "string",
      canNull: false
    },
    "live_views": {
      type: "number",
      canNull: true,
      ifNullReplaceWith: 0
    },
    metadata: {
      type: "map",
      innerDataType: {
        company_name: {
          type: "string",
          canNull: false
        },
        release_year: {
          type: "number",
          canNull: true,
          ifNullReplaceWith: 0
        },
      }
    },
    streams_count: {
      type: "number",
      canNull: true,
      ifNullReplaceWith: 0
    },
    streams_id: {
      type: "list",
      innerListType: {
        type: "string"
      }
    },
    tags: {
      type: "list",
      innerListType: {
        type: "string"
      }
    },
    title: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: ""
    },
    total_views: {
      type: "number",
      canNull: true,
      ifNullReplaceWith: 0
    },
    type: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: ""
    },
    videos_count: {
      type: "number",
      canNull: true,
      ifNullReplaceWith: 0
    },
    videos_id: {
      type: "list",
      innerListType: {
        type: "string"
      }
    },

  }
}


export const showCategory = async (params: {id: string}): Promise<TranslatorResponce> => {

  const resp: any = await serverBaseApi({
    method: "GET",
    url: `/categories/${params.id}`,
  });

  const {valid, outData, errors} = translateSchema(resp, resp.data, categoryData);
  if (valid) {
    const res = outData;
    const data: Category =
    {
      _key: res._key,
      cover_url: res.cover_url,
      image_url: res.image_url,
      live_views: res.live_views,
      metadata: {
        company_name: res.metadata.company_name,
        release_year: res.metadata.release_year
      },
      streams_count: res.streams_count,
      streams_id: res.streams_id,
      tags: res.tags,
      title: res.title,
      total_views: res.total_views,
      type: res.type,
      videos_count: res.videos_count,
      videos_id: res.videos_id
    }
    return createResponce(0, "vod data fetched successfuly", "", data);
  }
  return outputStructureUnknown(errors);
}
