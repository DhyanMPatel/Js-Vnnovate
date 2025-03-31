import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Loading from "../../components/Loading";
import Icon from "@/components/ui/Icon";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd-next";
import { getReportDetail, updateReportDetail } from "./store/reportSlice";
import { reorderImages, setReorderedImages } from "./store/imageSlice";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Report name is required")
      .max(30, "Maximum 30 characters allowed"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    address: yup
      .string()
      .required("Address is required")
      .max(100, "Maximum 100 characters allowed"),
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
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (!reportDetail || reportDetail.id !== Number(id)) {
      dispatch(getReportDetail(id));
    }
  }, [dispatch, id, reportDetail]);

  useEffect(() => {
    if (reportDetail?.id === Number(id)) {
      setValue("name", reportDetail.name);
      setValue("phoneNumber", reportDetail.phoneNumber);
      setValue("address", reportDetail.address);
    }
  }, [reportDetail, id, setValue]);

  const onSubmit = async (data) => {
    const response = await dispatch(updateReportDetail({ id, data })).unwrap();
    if (response.success) navigate("/reports");
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(reportDetail.images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    dispatch(setReorderedImages(reorderedImages));
    dispatch(
      reorderImages({
        reportCategoryId: id,
        data: {
          images: reorderedImages.map((img, index) => ({
            id: img.id,
            order: index + 1,
          })),
        },
      })
    )
      .unwrap()
      .then(() => dispatch(getReportDetail(id)))
      .catch((error) => console.error("Reorder failed:", error));
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="space-y-5">
        <Card title="Edit Report">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textinput
              name="name"
              label="Report Name"
              type="text"
              placeholder="Enter Report Name"
              register={register}
              error={errors.name}
            />
            <Textinput
              name="phoneNumber"
              label="Phone Number"
              type="text"
              placeholder="Enter Phone Number"
              register={register}
              error={errors.phoneNumber}
            />
            <Textinput
              name="address"
              label="Address"
              type="text"
              placeholder="Enter Address"
              register={register}
              error={errors.address}
            />

            {reportDetail?.images?.length > 0 && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="imageList" direction="horizontal">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex gap-4 overflow-x-auto p-2"
                    >
                      {reportDetail.images.map((image, index) => (
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
                              className="relative w-32 h-32 border flex-shrink-0 cursor-grab"
                            >
                              <img
                                src={`http://localhost:3000/uploads/${image.url}`}
                                alt={`Uploaded ${index}`}
                                className="w-full h-full object-cover rounded hover:shadow-md"
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-1 bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-500"
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
            )}

            <button className="btn btn-primary w-full">Update Report</button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditReport;
