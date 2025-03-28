import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { handleAddReport } from "./store/reportSlice";
import Loading from "../../components/Loading";
import Icon from "@/components/ui/Icon";
import { setSelectedImages } from "./store/imageSlice";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd-next";

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
  })
  .required();

const AddReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.report);
  const { selectedImages } = useSelector((state) => state.reportImages);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const ReportData = new FormData();
    ReportData.append("name", data.name);
    ReportData.append("phoneNumber", data.phoneNumber);
    ReportData.append("address", data.address);

    if (selectedImages.length > 0) {
      selectedImages.forEach((file) => {
        ReportData.append("images", file.file);
      });
    }

    let response = await dispatch(handleAddReport(ReportData)).unwrap();
    if (response.data.success) {
      navigate("/reports");
    }
  };

  const handleSelectedImages = (event) => {
    const files = Array.from(event.target.files);
    const imageObjects = files.map((file) => ({
      id: URL.createObjectURL(file), // Unique ID for Drag-and-Drop
      src: URL.createObjectURL(file),
      file: file, // Store actual file for FormData
    }));

    dispatch(setSelectedImages([...selectedImages, ...imageObjects]));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = [...selectedImages];
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    dispatch(setSelectedImages(reorderedImages));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    dispatch(setSelectedImages(updatedImages));
  };

  useEffect(() => {
    if (selectedImages.length > 0) {
      dispatch(setSelectedImages([]));
    }
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="space-y-5 profile-page">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
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
                  type="text"
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
                    <label
                      htmlFor="fileInput"
                      className="w-full h-full flex items-center justify-center"
                    >
                      {selectedImages.length > 0 ? (
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
                                {selectedImages.map((image, index) => (
                                  <Draggable
                                    key={image.id}
                                    draggableId={image.id}
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
                                          src={image.src}
                                          alt={`uploaded ${index}`}
                                          className="w-full h-full object-cover rounded hover:shadow-md"
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleRemoveImage(index)
                                          }
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
                        <Icon
                          icon="heroicons-outline:plus"
                          className="text-5xl text-blue-500 hover:text-blue-700"
                        />
                      )}
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        multiple
                        {...register("images")}
                        className="hidden"
                        onChange={handleSelectedImages}
                      />
                    </label>
                  </div>
                </div>

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
