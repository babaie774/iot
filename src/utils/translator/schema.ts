
export interface Schema {
  type: string;
  innerDataType?: {[key: string]: Schema};
  innerListType?: Schema;
  translateFunction?: Function;
  canNull?: boolean,
  dataSource?: Function,
  acceptValues?: any,
  default?: boolean,
  ifNullReplaceWith?: any
}

export const translateSchema = (res:any, resData: any, schema: Schema, key:string = "data"):{valid: boolean, outData: any | any[], errors: string[]} => {
  // string, map, enum, number, list
  try {
    let valid = true;
    const errors:string[] = [];

    // type: string;
    // innerDataType?: {[key: string]: Schema};
    // translateFunction?: Function;
    // canNull?: boolean,
    // dataSource?: Function,

    // acceptValues?: any,

    // ifNullReplaceWith?: any


    if(schema.type === "map") {
      let outData:{[key:string]: any} = {};

      const data = (schema.dataSource !== undefined) ? schema.dataSource(res) : (schema.translateFunction === undefined) ? resData[key] : schema.translateFunction(res, resData[key]);
      if (data === null || data === undefined) {
        if(schema.canNull === true) {
          if(schema.ifNullReplaceWith === undefined) {
            return {valid: true, outData: null, errors: errors}
          } else {
            return {valid: true, outData: schema.ifNullReplaceWith, errors: errors}
          }
        } else {
          errors.push(`key ${key}, data cant be null`)
          return {valid: false, outData: null, errors: errors}
        }
      } else {
        const innerDataType = (schema.innerDataType || {});
        const innerKeys = Object.keys(innerDataType || {});


        if(Array.isArray([])) {
        innerKeys.forEach((k:string) => {
          const s = innerDataType[k];
          const {valid: tmpValid, outData: tmpOutData, errors: newErrors} = translateSchema(res, data, s, k)
          valid = valid && tmpValid;
          if(!valid) {
            errors.push(...newErrors)
          }
          outData[k] = tmpOutData;
        })}

        return {valid: valid, outData: outData, errors: errors}
      }
    }
    if(schema.type === "list") {
      let outData:any[] = [];

      const data = (schema.dataSource !== undefined) ? schema.dataSource(res) : (schema.translateFunction === undefined) ? resData[key] : schema.translateFunction(res, resData[key]);
      if (data === null || data === undefined) {
        if(schema.canNull === true) {
          if(schema.ifNullReplaceWith === undefined) {
            return {valid: true, outData: null, errors: errors}
          } else {
            return {valid: true, outData: schema.ifNullReplaceWith, errors: errors}
          }
        } else {
          errors.push(`key ${key}, data cant be null`)
          return {valid: false, outData: null, errors: errors}
        }
      } else {
        const innerListType = schema.innerListType;
        if (innerListType === undefined) {
          errors.push(`key ${key}, schema invalid! innerListType is undefined.`)
          return {valid: false, outData: null, errors: errors};
        }

        if(Array.isArray([])) {
        data.forEach((k:any) => {
          const {valid: tmpValid, outData: tmpOutData, errors: newErrors} = translateSchema(res, {data: k}, innerListType, "data")
          valid = valid && tmpValid;
          outData.push(tmpOutData);
          if(!valid) {
            errors.push(...newErrors)
          }
        })}
        return {valid: valid, outData: outData, errors: errors}
      }

    }

    if(schema.type === "enum") {

      const data = (schema.dataSource !== undefined) ? schema.dataSource(res) : (schema.translateFunction === undefined) ? resData[key] : schema.translateFunction(res, resData[key]);
      if (data === null || data === undefined) {
        if(schema.canNull === true) {
          if(schema.ifNullReplaceWith === undefined) {
            return {valid: true, outData: null, errors: errors}
          } else {
            return {valid: true, outData: schema.ifNullReplaceWith, errors: errors}
          }
        } else {
          errors.push(`key ${key}, data cant be null`)
          return {valid: false, outData: null, errors: errors}
        }
      } else {
        if ((schema.acceptValues).findIndex((k:any) => k == data)) {
          return {
          valid: true, outData: data, errors: errors
        }} else {
          errors.push(`key ${key}, data is not in acceptValues`)
          return {valid: false, outData: null, errors: errors}
        }
      }

    }

    if(schema.type === "string") {

      const data = (schema.dataSource !== undefined) ? schema.dataSource(res) : (schema.translateFunction === undefined) ? resData[key] : schema.translateFunction(res, resData[key]);
      if (data === null || data === undefined) {
        if(schema.canNull === true) {
          if(schema.ifNullReplaceWith === undefined) {
            return {valid: true, outData: null, errors: errors}
          } else {
            return {valid: true, outData: schema.ifNullReplaceWith, errors: errors}
          }
        } else {
          errors.push(`key ${key}, data cant be null`)
          return {valid: false, outData: null, errors: errors}
        }
      } else {
        if (String(data) === data) {
          return {valid: true, outData: String(data).valueOf(), errors: errors}
        } else {
          errors.push(`key ${key}, data is not in String`)
          return {valid: false, outData: null, errors: errors}
        }
      }
    }

    if(schema.type === "number") {

      const data = (schema.dataSource !== undefined) ? schema.dataSource(res) : (schema.translateFunction === undefined) ? resData[key] : schema.translateFunction(res, resData[key]);
      if (data === null || data === undefined) {
        if(schema.canNull === true) {
          if(schema.ifNullReplaceWith === undefined) {
            return {valid: true, outData: null, errors: errors}
          } else {
            return {valid: true, outData: schema.ifNullReplaceWith, errors: errors}
          }
        } else {
          errors.push(`key ${key}, data cant be null`)
          return {valid: false, outData: null, errors: errors}
        }
      } else {

        if (Number(data) === data) {
          return {
          valid: true, outData: Number(data).valueOf(), errors: errors
          }
        } else {
          errors.push(`key ${key}, data is not in Number`)
          return {valid: false, outData: null, errors: errors}
        }
      }
    }

    if(schema.type === "datetime") {

      const data = (schema.dataSource !== undefined) ? schema.dataSource(res) : (schema.translateFunction === undefined) ? resData[key] : schema.translateFunction(res, resData[key]);
      if (data === null || data === undefined) {
        if(schema.canNull === true) {
          if(schema.ifNullReplaceWith === undefined) {
            return {valid: true, outData: null, errors: errors}
          } else {
            return {valid: true, outData: schema.ifNullReplaceWith, errors: errors}
          }
        } else {
          errors.push(`key ${key}, data cant be null`)
          return {valid: false, outData: null, errors: errors}
        }
      } else {

        if (data.match(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)) {
          return {valid: true, outData: new Date(data), errors: errors}
        } else {
          errors.push(`key ${key}, data is not in datetime`)
          return {valid: false, outData: null, errors: errors}
        }
      }
    }
    if(schema.type === "navedatetime") {

      const data = (schema.dataSource !== undefined) ? schema.dataSource(res) : (schema.translateFunction === undefined) ? resData[key] : schema.translateFunction(res, resData[key]);
      if (data === null || data === undefined) {
        if(schema.canNull === true) {
          if(schema.ifNullReplaceWith === undefined) {
            return {valid: true, outData: null, errors: errors}
          } else {
            return {valid: true, outData: schema.ifNullReplaceWith, errors: errors}
          }
        } else {
          errors.push(`key ${key}, data cant be null`)
          return {valid: false, outData: null, errors: errors}
        }
      } else {

        if (data.match(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/)) {
          return {valid: true, outData: new Date(data), errors: errors}
        } else {
          errors.push(`key ${key}, data is not in datetime`)
          return {valid: false, outData: null, errors: errors}
        }
      }
    }
    if(schema.type === "date") {

      const data = (schema.dataSource !== undefined) ? schema.dataSource(res) : (schema.translateFunction === undefined) ? resData[key] : schema.translateFunction(res, resData[key]);
      if (data === null || data === undefined) {
        if(schema.canNull === true) {
          if(schema.ifNullReplaceWith === undefined) {
            return {valid: true, outData: null, errors: errors}
          } else {
            return {valid: true, outData: schema.ifNullReplaceWith, errors: errors}
          }
        } else {
          errors.push(`key ${key}, data cant be null`)
          return {valid: false, outData: null, errors: errors}
        }
      } else {
        if (data.match(/\d{4}-[01]\d-[0-3]\d/)) {
          return {valid: true, outData: new Date(data), errors: errors}
        } else {
          errors.push(`key ${key}, data is not in String`)
          return {valid: false, outData: null, errors: errors}
        }
      }
    }


    errors.push(`key ${key}, with schema ${schema.type} not found`)
    return {
      valid: false,
      outData: null,
      errors: errors
    }
  } catch (error) {
    console.error(error)
    throw "schema error";
  }
}
