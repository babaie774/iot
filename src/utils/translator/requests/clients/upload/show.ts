import { storageBaseApi } from "api";
import { UploadToStorageInputs, JWTOnly } from "utils/translator/interfaces";

import { translateSchema, Schema } from "utils/translator/schema";
import {
  createResponce,
  TranslatorResponce,
  outputStructureUnknown,
} from "utils/translator/requests";

const uploadData: Schema = {
  type: "map",
  innerDataType: {
    url: {
      type: "string",
      canNull: false,
    },
  },
};

export const uploadFile = async (params: {
  token: JWTOnly;
  storage: UploadToStorageInputs;
}): Promise<TranslatorResponce> => {
  let formData = new FormData();
  formData.append("storage[file]", params.storage.file);
  formData.append("storage[upload_token]", params.storage.upload_token);
  const resp: any = await storageBaseApi({
    method: "POST",
    url: `/upload`,
    headers: {
      Authorization: `Bearer ${params.token.jwt_token}`,
    },
    data: formData,
  });
  resp.data = { data: resp.data };
  const { valid, outData, errors } = translateSchema(
    resp,
    resp.data,
    uploadData
  );
  if (valid) {
    const res = outData;
    const data: { url: string } = {
      url: res.url,
    };
    return createResponce(0, "upload data successfuly", "", data);
  }
  return outputStructureUnknown(errors);
};
