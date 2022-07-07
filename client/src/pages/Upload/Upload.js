import { SideMenuToggleContextProvider } from "../../context/SideMenuToggleContext";
import Topbar from "../../components/Topbar/Topbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import UploadBtn from "../../components/UploadBtn/UploadBtn";

import classes from "./upload.module.css";

function Upload() {
  return (
    <SideMenuToggleContextProvider>
      <div className={classes.uploadContainer}>
        <div className={classes.rightSideContainer}>
          <Topbar />
          <UploadBtn />
        </div>
        <SideMenu />
      </div>
    </SideMenuToggleContextProvider>
  );
}

export default Upload;
