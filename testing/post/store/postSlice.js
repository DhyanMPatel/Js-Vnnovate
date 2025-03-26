import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Axios from "../../../services/api";

const initialState = {
  isAuthenticated: false,
  user: null,
  profile: null,
  isLoading: false,
  passwordUpdated: false,
  notification: [],
  postData: [],
  postDetails: [],
  imgFiles: [],
};

export const handleAddPostData = createAsyncThunk(
  "auth/add-post-data",
  async (data, { dispatch }) => {
    const response = await Axios.post(`/post/create`, data);
    // console.log(`Post Data: `, data);
    if (response.data.success) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw new Error(data.message);
    }
    return response;
  }
);

export const getPosts = createAsyncThunk(
  "auth/getposts",
  async (data, { dispatch }) => {
    // console.log(`Post Data: `, data);
    try {
      const response = await Axios.get("/post/list");
      console.log("API Response:", response);

      if (response.data.success) {
        return response.data.data || [];
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return [];
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return [];
    }
  }
);
export const handleDeletePost = createAsyncThunk(
  "auth/delete-post",
  async (id, { dispatch }) => {
    const response = await Axios.delete(`/post/delete/${id}`);
    console.log(`Post Response: `, response);

    if (response.data.success) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(response.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw new Error(data.message);
    }
    return response;
  }
);
export const handleUpdatePostData = createAsyncThunk(
  "post/update-post-data",
  async ({ id, data }, { dispatch }) => {
    try {
      const response = await Axios.put(`/post/update/${id}`, data);

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return response.data;
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update post", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw error; // Return error
    }
  }
);

export const getPostDetail = createAsyncThunk(
  "post/getPostDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/post/list/${id}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch post details", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue("Failed to fetch post details");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    gotoLogin: (state) => {
      state.passwordUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postData = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getPostDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostDetail.fulfilled, (state, action) => {
        state.isLoading = false;

        state.postDetails = action.payload;
      })
      .addCase(getPostDetail.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(handleAddPostData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleAddPostData.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(handleAddPostData.rejected, (state, action) => {
        state.isLoading = false;
        // Log the error message to debug
        console.error("handleAddPostData rejected:", action.error);
      })
      .addCase(handleDeletePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleDeletePost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(handleDeletePost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(handleUpdatePostData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleUpdatePostData.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedPost = action.payload.data;
        state.postData = state.postData.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
      })
      .addCase(handleUpdatePostData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutSuccess, gotoLogin } = postSlice.actions;
export default postSlice.reducer;
