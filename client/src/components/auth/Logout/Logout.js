import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext/AuthContext";
import DropdownToggleContext from "../../../context/DropdownToggleContext/DropdownToggleContext";

function LogoutBtn() {
  const { getLoggedIn } = useContext(AuthContext);
  const { selectValue, setSelectValue } = useContext(DropdownToggleContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await axios.get("http://localhost:5000/auth/logout");

    setSelectValue("All");
    localStorage.setItem("dropdown-button-value", selectValue);

    await getLoggedIn();

    navigate("/");
  }

  return <div onClick={handleLogout}>Logout</div>;
}

export default LogoutBtn;
