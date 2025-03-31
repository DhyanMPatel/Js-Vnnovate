import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { handleAddReport } from "./store/reportSlice";
import { setSelectedImages } from "./store/imageSlice";

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

const AddReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.report);
  const selectedImages = useSelector(
    (state) => state.reportImages.selectedImages
  );
  const [dragOver, setDragOver] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    dispatch(setSelectedImages([]));
  }, [dispatch]);

  const processFiles = (files) => {
    const fileArray = Array.from(files);
    const newImages = fileArray.map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      src: URL.createObjectURL(file),
      file,
    }));
    dispatch(setSelectedImages([...selectedImages, ...newImages]));
  };

  const handleSelectedImages = (event) => {
    processFiles(event.target.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    processFiles(event.dataTransfer.files);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedImages = [...selectedImages];
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
    dispatch(setSelectedImages(reorderedImages));
  };

  const handleRemoveImage = (index) => {
    dispatch(setSelectedImages(selectedImages.filter((_, i) => i !== index)));
  };

  const onSubmit = async (data) => {
    const reportData = new FormData();
    reportData.append("name", data.name);
    reportData.append("phoneNumber", data.phoneNumber);
    reportData.append("address", data.address);
    selectedImages.forEach((image) => {
      reportData.append("images", image.file);
    });
    const response = await dispatch(handleAddReport(reportData)).unwrap();
    if (response.success) navigate("/reports");
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Card title="Add Report">
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

          <div
            className={`border-2 flex items-center justify-center w-full h-96 relative cursor-pointer ${
              dragOver ? "bg-blue-100" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label
              htmlFor="fileInput"
              className="w-full h-full flex items-center justify-center"
            >
              {selectedImages.length > 0 ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="imageList" direction="horizontal">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex gap-4 overflow-x-auto p-2"
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
                                  alt={`Uploaded ${index}`}
                                  className="w-full h-full object-cover rounded hover:shadow-md"
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage(index);
                                  }}
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
                className="hidden"
                onChange={handleSelectedImages}
              />
            </label>
          </div>

          <button className="btn btn-primary w-full">Add Report</button>
        </form>
      </Card>
    </>
  );
};

export default AddReport;
