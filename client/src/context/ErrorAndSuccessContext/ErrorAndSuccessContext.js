import React, { createContext, useState } from "react";

const ErrorAndSuccessContext = createContext();

function ErrorAndSuccessContextProvider(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (errorMessage !== "")
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  if (successMessage !== "")
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  return (
    <ErrorAndSuccessContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
      }}
    >
      {props.children}
    </ErrorAndSuccessContext.Provider>
  );
}

export default ErrorAndSuccessContext;
export { ErrorAndSuccessContextProvider };
