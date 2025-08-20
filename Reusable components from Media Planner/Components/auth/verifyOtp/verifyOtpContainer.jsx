import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { verifyOtpAX } from "../../../redux/actions/auth";
import { signIn } from "../../../routes/constants";
import OtpVerificationView from "./verifyOtpView";

const OtpVerificationContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rxStore = useSelector((state) => state.auth);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    otp: Yup.array()
      .of(
        Yup.string().matches(
          /^[0-9]$/,
          t("verifyOtp.validationSchema.Must be a digit")
        )
      )
      .length(4, t("verifyOtp.validationSchema.OTP must be 4 digits"))
      .required(t("verifyOtp.validationSchema.OTP is required")),
  });

  const initialValues = {
    otp: Array(4).fill(""),
  };

  const handleInputChange = (e, index, values, setFieldValue) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...values.otp];

    newOtp[index] = value.slice(-1);

    if (value && index < values.otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    setFieldValue("otp", newOtp);
  };

  const handleKeyDown = (e, index, values, setFieldValue) => {
    if (e.key === "Backspace" && !values.otp[index] && index > 0) {
      const newOtp = [...values.otp];
      newOtp[index - 1] = "";
      setFieldValue("otp", newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e, setFieldValue) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (/^\d+$/.test(text)) {
      const digits = text.split("").slice(0, initialValues.otp.length);
      setFieldValue("otp", [
        ...digits,
        ...Array(initialValues.otp.length - digits.length).fill(""),
      ]);
      const nextIndex = Math.min(digits.length, initialValues.otp.length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (values, formikHelpers) => {
    const otpCode = values.otp.join("");

    if (otpCode.length !== 4) {
      formikHelpers.setFieldError("otp", "Please enter a valid 4-digit OTP");
      formikHelpers.setSubmitting(false);
      return;
    }

    const otpData = {
      otp: otpCode,
      email: rxStore?.registerUser?.email || "",
    };

    try {
      await dispatch(verifyOtpAX(otpData))
        .unwrap()
        .then(() => {
          navigate(signIn);
        })
        .catch((err) => {
          toast.error(err?.message || "OTP verification failed");
          formikHelpers.setSubmitting(false);
        });
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <OtpVerificationView
      initialValues={initialValues}
      validationSchema={validationSchema}
      inputRefs={inputRefs}
      handleInputChange={handleInputChange}
      handleKeyDown={handleKeyDown}
      handlePaste={handlePaste}
      onSubmit={handleSubmit}
      loading={rxStore?.loading}
      t={t}
    />
  );
};

export default OtpVerificationContainer;
