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

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const onSubmit = async (data) => {
    let newData = { id: id, data };
    let response = await dispatch(UpdateReportDetail(newData)).unwrap();

    if (response.data.success) {
      navigate("/reports");
    } else {
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
        <div className="grid grid-cols-6 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <Card title="Edit Report">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Textinput
                  name="name"
                  lebel="Report Name"
                  type="text"
                  placeholder="Enter Report Name"
                  register={register}
                  error={errors.name}
                  className="h-[48px]"
                />
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
