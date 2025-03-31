import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { getReports, handleAddReport } from "./store/reportSlice";
import Loading from "../../components/Loading";
import Icon from "@/components/ui/Icon";
import { setSelectedImages } from "./store/imageSlice";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd-next";
import { toast } from "react-toastify";

const AddReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, reportData } = useSelector((state) => state.report);
  const selectedImages = useSelector(
    (state) => state.reportImages.selectedImages
  );
  const availableReports = reportData.map((report) => report.name);

  const schema = yup
    .object({
      name: yup
        .string()
        .required("Report name is Required")
        .max(30, "Maximum 30 characters are accepted")
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
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const handleSelectedImages = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      if (!selectedImages.find((img) => img.file.name === file.name)) {
        setSelectedImages((prev) => [
          ...prev,
          { file, preview: URL.createObjectURL(file) },
        ]);
        // console.log(`selected Images: `, selectedImages);
      } else {
        alert("This image is already selected.");
      }
    });

    if (selectedImages.length + files.length > 5) {
      toast.error("Images should be max 5", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const newImages = files.map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}`, // Unique ID
      src: URL.createObjectURL(file),
      file, // Store actual file for FormData
    }));

    dispatch(setSelectedImages([...selectedImages, ...newImages]));
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
    dispatch(getReports());
    if (selectedImages && selectedImages.length > 0) {
      dispatch(setSelectedImages([]));
    }
  }, []);

  const onSubmit = async (data) => {
    const ReportData = new FormData();
    ReportData.append("name", data.name);
    ReportData.append("phoneNumber", data.phoneNumber);
    ReportData.append("address", data.address);

    selectedImages.forEach((image) => {
      ReportData.append("images", image.file);
    });

    try {
      let data = await dispatch(handleAddReport(ReportData)).unwrap();

      if (data.success) {
        dispatch(setSelectedImages([]));
        navigate("/reports");
      } else if (data.message) {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Some thing is wrong", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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

                {/* Image Upload Section */}
                <div className="flex flex-col items-center space-y-4 w-full">
                  <div className="border-2 flex items-center justify-center w-full h-96 relative cursor-pointer">
                    <label
                      htmlFor="fileInput"
                      className="w-full h-full flex items-center justify-center"
                    >
                      {selectedImages && selectedImages.length > 0 ? (
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
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveImage(index);
                                          }}
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
