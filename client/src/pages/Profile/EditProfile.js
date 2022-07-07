import Topbar from "../../components/Topbar/Topbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import EditProfileContent from "../../components/Profile/EditProfileContent/EditProfileContent";

import classes from "./profile.module.css";

function EditProfile() {
  return (
    <div className={classes.profileContainer}>
      <div className={classes.rightSideContainer}>
        <Topbar />
        <EditProfileContent />
      </div>
      <SideMenu />
    </div>
  );
}

export default EditProfile;
