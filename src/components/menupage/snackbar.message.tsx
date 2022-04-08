import { Alert, Snackbar } from "@mui/material";

interface IProps {
  open: boolean;
  message: string;
  severity: "success" | "error";
  autoHideDuration?:number;
  onClose?:any
  variant?:any
}

const SnackBarMessage = ({ open, message, severity,autoHideDuration,onClose,...rop }: IProps) => {
  return (
    <Snackbar 
    open={open} 
    autoHideDuration={autoHideDuration?autoHideDuration:6000}
    onClose={onClose}
    {...rop}
    >
      <Alert severity={severity} sx={{ fontSize: 12 }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarMessage;
