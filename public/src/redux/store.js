import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/example/counterSlice";
import userReducer from "./slices/userSlice";
import careTakerReducer from "./slices/careTakerSlice";
import petOwnerReducer from "./slices/petOwnerSlice";
import signUpErrorReducer from "./slices/signUpErrorSlice";
import loginErrorReducer from "./slices/loginErrorSlice";
import findCaretakerReducer from "./slices/findCareTakerSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    caretaker: careTakerReducer,
    petowner: petOwnerReducer,
    signuperror: signUpErrorReducer,
    loginerror: loginErrorReducer,
    findcaretaker: findCaretakerReducer,
  },
});

export default store;
