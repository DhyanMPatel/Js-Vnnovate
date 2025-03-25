import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { handleAddReport } from "./store/reportSlice";
import Loading from "../../components/Loading";

// const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup
  .object({
    name: yup
      .string()
      .required("Report name is Required")
      .max(30, "Maximum 30 characters are accepted"),
    phoneNumber: yup
      .string()
      // .matches(phoneRegExp, "Phone number is not valid")
      .required("A Phone Number is Required"),
    address: yup.string().required("An Address is Required"),
    images: yup
      .mixed()
      .test(
        "fileFormat",
        "jpeg, png, webp, jpg, svg files are allowed",
        (value) => {
          const supportedFormats = ["jpeg", "png", "webp", "jpg", "svg"];
          if (value && value[0]) {
            return supportedFormats.includes(value[0].name.split(".").pop());
          }
          return true;
        }
      )
      .required("An Images are Requeired"),
  })
  .required();

const AddReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.report);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const onSubmit = async (data) => {
    // console.log(`On Form Submit: ${data}`);

    // let storeData = new FormData();
    // storeData.append("name", data.name);
    // storeData.append("phoneNumber", data.phoneNumber);
    // storeData.append("address", data.address);
    // storeData.append("images", data.images);

    // console.log(`Images: ${data.images}`);

    let response = await dispatch(handleAddReport(data)).unwrap();

    if (response.data.success) {
      navigate("/reports");
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="space-y-5 profile-page">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <Card title="Add Category">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Textinput
                  name="name"
                  label="Report Name"
                  type="text"
                  placeholder="Enter Report Name"
                  register={register}
                  // register={{ ...register(`name`, { required: true }) }}
                  error={errors.name}
                  className="h-[48px]"
                />
                <Textinput
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                  placeholder="Enter Phone Number"
                  register={register}
                  // register={{ ...register("phoneNumber") }}
                  error={errors.phoneNumber}
                  className="h-[48px]"
                />
                <Textinput
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Enter your Address"
                  register={register}
                  // register={{ ...register("phoneNumber") }}
                  error={errors.address}
                  className="h-[48px]"
                />
                <Textinput
                  name="images"
                  label="Images"
                  type="file"
                  register={register}
                  error={errors.images}
                  className="h-[48px]"
                />
                <button
                  type="submit"
                  className="btn btn-primary block w-full text-center"
                >
                  Add Report
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddReport;
