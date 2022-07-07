import { createContext, useState } from "react";

const SideMenuToggleContext = createContext();

function SideMenuToggleContextProvider({ children }) {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleMenu = () => {
    setSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <SideMenuToggleContext.Provider value={{ isSideMenuOpen, toggleMenu }}>
      {children}
    </SideMenuToggleContext.Provider>
  );
}

export default SideMenuToggleContext;
export { SideMenuToggleContextProvider };
