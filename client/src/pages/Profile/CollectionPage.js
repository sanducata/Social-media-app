import { useContext } from "react";
import { useParams } from "react-router-dom";

import Posts from "../../components/Posts/Posts";
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import SideMenu from "../../components/SideMenu/SideMenu";
import Topbar from "../../components/Topbar/Topbar";
import SideMenuToggleContext from "../../context/SideMenuToggleContext";

import classes from "./profile.module.css";

function CollectionPage() {
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const collectionTitle = useParams().collectionName;

  return (
    <div className={classes.profileContainer}>
      <div className={classes.rightSideContainer}>
        <Topbar />
        <ProfileInfo />
        <div
          className={
            isSideMenuOpen
              ? classes.collectionTitleOpen
              : classes.collectionTitleClosed
          }
        >
          <h1 className={classes.wrapper}>
            Collections&#160;&#47;&#160;<span>{collectionTitle}</span>
          </h1>
        </div>
        <Posts />
      </div>
      <SideMenu />
    </div>
  );
}

export default CollectionPage;
