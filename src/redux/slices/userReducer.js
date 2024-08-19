import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance";

const initialState = {
  user: null,
  loading: false,
  error: "",
};
const registerUser = createAsyncThunk("user/registerUser", (data) => {
  return axiosInstance.post("/users/add", data).then((json) => json.data);
});
const loginUser = createAsyncThunk("user/loginUser", (data) => {
  return axiosInstance.post("/user/login", data).then((json) => json.data);
});
const getUserMe = createAsyncThunk("user/getUserMe", () => {
  return axiosInstance.get("/user/me").then((json) => json.data);
});
const getSingleUser = createAsyncThunk("user/getSingleUser", (id) => {
  return axiosInstance.get(`/users/${id}`).then((json) => json.data);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserMe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserMe.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(getUserMe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default userSlice.reducer;
export { registerUser, loginUser, getUserMe, getSingleUser };
