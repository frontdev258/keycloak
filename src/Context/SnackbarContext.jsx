import {Alert, Snackbar} from "@mui/material";
import {createContext, useState} from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

export const snackbarContext = createContext(undefined);

export const SnackbarProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const [variant, setVariant] = useState("info");

  const openSnackbar = (message, variant) => {
    setIsOpen(true);
    setMessage(message);
    setVariant(variant);
  };

  const closeSnackbar = () => {
    setIsOpen(false);
  };

  const {children} = props;

  return (
    <snackbarContext.Provider value={openSnackbar}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={variant}
          sx={{minWidth: "300px", border: (theme) => `1px solid ${theme.palette[variant].main}`}}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </snackbarContext.Provider>
  );
};

export const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};
