import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Loading from "../../components/Loading";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import { getReportDetail, UpdateReportDetail } from "./store/reportSlice";
import { useEffect } from "react";
import Icon from "@/components/ui/Icon";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Report name is Required")
      .max(30, "Maximum 30 characters are accepted"),
  })
  .required();

const EditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { reportDetail, isLoading } = useSelector((state) => state.report);
  // console.log(`reportDetail: `, reportDetail);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  useEffect(() => {
    if (!reportDetail || reportDetail.id !== Number(id)) {
      // console.log(`getting report Detail...`);
      dispatch(getReportDetail(id));
    }
  }, [dispatch, id, reportDetail]);

  // console.log(`Id: `, id);

  useEffect(() => {
    if (id == reportDetail?.id) {
      setValue("name", reportDetail?.name);
      setValue("phoneNumber", reportDetail?.phoneNumber);
      setValue("address", reportDetail?.address);
    }
  }, [reportDetail, id, setValue]);

  const onSubmit = async (data) => {
    let newData = { id: id, data };
    let response = await dispatch(UpdateReportDetail(newData)).unwrap();

    if (response.data.success) {
      navigate("/reports");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="space-y-5 profile-page">
        <div className="grid grid-cols-6 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <Card title="Edit Report">
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
                <div className="border-2 p-2 flex items-center space-x-2 relative">
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer absolute right-0"
                  >
                    {/* <Icon
                      icon="heroicons-outline:plus"
                      className="text-2xl text-blue-500 hover:text-blue-700"
                    /> */}
                  </label>

                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    {...register("images")}
                    // className="hidden"
                  />
                </div>
                <button className="btn btn-primary block w-full text-center">
                  Update Report
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
