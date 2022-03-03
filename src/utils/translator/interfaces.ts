export interface FetchOtpInputs {
  phone_number: string;
}
export interface SignUpInputs {
  phone_number: string;
  otp: string;
}
export interface SignUpOutputs {
  _key: string;
  phone_number: string;
  jwt_token: string;
}
export interface ShowProfileInputs {
  user_key: string;
}
export interface ShowProfileOutputs {
  _key: string;
  about_me?: ProfileAboutMe[]; // TODO add about me structure
  bio?: string;
  cover_image_url?: string;
  donate_url?: string;
  followers?: any[]; // TODO add followers structure
  followers_count?: number;
  followings?: any[]; // TODO add followings structure
  followings_count?: number;
  full_name?: string;
  image_url: string;
  phone_number?: string;
  profile_status?: string;
  social_link?: any[]; // TODO add social_link structure
  username: string;
  vods_count?: {
    pending: number;
    failed: number;
    published: number;
  };
}

export interface ProfileAboutMe {
  _key: string;
  title?: string;
  image_url?: string;
  link?: string;
  describe?: string;
  created_at?: Date;
  remove?: boolean;
}

export interface UpdateProfileInputs {
  about_me?: ProfileAboutMe[];
  bio?: string;
  cover_image_url?: string;
  donate_url?: string;
  full_name?: string;
  image_url?: string;
  phone_number?: string;
  profile_status?: string;
  social_link?: any[];
  username?: string;
}
// export interface ShowMyProfileOutputs {
//   _key: string;
//   about_me: any[]; // TODO add about me structure
//   bio: string;
//   cover_image_url: string;
//   donate_url: string;
//   followers: any[]; // TODO add followers structure
//   followers_count: number;
//   followings: any[]; // TODO add followings structure
//   followings_count: number;
//   full_name: string;
//   image_url: string;
//   phone_number: string;
//   profile_status: string;
//   social_link: any[]; // TODO add social_link structure
//   username: string;
// }
export interface JWTOnly {
  jwt_token: string;
}
export interface VodIndexInputs {
  inserted_at?: "dsc" | "asc";
  total_views?: "dsc" | "asc";
  publish_status?: string;
  category_id?: string;
  creator_id?: string;
  creators_id?: string[];
  search?: string;
}
export interface Vod {
  _key: string;
  total_views: string;
  category: {
    _key: string;
    metadata: {
      company_name: string;
      release_year: number;
    };
    title: string;
  };
  title: string;
  duration: number;
  inserted_at: Date;
  cover_image_url: string;
  creator: {
    _key: string;
    donate_url: string;
    followers_count: number;
    full_name: string;
    image_url: string;
    username: string;
  };
}
export interface SingleVod {
  _key: string;
  category: {
    _key: string;
    metadata: {
      company_name: string;
      release_year: number;
    };
    title: string;
  };
  cover_image_url: string;
  creator?: {
    _key: string;
    donate_url: string;
    followers_count: number;
    full_name: string;
    image_url: string;
    username: string;
  };
  duration: number;
  description: string;
  file_url: string;
  title: string;
  publish_status: string;
  total_views: number;
  inserted_at: Date;
  updated_at: Date;
}

export interface StreamIndexInputs {
  inserted_at?: "dsc" | "asc";
  live_views?: "dsc" | "asc";
  stream_status?: string;
  category_id?: string;
  streamer_id?: string;
  streamers_id?: string[];
  search?: string;
}
export interface StreamServer {
  server: string;
  stream_key: string;
}
export interface UploadVodInputs {
  title: string;
  category_id: string;
  vod_file: File;
  cover_image_file: File;
}

export type setProgress = React.Dispatch<
  React.SetStateAction<{
    file: number;
    cover: number;
  }>
>;
export interface UploadToStorageInputs {
  upload_token: string;
  file: File;
}
export interface UpdateStreamInputs {
  title: string;
  category_id: string;
}
export interface Stream {
  _key: string;
  category: {
    _key: string;
    metadata: {
      company_name: string;
      release_year: number;
    };
    title: string;
  };
  cover_image_url: string;
  streamer: {
    _key: string;
    donate_url: string;
    followers_count: number;
    full_name: string;
    image_url: string;
    username: string;
  };
  duration: number;
  description: string;
  end_at: Date;
  live_views: number;
  start_at: Date;
  stream_status: string;
  watch_url: string;
  title: string;
  total_views: number;
  inserted_at: Date;
  updated_at: Date;
}

export interface ShowVodProps {
  vod_key: string;
}
export interface ShowFollowingsIndexProps {
  jwt_token: string;
  queryParams: object;
}
export interface UploadClipInputs {
  formData: any;
  jwt_token: string;
}
export interface UpdateProfileParams {
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

export interface CategoryIndexInputs {
  inserted_at?: "dsc" | "asc";
  total_views?: "dsc" | "asc";
}
export interface Category {
  _key: string;
  cover_url: string;
  image_url: string;
  live_views: number;
  metadata: {
    company_name: string;
    release_year: number;
  };
  streams_count: number;
  streams_id?: string[];
  tags: string[];
  title: string;
  total_views: number;
  type: string;
  videos_count: number;
  videos_id?: string[];
}

export interface FollowUserProps {
  user_key: string;
  jwt_token: string;
}
export interface UnFollowUserProps {
  user_key: string;
  jwt_token: string;
}
export interface AddOrEditAboutMeProps {
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
export interface UploadImageProps {
  jwt_token: string;
  file: any;
}
