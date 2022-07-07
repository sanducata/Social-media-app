import Topbar from "../../components/Topbar/Topbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import Collections from "../../components/Collections/Collections";

import classes from "./profile.module.css";

function MyCollections() {
  return (
    <div className={classes.profileContainer}>
      <div className={classes.rightSideContainer}>
        <Topbar />
        <ProfileInfo />
        <Collections />
      </div>
      <SideMenu />
    </div>
  );
}

export default MyCollections;
