import { ErrorMessage, Field, Form, Formik } from "formik";
import { CiUser } from "react-icons/ci";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import illustration from "../../../assets/images/svg/signup.svg";
import "./signupStyle.scss";
import PageLoaderContainer from "../../../common/pageLoader/pageLoaderContainer";

const SignUpView = ({
  isEmailMode,
  onModeChange,
  validationSchema,
  initialValues,
  onSubmit,
  loading,
  error,
  t,
}) => {
  return (
    <div className="signup-container">
      <div className="signup-inner">
        <div className="signup-left">
          <img src={illustration} alt={`${t("signUp.Join Us")}`} />
        </div>

        <div className="signup-right">
          <div className="form-avatar">
            <CiUser className="avatar-icon" />
          </div>
          <h2 className="form-title">{t("signUp.Create Your Account")}</h2>
          <p className="form-subtitle">
            {t("signUp.Join Us Today and Get Started")}
          </p>

          <div className="mode-switch">
            <button
              type="button"
              className={`mode-btn ${isEmailMode ? "active" : ""}`}
              onClick={() => onModeChange("email")}
              disabled={loading}
            >
              <MdEmail fontSize="medium" /> {t("signUp.Email")}
            </button>
            <button
              type="button"
              className={`mode-btn ${!isEmailMode ? "active" : ""}`}
              onClick={() => onModeChange("phone")}
              disabled={loading}
            >
              <IoPhonePortraitSharp fontSize="small" /> {t("signUp.Phone")}
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="signup-form">
                <div className="form-group">
                  <label htmlFor="fullName">{t("signUp.Full Name")}</label>
                  <Field
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder={`${t("signUp.Enter Your Full Name")}`}
                    className="signup-input"
                    disabled={loading || isSubmitting}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="error-msg"
                  />
                </div>

                {isEmailMode ? (
                  <div className="form-group">
                    <label htmlFor="email">{t("signUp.Email Address")}</label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder={`${t("signUp.Enter Your Email")}`}
                      className="signup-input"
                      disabled={loading || isSubmitting}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-msg"
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label htmlFor="phone">{t("signUp.Phone")}</label>
                    <Field
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder={`${t("signUp.Enter Your Phone")}`}
                      className="signup-input"
                      disabled={loading || isSubmitting}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error-msg"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="password">{t("signUp.Password")}</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder={`${t("signUp.Create a Password")}`}
                    className="signup-input"
                    disabled={loading || isSubmitting}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-msg"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    {t("signUp.Confirm Password")}
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder={`${t("signUp.Confirm Your Password")}`}
                    className="signup-input"
                    disabled={loading || isSubmitting}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error-msg"
                  />
                </div>

                {error && <div className="error-msg">{error}</div>}
                <button
                  type="submit"
                  className="signup-btn"
                  disabled={loading || isSubmitting}
                >
                  {isSubmitting && (
                    <PageLoaderContainer type="button" size={30} color="#fff" />
                  )}
                  {isSubmitting ? t("") : t("signUp.Register")}
                </button>
              </Form>
            )}
          </Formik>

          <p className="login-link">
            {t("signUp.Already have an account?")}{" "}
            <a href="/signin">{t("signUp.Login")}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUpView;
