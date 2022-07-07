import Topbar from "../../components/Topbar/Topbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import Posts from "../../components/Posts/Posts";
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";

import classes from "./profile.module.css";

function LikedPosts() {
  return (
    <div className={classes.profileContainer}>
      <div className={classes.rightSideContainer}>
        <Topbar />
        <ProfileInfo />
        <Posts />
      </div>
      <SideMenu />
    </div>
  );
}

export default LikedPosts;
