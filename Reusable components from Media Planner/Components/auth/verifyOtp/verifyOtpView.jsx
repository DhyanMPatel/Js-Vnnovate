import { Form, Formik } from "formik";
import React from "react";
import { MdLockOutline } from "react-icons/md";
import illustration from "../../../assets/images/svg/signup.svg";
import "./verifyOtpStyle.scss";
import PageLoaderContainer from "../../../common/pageLoader/pageLoaderContainer";

const OtpVerificationView = ({
  initialValues,
  validationSchema,
  inputRefs,
  handleInputChange,
  handleKeyDown,
  handlePaste,
  onSubmit,
  loading,
  t,
}) => {
  return (
    <div className="verifyOtp-container">
      <div className="verifyOtp-inner">
        <div className="verifyOtp-illustration">
          <img src={illustration} alt={t("verifyOtp.OTP Verification")} />
        </div>
        <div className="verifyOtp-card">
          <div className="form-avatar">
            <MdLockOutline className="avatar-icon" />
          </div>
          <h2 className="verifyOtp-title">{t("verifyOtp.Enter your OTP")}</h2>
          <p className="verifyOtp-subtitle">
            {t("verifyOtp.Verify Your Account")}
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form className="verifyOtp-form">
                <div className="verifyOtp-inputs">
                  {values.otp.map((digit, index) => (
                    <div key={index} className="otp-input-container">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleInputChange(e, index, values, setFieldValue)
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(e, index, values, setFieldValue)
                        }
                        onPaste={(e) => handlePaste(e, setFieldValue)}
                        onFocus={(e) => e.target.select()}
                        className={`verifyOtp-input ${
                          errors.otp && touched.otp ? "input-error" : ""
                        }`}
                        ref={(el) => (inputRefs.current[index] = el)}
                        autoFocus={index === 0}
                      />
                    </div>
                  ))}
                </div>

                {errors.otp && touched.otp && (
                  <div className="error-msg">{errors.otp}</div>
                )}

                <button
                  type="submit"
                  className="verifyOtp-btn"
                  disabled={loading || isSubmitting}
                >
                  {(loading || isSubmitting) && (
                    <span className="btn-loader">
                      <PageLoaderContainer
                        type="button"
                        size={30}
                        color="#fff"
                      />
                    </span>
                  )}
                  {loading || isSubmitting ? t("") : t("verifyOtp.Submit OTP")}
                </button>

                <p className="verifyOtp-resend">
                  {t("verifyOtp.Resend code in")} <span>0:56</span>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OtpVerificationView);
