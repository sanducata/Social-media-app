import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext/AuthContext";
import { SideMenuToggleContextProvider } from "./context/SideMenuToggleContext";
import { ErrorAndSuccessContextProvider } from "./context/ErrorAndSuccessContext/ErrorAndSuccessContext";
import { DropdownToggleContextProvider } from "./context/DropdownToggleContext/DropdownToggleContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <DropdownToggleContextProvider>
        <ErrorAndSuccessContextProvider>
          <SideMenuToggleContextProvider>
            <Router />
          </SideMenuToggleContextProvider>
        </ErrorAndSuccessContextProvider>
      </DropdownToggleContextProvider>
    </AuthContextProvider>
  );
}

export default App;
