import { streamBaseApi } from "api";
import {
  Stream,
  JWTOnly,
  StreamServer,
  UpdateStreamInputs,
} from "utils/translator/interfaces";

import { translateSchema, Schema } from "utils/translator/schema";
import {
  createResponce,
  TranslatorResponce,
  outputStructureUnknown,
  status,
} from "utils/translator/requests";

const streamData: Schema = {
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
    duration: {
      type: "number",
      canNull: true,
      ifNullReplaceWith: 0,
    },
    description: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    end_at: {
      type: "datetime",
      canNull: true,
    },
    live_views: {
      type: "number",
      canNull: true,
      ifNullReplaceWith: 0,
    },
    start_at: {
      type: "datetime",
      canNull: true,
    },
    streamer: {
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
    stream_status: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    watch_url: {
      type: "string",
      canNull: true,
      ifNullReplaceWith: "",
    },
    title: {
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

const streamServer: Schema = {
  type: "map",
  innerDataType: {
    server: {
      type: "string",
      canNull: false,
    },
    stream_key: {
      type: "string",
      canNull: false,
    },
  },
};

export const showMyStream = async (params: {
  token: JWTOnly;
}): Promise<TranslatorResponce> => {
  const resp: any = await streamBaseApi({
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    url: `/my/stream`,
  });

  const { valid, outData, errors } = translateSchema(
    resp,
    resp.data,
    streamData
  );
  if (valid) {
    const res = outData;
    const data: Stream = {
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
      streamer: {
        _key: res.streamer._key,
        donate_url: res.streamer.donate_url,
        followers_count: res.streamer.followers_count,
        full_name: res.streamer.full_name,
        image_url: res.streamer.image_url,
        username: res.streamer.username,
      },
      duration: res.duration,
      description: res.description,
      end_at: res.end_at,
      live_views: res.live_views,
      start_at: res.start_at,
      stream_status: res.stream_status,
      watch_url: res.watch_url,
      title: res.title,
      total_views: res.total_views,
      inserted_at: res.inserted_at,
      updated_at: res.updated_at,
    };
    return createResponce(0, "stream data fetched successfuly", "", data);
  }
  return outputStructureUnknown(errors);
};

export const getStreamServer = async (params: {
  token: JWTOnly;
}): Promise<TranslatorResponce> => {
  const resp: any = await streamBaseApi({
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    url: `/my/stream/server`,
  });

  const { valid, outData, errors } = translateSchema(
    resp,
    resp.data,
    streamServer
  );
  if (valid) {
    const res = outData;
    const data: StreamServer = {
      server: res.server,
      stream_key: res.stream_key,
    };
    return createResponce(0, "stream data fetched successfuly", "", data);
  }
  return outputStructureUnknown(errors);
};

export const createStreamServer = async (params: {
  token: JWTOnly;
}): Promise<TranslatorResponce> => {
  const resp: any = await streamBaseApi({
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    url: `/my/stream/init`,
  });

  try {
    if (resp.data === "created" || resp.data === "Created") {
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
export const updateStream = async (params: {
  token: JWTOnly;
  stream: UpdateStreamInputs;
}): Promise<TranslatorResponce> => {
  const resp: any = await streamBaseApi({
    method: "PUT",
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    data: { stream: params.stream },
    url: `/my/stream`,
  });

  const { valid, outData, errors } = translateSchema(
    resp,
    resp.data,
    streamData
  );
  if (valid) {
    const res = outData;
    const data: Stream = {
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
      streamer: {
        _key: res.streamer._key,
        donate_url: res.streamer.donate_url,
        followers_count: res.streamer.followers_count,
        full_name: res.streamer.full_name,
        image_url: res.streamer.image_url,
        username: res.streamer.username,
      },
      duration: res.duration,
      description: res.description,
      end_at: res.end_at,
      live_views: res.live_views,
      start_at: res.start_at,
      stream_status: res.stream_status,
      watch_url: res.watch_url,
      title: res.title,
      total_views: res.total_views,
      inserted_at: res.inserted_at,
      updated_at: res.updated_at,
    };
    return createResponce(0, "stream data fetched successfuly", "", data);
  }
  return outputStructureUnknown(errors);
};
