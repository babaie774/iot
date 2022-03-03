import {
  accountBaseApi
} from "api";
import {
  SignUpOutputs,
  SignUpInputs,
  FetchOtpInputs
} from 'utils/translator/interfaces';

import {translateSchema, Schema} from 'utils/translator/schema';
import {createResponce, TranslatorResponce, outputStructureUnknown, status} from 'utils/translator/requests';


export const SignUpData:Schema = {
  type: "map",
  innerDataType: {
    user: {
      type: "map",
      innerDataType: {
        _key: {
          type: "string",
          canNull: false
        },
        phone_number: {
          type: "string",
          canNull: false
        }
      }
    },
    token: {
      type: "string"
    }
  }
};


export const fetchOtp = async (params: FetchOtpInputs): Promise<TranslatorResponce> => {
  const resp: any = await accountBaseApi({
    method: "POST",
    url: "/accounts/get_signup_otp_code",
    data: {
      user: {
        phone_number: params.phone_number
      }
    }
  })

  const res = resp.data

  if (res === "Created") {
    return {
      error: "",
      msg: "singup otp code sent",
      statusType: status[0],
      status: 0,
      success: true,
      data: ""
    }
  } else if (res?.errors?.phone_number === ["has invalid format"]) {
    return {
      error: "has invalid format",
      msg: "phone number is invalid",
      status: 4,
      statusType: status[4],
      success: false,
      data: ""
    }
  }

  return outputStructureUnknown([])

};

export const signUp = async (params: SignUpInputs): Promise<TranslatorResponce> => {
  try {
    const resp: any = await accountBaseApi({
      method: "POST",
      url: "/accounts/signup_with_otp_code",
      data: {
        user: {
          phone_number: `${params.phone_number}`,
          totp_token: params.otp,
        },
      },
    });
    const {valid, outData, errors} = translateSchema(resp, resp, SignUpData);
    if (valid) {
      const data: SignUpOutputs = {
        _key: outData.user._key,
        phone_number: outData.user.phone_number,
        jwt_token: outData.token,
      };
      return {
        msg: "login successfully",
        error: "",
        status: 0,
        statusType: status[0],
        success: true,
        data: data,
      };
    }
    return outputStructureUnknown(errors);

  } catch (error:any) {
    if (error.response.status === 401) {
      return createResponce(3, "invalid one time password", "Unauthorized");
    }
    if (error.response.status === 400)
      return createResponce(4, "invalid phone number or one time password format", "has invalid format")

    throw error
  }
};
