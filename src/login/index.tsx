import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './styles/login.module.scss'
import icons from 'utils/icons'
import Link from 'next/link'
import {
  handleEntrance,
  handleChange,
  handleCloseConfirmModal,
  handleChangePhoneNum,
  handleCloseSuccessModal,
  handleClose,
} from './services'
import { messages } from 'utils/errors'
import LoginConfirmationModal from 'components/basicComponents/modals/loginConfirmationModal'
import SuccessModal from 'components/basicComponents/modals/successModal'

interface LoginTypes {
  show: boolean
  setShow: (value: boolean) => void
  setOmitHeader: (value: boolean) => void
}

const Login = ({ show = false, setShow, setOmitHeader }: LoginTypes) => {
  const [error, setError] = useState(false)
  const [errorTxt, setErrorTxt] = useState('')
  const [wrongOtpTXT, setWrongOtpTXT] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successful, setSuccessful] = useState(true)
  const [loading, setLoading] = useState(false)
  const [wrongOtp, setWrongOtp] = useState(false)
  const handleCloseModal = () => {
    handleClose(setShow, setLoading, setWrongOtp, setOmitHeader)
  }
  useEffect(() => {
    const input = document.getElementById('focusInput') as HTMLInputElement;
    input?.focus()
  }, [show])
  
  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseModal}
        centered
        className={styles.modal}
      >
        <div className={styles.topPart}>
          <div className={styles.closeBtn_container}>
            <button className={styles.closeBtn} onClick={handleCloseModal}>
              {icons.close()}
            </button>
          </div>
          <div className={styles.title}>ورود | ثبت نام</div>
          <div className={styles.phoneNumber_part}>
            <div className={styles.phoneNumber_title}>شماره موبایل</div>
            <div className={styles.inputWrapper}>
              <input
                className={[
                  styles.phoneNumber_input,
                  error ? styles.error : '',
                ].join(' ')}
                id="focusInput"
                type="tel"
                name={'phoneNumber'}
                value={phoneNumber}
                placeholder={'مثال ۰۹۱۲۳۴۵۶۷۸۹'}
                onChange={(e) =>
                  handleChange(
                    e,
                    setPhoneNumber,
                    setError,
                    setWrongOtp,
                    setErrorTxt,
                  )
                }
                autoComplete="off"
                autoFocus={true}
              ></input>
              {error ? (
                <span className={styles.error_icon}>{icons.report()}</span>
              ) : (
                ''
              )}
            </div>
            {error ? <span className={styles.error_txt}>{errorTxt}</span> : ''}
          </div>
        </div>
        {wrongOtp ? (
          <span className={styles.serverError}>{wrongOtpTXT}</span>
        ) : (
          ''
        )}
        <div className={styles.buttonPart}>
          <div className={styles.policyContainer}>
            با ورود و یا ثبت نام، شماره
            <Link href={'/'}>
              <a> شرایط و قوانین </a>
            </Link>
            استفاده از سرویس های سایت ورود
            <Link href={'/'}>
              <a> قوانین حریم خصوصی </a>
            </Link>
            آن را می پذیرید.
          </div>
          <div className={styles.entranceBtn_container}>
            <button
              className={styles.entranceBtn}
              onClick={() =>
                handleEntrance(
                  phoneNumber,
                  setError,
                  setShow,
                  setShowConfirmation,
                  setLoading,
                  setWrongOtpTXT,
                  setWrongOtp,
                  setErrorTxt,
                )
              }
            >
              {loading ? (
                <div className={styles.spinner}>
                  <div className={styles.bounce1}></div>
                  <div className={styles.bounce2}></div>
                  <div className={styles.bounce3}></div>
                </div>
              ) : (
                <span>ورود</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
      <LoginConfirmationModal
        show={showConfirmation}
        handleClose={() =>
          handleCloseConfirmModal(
            setShowConfirmation,
            setLoading,
            setWrongOtp,
            setOmitHeader,
          )
        }
        setShow={setShowConfirmation}
        handleChangePhoneNum={() =>
          handleChangePhoneNum(setShowConfirmation, setShow)
        }
        setShowSuccess={setShowSuccess}
        setSuccessful={setSuccessful}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        // setUser={setUser}
        setLoading={setLoading}
        loading={loading}
        wrongOtp={wrongOtp}
        setWrongOtp={setWrongOtp}
      />
      <SuccessModal
        show={showSuccess}
        handleClose={() =>
          handleCloseSuccessModal(setShowSuccess, setOmitHeader)
        }
        setShow={setShowSuccess}
        successful={successful}
      />
    </>
  )
}
export default Login
