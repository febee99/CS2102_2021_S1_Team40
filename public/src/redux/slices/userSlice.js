import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";
import { signoutCareTaker, setCareTaker } from "./careTakerSlice";
import { signoutPetOwner } from "./petOwnerSlice";
import { setLoginError } from "./loginErrorSlice";
import { setLeave } from "./leaveSlice";
import { setMessage } from "./snackbarSlice";

const USER_STATE_KEY = "user";
const persistedUser = loadState(USER_STATE_KEY);

export const userSlice = createSlice({
  name: "user",
  initialState: persistedUser,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export const getUserFromDb = (username, password) => (dispatch) => {
  fetch(`${API_HOST}/users/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ password: password }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(USER_STATE_KEY, result.data);
        dispatch(setMessage("Login Success!"));
        dispatch(setUser(result.data));
      } else {
        removeState("loginerror");
        dispatch(setLoginError(null));
        saveState("loginerror", result.message);
        dispatch(setLoginError(JSON.stringify(result.message)));
      }
    });
  //.catch((err) => alert(err));
};

export const signoutUser = () => (dispatch) => {
  dispatch(signoutPetOwner());
  dispatch(signoutCareTaker());
  removeState(USER_STATE_KEY);
  removeState("caretaker");
  dispatch(setCareTaker(null));
  dispatch(setUser(null));
  removeState("leaves");
  dispatch(setLeave(null));
  dispatch(setMessage("You have been logged out!"));
};

export const selectUser = (state) => state.user;

export default userSlice.reducer;
