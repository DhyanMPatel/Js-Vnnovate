import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { loginAX } from "../../../redux/actions/auth";
import { dashboard } from "../../../routes/constants";
import SignInView from "./SignInView";

const SignInContainer = () => {
  const { t } = useTranslation();
  const [isEmailMode, setIsEmailMode] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation schema
  const getValidationSchema = () => {
    return Yup.object().shape({
      emailOrPhone: isEmailMode
        ? Yup.string()
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              t("signIn.validationSchema.Invalid email address")
            )
            .required(t("signIn.validationSchema.Email is required"))
        : Yup.string()
            .matches(
              /^[0-9]+$/,
              t("signIn.validationSchema.Must be only digits")
            )
            .min(10, t("signIn.validationSchema.Must be at least 10 digits"))
            .required(t("signIn.validationSchema.Phone is required")),
      password: Yup.string()
        .min(
          6,
          t("signIn.validationSchema.Password must be at least 6 characters")
        )
        .required(t("signIn.validationSchema.Password is required")),
    });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const objLogin = {
        [isEmailMode ? "email" : "phone"]: values.emailOrPhone,
        password: values.password,
      };
      await dispatch(loginAX(objLogin))
        .unwrap()
        .then(() => {
          navigate(dashboard);
        })
        .catch((err) => {
          toast.error(err?.message);
          formikHelpers.setSubmitting(false);
        });
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Mode change handler
  const handleModeChange = (isEmail) => {
    setIsEmailMode(isEmail);
  };

  return (
    <SignInView
      isEmailMode={isEmailMode}
      onModeChange={handleModeChange}
      validationSchema={getValidationSchema()}
      onSubmit={handleSubmit}
      t={t}
    />
  );
};

export default SignInContainer;
