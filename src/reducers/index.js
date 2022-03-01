import userReducer from "./user.js";
import responseReducer from "./response.js";
import adminReducer from "./admin.js";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  user: userReducer,
  responses: responseReducer,
  admin: adminReducer,
});

export default rootReducers;
