import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import rootSlice from "./rootslice";
import orderslice from "./orderslice";
import fleetSlice from "./fleetSlice";
import ShoptSlice from "./shopSlice";
import DriverSlice from "./driverSlice";
import SnackbarReducer from "./snackbarSlice";
import WarehouseReducer from "./warehouse";
import { loadingMiddleware } from "./middleware/loading";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    root: rootSlice,
    order: orderslice,
    fleet: fleetSlice,
    shop: ShoptSlice,
    driver: DriverSlice,
    snackbar: SnackbarReducer,
    warehouse: WarehouseReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(loadingMiddleware), 
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;