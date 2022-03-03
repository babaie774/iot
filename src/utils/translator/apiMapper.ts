import {showMyProfile, updateMyProfile, fallowProfile, unFallowProfile, createProfile} from 'utils/translator/requests/clients/profile/show'
import {followings, followers} from 'utils/translator/requests/clients/profile/search'
import {showFollowingsStreams} from 'utils/translator/requests/clients/stream/index'

import {showProfile} from 'utils/translator/requests/public/profile/show'
import {searchProfiles} from   'utils/translator/requests/public/profile/search'
import {fetchOtp, signUp} from 'utils/translator/requests/public/auth'
import {showVods} from 'utils/translator/requests/public/vod/index'
import {showVod} from 'utils/translator/requests/public/vod/show'
import {showStreams} from 'utils/translator/requests/public/stream'
import {showStream} from 'utils/translator/requests/public/stream/show'

import {showFollowsVods} from 'utils/translator/requests/clients/vod'
import {uploadVod} from 'utils/translator/requests/clients/vod/show'
import {uploadFile} from 'utils/translator/requests/clients/upload/show'
import {showMyStream, getStreamServer, createStreamServer, updateStream} from 'utils/translator/requests/clients/stream/show'
// showMyStream
import {showCategories} from 'utils/translator/requests/public/category'
import {showCategory} from 'utils/translator/requests/public/category/show'

const apiMap:{[key: string]: Function} = {
  "show_profile": showProfile,
  "my_profile": showMyProfile,
  "search_profiles": searchProfiles,
  "fetchOtp": fetchOtp,
  "signUp": signUp,
  "show_vods": showVods,
  "show_vod": showVod,
  "show_stream": showStream,
  "show_streams": showStreams,
  "show_category": showCategory,
  "show_categories": showCategories,
  "update_my_profile": updateMyProfile,
  "fallow_profile": fallowProfile,
  "unfallow_profile": unFallowProfile,
  "followings": followings,
  "followers": followers,
  "create_profile": createProfile,
  "show_follows_streams": showFollowingsStreams,
  "show_my_stream": showMyStream,
  "get_stream_server": getStreamServer,

  "create_stream": createStreamServer,
  "update_stream": updateStream,
  "show_follows_vods": showFollowsVods,
  "upload_vod": uploadVod,
  "upload_file": uploadFile
}
export const apiKeys:string[] = Object.keys(apiMap);
export default apiMap;
