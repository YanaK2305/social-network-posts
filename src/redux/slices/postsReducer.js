import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance";

const initialState = {
  posts: [],
  loading: false,
  error: "",
  page: 1,
  totalPosts: 0,
  userPosts: [],
  search: "",
  sort: "id",
};

const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  (data, { getState }) => {
    const state = getState();
    const params = new URLSearchParams();
    params.append("limit", 10);
    params.append("skip", state.posts.page * 10);
    params.append("sortBy", state.posts.sort);
    params.append("q", state.posts.search);
    if (state.posts.sort === "views") {
      params.append("order", "desc");
    } else {
      params.append("order", "asc");
    }
    return axiosInstance
      .get(`/posts/search`, { params })
      .then((json) => json.data);
  }
);

const getAllPostsByUserId = createAsyncThunk(
  "posts/getAllPostsByUserId",
  (userid) => {
    return axiosInstance.get(`/posts/user/${userid}`).then((json) => json.data);
  }
);

const createPost = createAsyncThunk("posts/createPost", (data) => {
  return axiosInstance.post("/posts/add", data).then((json) => json.data);
});
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      console.log(action.payload);
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.total;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllPostsByUserId.fulfilled, (state, action) => {
      state.userPosts = action.payload.posts;
      console.log(action.payload);
    });
  },
});
export default postsSlice.reducer;
export { getAllPosts, getAllPostsByUserId, createPost };
export const { setPage, setSearch, setSort } = postsSlice.actions;
