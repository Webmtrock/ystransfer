import { configureStore } from "@reduxjs/toolkit";
import userroleReducer from "../redux/RoleSlice";

export const Store = configureStore({
  reducer: {
    name: "userrole",
    userrole: userroleReducer,
  },
});
