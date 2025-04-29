// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

// ** UseJWT import to get config
import useJwt from "@src/auth/jwt/useJwt";

const config = useJwt.jwtConfig;

const initialUser = () => {
  const item = window.localStorage.getItem("userData");

  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};

const initialRole = () => {
  const item = window.localStorage.getItem("userRole");
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};
export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    userData: initialUser(),
    userRole: initialRole(),
    twoFactoreAuth: null,
  },
  reducers: {
    handleUser: (state, action) => {
      state.userRole = action.payload;

      state[config.emailName] = action.payload[config.emailName];
      // state[config.tokenState] = action.payload[config.tokenState];

      state[config.roleName] = action.payload[config.roleName];

      localStorage.setItem("userRole", JSON.stringify(action.payload));

      localStorage.setItem(
        config.emailName,
        JSON.stringify(action.payload.email)
      );
      localStorage.setItem(
        config.roleName,
        JSON.stringify(action.payload.role)
      );
      // localStorage.setItem(
      //   config.tokenState,
      //   JSON.stringify(action.payload.token)
      // );
    },

    handleLogin: (state, action) => {
      state.userData = action.payload;
      state[config.storageTokenKeyName] =
        action.payload[config.storageTokenKeyName];
      state[config.storageRefreshTokenKeyName] =
        action.payload[config.storageRefreshTokenKeyName];
      state[config.token] = action.payload[config.token];
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem(
        config.storageTokenKeyName,
        JSON.stringify(action.payload.token)
      );
      localStorage.setItem(
        config.storageRefreshTokenKeyName,
        JSON.stringify(action.payload.token)
      );
      localStorage.setItem(config.token, JSON.stringify(action.payload.token));
    },

    handleLogout: (state) => {
      state.userData = {};
      state.userRole = {};
      state[config.accessToken] = {};
      state[config.refreshToken] = null;
      state[config.token] = {};
      state[config.storageTokenKeyName] = {};
      state[config.storageRefreshTokenKeyName] = {};

      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem("userData");
      localStorage.removeItem("userRole");
      localStorage.removeItem(config.token);
      localStorage.removeItem(config.accessToken);
      localStorage.removeItem(config.refreshToken);
      localStorage.removeItem(config.storageTokenKeyName);
      localStorage.removeItem(config.storageRefreshTokenKeyName);
    },
  },
});

export const { handleLogin, handleLogout, handleUser } = authSlice.actions;

export default authSlice.reducer;
