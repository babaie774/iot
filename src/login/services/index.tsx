import { translator } from 'utils/translator'

const persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
]
const arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
]
const fixNumbers = function (phone: any) {
  for (var i = 0; i < 10; i++) {
    phone = phone.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
  }
  return phone
}

export const handleChange = (
  { target }: React.FormEvent,
  setPhoneNumber: (value: string) => void,
  setError: (value: boolean) => void,
  setWrongOtp: (value: boolean) => void,
  setErrorTxt: (value: string) => void,
) => {
  let phone = (target as any).value.replace(/[a-z\n\r\s\t]/, '')
  const value = `${fixNumbers(phone).replace(/(\D)/g, '')}`
  setPhoneNumber(value)
  setError(false)
  setWrongOtp(false)
  setErrorTxt('')
}

const checkErrors = (
  phoneNumber: string,
  setError: (value: boolean) => void,
  setErrorTxt: (value: string) => void,
) => {
  let phoneValidation = phoneNumber.match('[0][9][0-9][0-9]{8,8}$')
  if (phoneNumber === '' || phoneNumber === ' ') {
    setErrorTxt('شماره موبایل خود را وارد کنید.')
    setError(true)
    return false
  } else if(phoneNumber.substring(0, 2) !== "09"){
    setError(true)
    setErrorTxt('شماره موبایل باید با ۰۹ شروع شود.')
    return false
  }else if(phoneNumber.length !== 11){
    setError(true)
    setErrorTxt('شماره موبایل باید ۱۱ رقم باشد.')
    return false
  }else if (!phoneValidation) {
    setError(true)
    setErrorTxt('شماره وارد شده معتبر نمی‌باشد.')
    return false
  } else {
    return true
  }
}
export const handleEntrance = async (
  phoneNumber: string,
  setError: (value: boolean) => void,
  setShow: (value: boolean) => void,
  setShowConfirmation: (value: boolean) => void,
  setLoading: (value: boolean) => void,
  setWrongOtpTXT: (value: string) => void,
  setWrongOtp: (value: boolean) => void,
  setErrorTxt: (value: string) => void,
) => {
  let validation = checkErrors(phoneNumber, setError, setErrorTxt)
  if (validation) {
    setLoading(true)
    const response = await translator('fetchOtp', {
      phone_number: phoneNumber,
    })
    if (response?.status === 0) {
      setWrongOtp(false)
      setShow(false)
      setShowConfirmation(true)
      setLoading(false)
    } else if (response?.status === 429) {
      let remain = response?.msg.replace('rate limit error up to ', '')
      const date = Date.now()
      let leftTimeSec = (remain - date) / 1000
      let leftTime = ''

      if (leftTimeSec / 60 > 1) {
        leftTime = ' 2 '
      } else if (leftTimeSec / 60 <= 1) {
        leftTime = ' 1 '
      }

      setLoading(false)
      setWrongOtpTXT(` لطفا ${leftTime} دقیقه دیگر اقدام کنید`)
      setWrongOtp(true)
    } else {
      setLoading(false)
    }
  }
}
export const handleCloseConfirmModal = (
  setShowConfirmation: (value: boolean) => void,
  setLoading: (value: boolean) => void,
  setWrongOtp: (value: boolean) => void,
  setOmitHeader: (value: boolean) => void,
) => {
  setShowConfirmation(false)
  setLoading(false)
  setWrongOtp(false)
  setOmitHeader(false)
}
export const handleChangePhoneNum = (
  setShowConfirmation: (value: boolean) => void,
  setShow: (value: boolean) => void,
) => {
  setShowConfirmation(false)
  setShow(true)
}
export const handleCloseSuccessModal = (
  setShowSuccess: (value: boolean) => void,
  setOmitHeader: (value: boolean) => void,
) => {
  setShowSuccess(false)
  setOmitHeader(false)
}
export const handleClose = (
  setShow: (value: boolean) => void,
  setLoading: (value: boolean) => void,
  setWrongOtp: (value: boolean) => void,
  setOmitHeader: (value: boolean) => void,
) => {
  setShow(false)
  setLoading(false)
  setWrongOtp(false)
  setOmitHeader(false)
}
