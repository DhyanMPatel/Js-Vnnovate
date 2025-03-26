import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "@/components/ui/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icons from "../../components/ui/Icon";
import profileImage from "../../assets/images/avatar/dummyImage.jpg";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { handleAddPostData } from "./store/postSlice";
import { useNavigate } from "react-router-dom";

// Validation schema for the form fields
const schema = yup
  .object({
    title: yup
      .string()
      .max(100, "Title cannot exceed 100 characters")
      .required("Title is required"),
    content: yup
      .string()
      .min(10, "Post content must be at least 10 characters")
      .required("Content is required"),
    category: yup.string().required("Category is required"),
    tags: yup.string().required("Tags are required"),
    author: yup.string().required("Author is required"),
    status: yup.string().required("Status is required"),
    publish_date: yup.date().required("Publish date is required"),
    seo_title: yup
      .string()
      .max(60, "SEO Title cannot exceed 60 characters")
      .optional(),
    seo_description: yup
      .string()
      .max(160, "SEO Description cannot exceed 160 characters"),
    profile: yup
      .mixed()
      .test(
        "fileFormat",
        "jpeg, png, webp, jpg, svg files are allowed",
        (value) => {
          const supportedFormats = ["jpeg", "png", "webp", "jpg", "svg"];
          if (value && value[0]) {
            return supportedFormats.includes(value[0].name.split(".").pop());
          }
          return true;
        }
      ),
  })
  .required();
const addPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ preview: "", raw: "" });
  const { isLoading } = useSelector((state) => state.postData);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const handleChange = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      setProfile({
        preview: URL.createObjectURL(file),
        raw: file,
      });
      setValue("profile", file); 
    }
    clearErrors(); 
  };

  const onSubmit = async (data) => {
    console.log("Form Data Submitted: ", data);
    let storeData = new FormData();
    storeData.append("title", data.title);
    storeData.append("content", data.content);
    storeData.append("category", data.category);
    storeData.append("tags", data.tags);
    storeData.append("author", data.author);
    storeData.append("status", data.status);
    storeData.append("publish_date", data.publish_date);
    storeData.append("seo_title", data.seo_title);
    storeData.append("seo_description", data.seo_description);

    if (profile.raw) {
      storeData.append("profile", profile.raw);
    }

    let response = await dispatch(handleAddPostData(storeData)).unwrap();
    if (response.data.success) {
      navigate("/posts");
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="space-y-5 profile-page">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-12 col-span-12">
            <Card title="Create Post">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="lg:grid lg:grid-cols-1 gap-6">
                  <div className="flex justify-center">
                    <label htmlFor="upload-button">
                      <div className="relative">
                        <div className="flex justify-center">
                          <img
                            src={
                              profile.preview ? profile.preview : profileImage
                            }
                            alt="profile"
                            className="block lg:h-40 lg:w-40 h-32 w-32 object-cover rounded-full"
                            width="200"
                            height="200"
                          />
                          {errors && errors?.profile && (
                            <span className="  mt-2 text-center text-danger-500 block text-sm">
                              {errors?.profile?.message}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-center absolute top-[85%] left-[53%] cursor-pointer">
                          <Icons icon="heroicons-outline:pencil-square" />
                        </div>
                      </div>
                    </label>
                    <input
                      type="file"
                      name="profile"
                      id="upload-button"
                      style={{ display: "none" }}
                      {...register("profile")}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="lg:grid lg:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium"
                      >
                        Post Title
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter a title for your post"
                        {...register("title")}
                        className={`w-full px-3 py-2 mt-2 border rounded ${
                          errors.title ? "border-red-500" : ""
                        }`}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="seo_description"
                        className="block text-sm font-medium"
                      >
                        SEO Description
                      </label>
                      <input
                        id="seo_description"
                        name="seo_description"
                        type="text"
                        placeholder="Enter SEO Description"
                        {...register("seo_description")}
                        className={`w-full px-3 py-2 mt-2 border rounded ${
                          errors.seo_description ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 gap-6">
                  {/* Category Field */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      {...register("category")}
                      className={`w-full px-3 py-2 mt-2 border rounded ${
                        errors.category ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Category</option>
                      <option value="Technology">Technology</option>
                      <option value="Health">Health</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Business">Business</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium">
                      Tags
                    </label>
                    <input
                      id="tags"
                      name="tags"
                      type="text"
                      placeholder="Enter tags (comma separated)"
                      {...register("tags")}
                      className={`w-full px-3 py-2 mt-2 border rounded ${
                        errors.tags ? "border-red-500" : ""
                      }`}
                    />
                    {errors.tags && (
                      <p className="text-red-500 text-sm">
                        {errors.tags.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium"
                    >
                      Author
                    </label>
                    <input
                      id="author"
                      name="author"
                      type="text"
                      placeholder="Enter author's name "
                      {...register("author")}
                      className={`w-full px-3 py-2 mt-2 border rounded ${
                        errors.author ? "border-red-500" : ""
                      }`}
                    />
                    {errors.author && (
                      <p className="text-red-500 text-sm">
                        {errors.author.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      {...register("status")}
                      className={`w-full px-3 py-2 mt-2 border rounded ${
                        errors.status ? "border-red-500" : ""
                      }`}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-500 text-sm">
                        {errors.status.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="publish_date"
                      className="block text-sm font-medium"
                    >
                      Publish Date
                    </label>
                    <input
                      id="publish_date"
                      name="publish_date"
                      type="date"
                      {...register("publish_date")}
                      className={`w-full px-3 py-2 mt-2 border rounded ${
                        errors.publish_date ? "border-red-500" : ""
                      }`}
                    />
                    {errors.publish_date && (
                      <p className="text-red-500 text-sm">
                        {errors.publish_date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="seo_title"
                      className="block text-sm font-medium"
                    >
                      SEO Title
                    </label>
                    <input
                      id="seo_title"
                      name="seo_title"
                      type="text"
                      placeholder="Enter SEO Title"
                      {...register("seo_title")}
                      className={`w-full px-3 py-2 mt-2 border rounded ${
                        errors.seo_title ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium"
                  >
                    Post Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    placeholder="Write your post content here"
                    rows="5"
                    {...register("content")}
                    className={`w-full px-3 mt-2 py-2 border rounded ${
                      errors.content ? "border-red-500" : ""
                    }`}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm">
                      {errors.content.message}
                    </p>
                  )}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary block w-full text-center"
                  >
                    Create Post
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default addPost;
