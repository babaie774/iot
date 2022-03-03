export interface Status {
  success: boolean;
  msg: string;
}

export const status: { [key: number]: Status } = {
  0: {
    success: true,
    msg: "ok",
  },
  1: {
    msg: "unknown error occurred",
    success: false,
  },
  429: {
    msg: "rate limit",
    success: false,
  },
  3: {
    msg: "username or password invalid",
    success: false,
  },
  400: {
    msg: "invalid form data format",
    success: false,
  },
  4: {
    msg: "sent data format invalid",
    success: false,
  },
  404: {
    msg: "resource not found",
    success: false,
  },
  409: {
    msg: "confilict when create or update",
    success: false,
  },
  401: {
    msg: "unauthorized, token expired or invalid",
    success: false,
  },
  403: {
    msg: "access denied",
    success: false,
  },
  500: {
    msg: "service temperory not available",
    success: false,
  },
};

export const queryBuilder = (
  params: any,
  appendQuestion: boolean = false
): string => {
  const ks = Object.keys(params);
  let q = "";
  ks.forEach((k) => {
    if (k !== undefined && k !== null) {
      q = `${q}${q === "" ? `${appendQuestion ? "?" : ""}` : "&"}${k}=${
        params[k]
      }`;
    }
  });
  return q;
};

export interface TranslatorResponce {
  error: any;
  msg: string;
  statusType: Status;
  status: number;
  success: boolean;
  data: any;
}
export const createResponce = (
  statusCode: number,
  msg: string = "",
  error: string = "",
  data: any = ""
): TranslatorResponce => {
  return {
    error: error,
    msg: msg,
    status: statusCode,
    statusType: status[statusCode],
    success: false,
    data: data,
  };
};
export const outputStructureUnknown = (
  errors: string[]
): TranslatorResponce => {
  return {
    error: errors,
    msg: "unknown error occurred",
    status: 1,
    statusType: status[1],
    success: false,
    data: "",
  };
};
