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
  console.log(`reportDetail: `, reportDetail);
  const orderedImages = reportDetail?.images ? [...reportDetail.images] : [];

  // console.log(`orderedImages: `, orderedImages);

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

  // console.log(`Already available Images: `, reportDetail.images);
  useEffect(() => {
    if (id == reportDetail?.id) {
      setValue("name", reportDetail?.name);
      setValue("phoneNumber", reportDetail?.phoneNumber);
      setValue("address", reportDetail?.address);
      reportDetail?.images.map((img) => {
        setValue("images", img);
      });
    }
  }, [reportDetail, id, setValue]);

  const onSubmit = async (data) => {
    let newData = { id: id, data };
    console.log(`new Data: `, newData);
    let response = await dispatch(UpdateReportDetail(newData)).unwrap();

    if (response.data.success) {
      navigate("/reports");
    } else {
      toast.error(response.data.message);
    }
  };

  console.log(`ordered Images: `, reportDetail.images);

  // const handleDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const reorderedImages = Array.from(reportDetail.images);
  //   const [movedImage] = reorderedImages.splice(result.source.index, 1);
  //   reorderedImages.splice(result.destination.index, 0, movedImage);

  //   // console.log(`reorderedImages`, reorderedImages);
  //   const final_reorderedImages = {
  //     reportCategoryId: id,
  //     data: reorderedImages.map((img, index) => ({
  //       id: img.id,
  //       order: index + 1,
  //     })),
  //   };

  //   // console.log(`reordered Images = `, reorderedImages);
  //   dispatch(setReorderedImages(reorderedImages));

  //   // dispatch(setSelectedImages(reorderedImages));
  //   dispatch(reorderImages(final_reorderedImages));
  // };

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
      .catch((error) => console.error("Reorder failed:", error));
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
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="flex gap-4 overflow-x-auto p-2 w-full max-w-full"
                            >
                              {orderedImages.map((image, index) => (
                                <Draggable
                                  key={image.id}
                                  draggableId={image.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="relative w-52 h-52 border flex-shrink-0 cursor-grab"
                                    >
                                      {/* {console.log(`image URL: `, image.url)} */}
                                      <img
                                        src={`http://localhost:3000/uploads/${image.url}`}
                                        alt={`uploaded ${index}`}
                                        className="w-full h-full object-cover rounded hover:shadow-md"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-gray-700 text-white rounded-full cursor-pointer hover:bg-red-500"
                                      >
                                        <Icon
                                          icon="heroicons-outline:x-mark"
                                          className="w-4 h-4"
                                        />
                                      </button>
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
