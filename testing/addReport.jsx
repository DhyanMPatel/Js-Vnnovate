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

const schema = yup
  .object({
    name: yup
      .string()
      .required("Report name is Required")
      .max(30, "Maximum 30 characters are accepted"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    address: yup
      .string()
      .required("Address is required")
      .max(100, "Maximum 100 characters are accepted"),
    images: yup
      .mixed()
      .test("fileSize", "File size should be less than 2MB", (files) => {
        if (!files || files.length === 0) return true;
        return Array.from(files).every((file) => file.size <= 2 * 1024 * 1024);
      })
      .test("fileType", "Only image files are allowed", (files) => {
        if (!files || files.length === 0) return true;
        return Array.from(files).every((file) =>
          ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
        );
      }),
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
    console.log("Form Data:", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("address", data.address);
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        console.log(`Image : `, file.name);
        formData.append("images", file.name);
      });
    }

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
            <Card title="Add Report">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Textinput
                  name="name"
                  label="Report Name"
                  type="text"
                  placeholder="Enter Report Name"
                  register={register}
                  error={errors.name}
                  className="h-[48px]"
                />
                <Textinput
                  name="phoneNumber"
                  label="Phone Number"
                  text="text"
                  placeholder="Enter Phone Number"
                  register={register}
                  error={errors.phoneNumber}
                  className="h-[48px]"
                />
                <Textinput
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Enter Address"
                  register={register}
                  error={errors.address}
                  className="h-[48px]"
                />
                <Textinput
                  name="images"
                  label="Images"
                  type="file"
                  placeholder="Enter Images here"
                  register={register}
                  error={errors.images}
                  className="h-[48px]"
                />
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    {...register("images")}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                  {errors.images && (
                    <p className="text-red-500 text-sm">
                      {errors.images.message}
                    </p>
                  )}
                </div> */}
                <button className="btn btn-primary block w-full text-center">
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
