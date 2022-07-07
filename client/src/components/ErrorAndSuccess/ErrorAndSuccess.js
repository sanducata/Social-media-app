import { useContext } from "react";

import ErrorAndSuccessContext from "../../context/ErrorAndSuccessContext/ErrorAndSuccessContext";

import classes from "./errorAndSuccess.module.css";

function ErrorAndSuccess() {
  const { errorMessage, successMessage } = useContext(ErrorAndSuccessContext);

  return (
    <>
      {errorMessage ? (
        <div className={classes.error}>{errorMessage}</div>
      ) : (
        <div className={classes.errorDisplayNone}>{errorMessage}</div>
      )}
      {successMessage ? (
        <div className={classes.success}>{successMessage}</div>
      ) : (
        <div className={classes.errorDisplayNone}>{successMessage}</div>
      )}
    </>
  );
}

export default ErrorAndSuccess;
