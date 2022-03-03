import moment from "jalali-moment";

/**************** Jalali Moment Persian Output */
export function persianJalali() {
  const m = moment();
  m.locale("fa");
  m.format("YY-MM-DD");
  moment.locale("fa", { useGregorianParser: true });
}
/**************** Jalali Moment Persian Output */

export function numFormatter(num: number) {
  if (num > 999 && num < 1000000) {
    return (num % 1000 === 0 ? num / 1000 : (num / 1000).toFixed(1)) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    return (
      (num % 1000000 === 0 ? num / 1000000 : (num / 1000000).toFixed(1)) + "M"
    ); // convert to M for number from > 1 million
  } else if (num <= 999) {
    return num; // if value < 1000, nothing to do
  }
}
export const SecToTimer = (seconds: number) => {
  let hour = Math.floor(seconds / 3600),
    minute = Math.floor((seconds % 3600) / 60),
    second = Math.floor(seconds % 60);
  return {
    hour: hour < 10 ? `0${hour}` : hour,
    minute: minute < 10 ? `0${minute}` : minute,
    second: second < 10 ? `0${second}` : second,
  };
};

/**************** File Size Formatter */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
/**************** File Size Formatter */
