import React from "react";
import {snackbarContext} from "../Context/SnackbarContext";

export function useSnackbar() {
  const context = React.useContext(snackbarContext);
  if (context === undefined) {
    throw new Error(`useSnackbar must be used within a Provider`);
  }
  return context;
}
