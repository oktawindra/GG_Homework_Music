import { configureStore } from "@reduxjs/toolkit";
import accessTokenReducer from "./AccessTokenReducer";

export default configureStore({
    reducer: {
        dataAccessToken: accessTokenReducer
    }
}); 