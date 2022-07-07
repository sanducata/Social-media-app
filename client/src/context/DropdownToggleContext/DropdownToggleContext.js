import { createContext, useState } from "react";

const DropdownToggleContext = createContext();

function DropdownToggleContextProvider({ children }) {
  const [selectValue, setSelectValue] = useState(
    localStorage.getItem("dropdown-button-value")
  );

  return (
    <DropdownToggleContext.Provider value={{ selectValue, setSelectValue }}>
      {children}
    </DropdownToggleContext.Provider>
  );
}

export default DropdownToggleContext;
export { DropdownToggleContextProvider };
