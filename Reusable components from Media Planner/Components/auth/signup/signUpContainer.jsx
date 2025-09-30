import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { authUserAX } from "../../../redux/actions/auth";
import { verifyOtp } from "../../../routes/constants";
import SignUpView from "./signUpView";

const SignUpContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loading, error } = useSelector((state) => state.auth);
  const [isEmailMode, setIsEmailMode] = useState(true);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(
      t("signUp.validationSchema.Full Name is required")
    ),
    email: Yup.string()
      .email(t("signUp.validationSchema.Invalid email"))
      .test(
        "email-required",
        t("signUp.validationSchema.Email is required"),
        function (value) {
          return !isEmailMode || !!value;
        }
      ),
    phone: Yup.string()
      .matches(/^\d+$/, t("signUp.validationSchema.Phone must be digits only"))
      .test(
        "phone-required",
        t("signUp.validationSchema.Phone is required"),
        function (value) {
          return isEmailMode || !!value;
        }
      ),
    password: Yup.string()
      .min(
        6,
        t("signUp.validationSchema.Password must be at least 6 characters")
      )
      .required(t("signUp.validationSchema.Password is required")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("signUp.validationSchema.Passwords must match")
      )
      .required(t("signUp.validationSchema.Confirm Password is required")),
  });

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const handleModeChange = (mode) => {
    setIsEmailMode(mode === "email");
  };

  const handleSubmit = async (values, formikHelpers) => {
    const dataToSubmit = {
      fullName: values.fullName,
      password: values.password,
      email: isEmailMode ? values.email : undefined,
      phone: !isEmailMode ? values.phone : undefined,
    };

    await dispatch(authUserAX(dataToSubmit))
      .unwrap()
      .then(() => {
        formikHelpers.setSubmitting(false);
        navigate(verifyOtp);
      })
      .catch((err) => {
        toast.error(err?.message);
        formikHelpers.setSubmitting(false);
      });
  };

  return (
    <SignUpView
      isEmailMode={isEmailMode}
      onModeChange={handleModeChange}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
      loading={loading}
      error={error}
      t={t}
    />
  );
};

export default SignUpContainer;
