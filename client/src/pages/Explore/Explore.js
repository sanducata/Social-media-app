import { useContext, useEffect } from "react";

import AuthContext from "../../context/AuthContext/AuthContext";
import DropdownToggleContext from "../../context/DropdownToggleContext/DropdownToggleContext";

import Topbar from "../../components/Topbar/Topbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import Posts from "../../components/Posts/Posts";
import DropdownButton from "../../components/DropdownButton/DropdownButton";

import classes from "./explore.module.css";

function Explore() {
  const { loggedIn } = useContext(AuthContext);
  const { selectValue } = useContext(DropdownToggleContext);

  useEffect(() => {
    localStorage.setItem("dropdown-button-value", selectValue);
  }, [loggedIn, selectValue]);

  return (
    <div className={classes.exploreContainer}>
      <div className={classes.rightSideContainer}>
        <Topbar />
        <DropdownButton />
        <Posts />
      </div>
      <SideMenu />
    </div>
  );
}

export default Explore;
