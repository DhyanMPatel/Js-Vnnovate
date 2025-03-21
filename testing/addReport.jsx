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
                  error={errors.name}
                  className="h-[48px]"
                />
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
