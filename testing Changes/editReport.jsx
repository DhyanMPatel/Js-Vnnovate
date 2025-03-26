import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import { useDispatch,useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { handleAddReport } from "./store/reportSlice";
import Loading from "../../components/Loading";
import { getReportDetail, UpdateReportDetail } from "./store/reportSlice";
import { useEffect } from "react";


const schema = yup.object({
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
}).required();

const EditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { reportDetail, isLoading } = useSelector((state) => state.report);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const onSubmit = async (data) => {
    let newData = {id: id, data};

    let response = await dispatch(handleAddReport(newData)).unwrap();

    if (response.data.success) {
      navigate("/reports");
    }else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getReportDetail(id));
    }
  }, [id]);

  useEffect(() => {
    if (id == reportDetail?.id) {
      setValue("name", reportDetail?.name);
    }
  }, [reportDetail, id, setValue]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="space-y-5 profile-page">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <Card title="Add Reports">
              <form onSubmit={handleSubmit(onSubmit)} className="spance-y-4">
                <Textinput
                  name="name"
                  label="Report Name"
                  text="text"
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
                <div>
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
                </div>
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

export default EditReport;
