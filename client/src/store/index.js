import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import userSlice from "./userSlice";
import dataSlice from "./dataSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  data: dataSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  // persist 를 통해 유지하고자 하는 값을 배열로 전달. 반대로 blacklist 도 존재
  whitelist: ["user", "data"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "ASYNC_AUTH/fulfilled",
        ],
      },
    }),
});

export default store;
