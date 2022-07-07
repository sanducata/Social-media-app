import AboutContent from "../../components/Profile/AboutContent/AboutContent";
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import SideMenu from "../../components/SideMenu/SideMenu";
import Topbar from "../../components/Topbar/Topbar";

import classes from "./profile.module.css";

function About() {
  return (
    <div className={classes.profileContainer}>
      <div className={classes.rightSideContainer}>
        <Topbar />
        <ProfileInfo />
        <AboutContent />
      </div>
      <SideMenu />
    </div>
  );
}

export default About;
