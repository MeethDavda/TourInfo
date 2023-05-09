import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import * as api from "../api";
import "react-toastify/dist/ReactToastify.css";

export const login = createAsyncThunk(
  "auth/login",
  async ({ form, navigate, toast }) => {
    try {
      const response = await api.signIn(form);
      // console.log(response);
      toast.success("Login Successfull");
      navigate("/");
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.message.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ form, navigate, toast }) => {
    try {
      const response = await api.signUp(form);
      // console.log(response);
      toast.success("Resgister Successfull");
      navigate("/");
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.message.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, acton) => {
      state.loading = false;
      state.error = acton.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      (state.loading = false),
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      (state.loading = false), (state.error = action.payload.message);
    },
  },
});

export default authSlice.reducer;
