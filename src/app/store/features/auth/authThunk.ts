import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";
// import { endpoints } from "@/api/endpoints";
// import { api } from "@/api";

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (_: LoginData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(loginStart());
      // const response = await api.post(endpoints.auth.login, data);
      // const { token, user } = response.data;
      localStorage.setItem("authToken", "token"); // 💡 Save token in localStorage
      dispatch(loginSuccess({
        user: {
          id: "1",
          name: "name",
          role: "admin",
        }, token: "token"
      }));
    } catch (error) {
      const message = "ERROR";
      dispatch(loginFailure(message));
      return rejectWithValue(message);
    }
  }
);