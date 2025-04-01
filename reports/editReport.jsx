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
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd-next";
import { reorderImages, setReorderedImages } from "./store/imageSlice";
import { toast } from "react-toastify";

const EditReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { reportData, reportDetail, isLoading } = useSelector(
    (state) => state.report
  );
  const { reorderedImages } = useSelector((state) => state.reportImages);

  const orderedImages = reportDetail?.images ? [...reportDetail.images] : [];

  const availableReports = reportData
    .filter((report) => report.name != reportDetail.name)
    .map((report) => report.name);

  const schema = yup
    .object({
      name: yup
        .string()
        .required("Report name is Required")
        .max(255, "Maximum 255 characters are accepted")
        .notOneOf(availableReports, "This Report is already available."),
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
          return Array.from(files).every(
            (file) => file.size <= 2 * 1024 * 1024
          );
        })
        .test("fileType", "Only image files are allowed", (files) => {
          if (!files || files.length === 0) return true;
          return Array.from(files).every((file) =>
            ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
          );
        }),
    })
    .required();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  // Get perticular report detail
  useEffect(() => {
    if (!reportDetail || reportDetail.id !== Number(id)) {
      dispatch(getReportDetail(id));
    }
  }, [dispatch, id, reportDetail]);

  // Set value of all fields
  useEffect(() => {
    if (id == reportDetail?.id) {
      setValue("name", reportDetail?.name);
      setValue("phoneNumber", reportDetail?.phoneNumber);
      setValue("address", reportDetail?.address);
      reportDetail?.images.map((img) => {
        setValue("images", img);
      });
    }
  }, [reportDetail, id, setValue, reorderedImages]);

  // Run on edit Report button click
  const onSubmit = async (data) => {
    let newData = { id: id, data };

    let response = await dispatch(UpdateReportDetail(newData)).unwrap();

    if (response.data.success) {
      navigate("/reports");
    } else {
      toast.error(response.data.message);
    }
  };

  // Run after drag end
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(reportDetail.images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    const final_reorderedImages = {
      images: reorderedImages.map((img, index) => ({
        id: img.id,
        order: index + 1,
      })),
    };

    dispatch(setReorderedImages(reorderedImages)); // Update local state
    dispatch(
      reorderImages({ reportCategoryId: id, data: final_reorderedImages })
    )
      .unwrap()
      .then(() => {
        dispatch(getReportDetail(id));
      })
      .catch((error) => {
        toast.error("Failed to re-order images.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(`re-order error: `, error);
      });
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
                <div className="flex flex-col items-center space-y-4 w-full">
                  <div className="border-2 flex items-center justify-center w-full h-96 relative cursor-pointer">
                    {reportDetail?.images && reportDetail.images.length > 0 ? (
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable
                          droppableId="imageList"
                          direction="horizontal"
                        >
                          {/* /// Droppable area */}
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="flex gap-4 overflow-x-auto p-2 w-full max-w-full"
                            >
                              {(reorderedImages.length > 0
                                ? reorderedImages
                                : orderedImages
                              ).map((image, index) => (
                                <Draggable
                                  key={image.id}
                                  draggableId={image.id.toString()}
                                  index={index}
                                >
                                  {/* // Images */}
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="relative w-52 h-52 border flex-shrink-0 cursor-grab"
                                    >
                                      <img
                                        src={`http://localhost:3000/uploads/${image.url}`}
                                        alt={`uploaded ${index}`}
                                        className="w-full h-full object-cover rounded hover:shadow-md"
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    ) : (
                      <div>There is no any Images</div>
                    )}
                  </div>
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
