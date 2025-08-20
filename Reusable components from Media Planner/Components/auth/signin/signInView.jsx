import { Formik } from "formik";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { MdEmail, MdLockOutline } from "react-icons/md";
import illustration from "../../../assets/images/svg/signin.svg";
import "./signInStyle.scss";
import PageLoaderContainer from "../../../common/pageLoader/pageLoaderContainer";

const SignInView = ({
  isEmailMode,
  onModeChange,
  validationSchema,
  onSubmit,
  t,
}) => {
  return (
    <Formik
      initialValues={{ emailOrPhone: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="signin-container">
          <div className="signin-inner">
            <div className="signin-illustration">
              <img src={illustration} alt={`${t("signIn.Welcome Back")}`} />
            </div>

            <div className="signin-card">
              <div className="form-avatar">
                <MdLockOutline className="avatar-icon" />
              </div>
              <h2 className="signin-title">
                {t("signIn.Sign In Your Account")}
              </h2>

              <div className="mode-switch">
                <button
                  type="button"
                  className={`mode-btn ${isEmailMode ? "active" : ""}`}
                  onClick={() => {
                    onModeChange(true);
                    formik.setFieldValue("emailOrPhone", "");
                    formik.setFieldTouched("emailOrPhone", false);
                  }}
                >
                  <MdEmail /> {t("signIn.Email")}
                </button>
                <button
                  type="button"
                  className={`mode-btn ${!isEmailMode ? "active" : ""}`}
                  onClick={() => {
                    onModeChange(false);
                    formik.setFieldValue("emailOrPhone", "");
                    formik.setFieldTouched("emailOrPhone", false);
                  }}
                >
                  <IoPhonePortraitSharp fontSize="medium" /> {t("signIn.Phone")}
                </button>
              </div>

              <form onSubmit={formik.handleSubmit} className="signin-form">
                <div className="form-group">
                  <label htmlFor="emailOrPhone">
                    {isEmailMode ? "Email" : "Phone"}
                  </label>
                  <input
                    type={isEmailMode ? "email" : "tel"}
                    name="emailOrPhone"
                    id="emailOrPhone"
                    value={formik.values.emailOrPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={
                      isEmailMode
                        ? t("signIn.Enter Your Email")
                        : t("signIn.Enter Your Phone number")
                    }
                    className={`signin-input ${
                      formik.touched.emailOrPhone && formik.errors.emailOrPhone
                        ? "input-error"
                        : ""
                    }`}
                  />
                  {formik.touched.emailOrPhone &&
                    formik.errors.emailOrPhone && (
                      <div className="error-msg">
                        {formik.errors.emailOrPhone}
                      </div>
                    )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">{t("signIn.Password")}</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t("signIn.Enter your password")}
                    className={`signin-input ${
                      formik.touched.password && formik.errors.password
                        ? "input-error"
                        : ""
                    }`}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="error-msg">{formik.errors.password}</div>
                  )}
                </div>

                <a href="#" className="signin-forgot">
                  {t("signIn.Forgot Password?")}
                </a>

                <button
                  type="submit"
                  className="signin-btn"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting && (
                    <PageLoaderContainer type="button" size={30} color="#fff" />
                  )}
                  {formik.isSubmitting ? t("") : t("signIn.Login")}
                </button>
              </form>

              <p className="signin-footer">
                {t("signIn.Don't have an account?")}{" "}
                <a href="/signup">{t("signIn.Register")}</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SignInView;
