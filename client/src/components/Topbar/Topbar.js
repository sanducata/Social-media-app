import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext/AuthContext";
import SideMenuToggleContext from "../../context/SideMenuToggleContext";
import LogoutBtn from "../auth/Logout/Logout";
import Search from "../Search/Search";

import classes from "./topbar.module.css";

function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const { loggedIn, currentUser } = useContext(AuthContext);

  return (
    <div className={isSideMenuOpen ? classes.topbarOpen : classes.topbarClosed}>
      <div className={classes.topbarWrapper}>
        <Search />
        {loggedIn ? (
          <div className={classes.dropdownProfile}>
            <Link
              to={`/profile/${currentUser.username}`}
              className={classes.links}
            >
              <div className={classes.dropbtnProfile}>
                <img
                  src={
                    currentUser.profilePicture
                      ? `http://localhost:5000/images/${currentUser.profilePicture}`
                      : PF + "profileIcon.svg"
                  }
                  alt="profileImageTopbar"
                  className={
                    currentUser.profilePicture
                      ? classes.profileImg
                      : classes.noProfileImg
                  }
                />
              </div>
            </Link>

            <div className={classes.dropdownContentProfile}>
              <Link
                to={`/profile/${currentUser.username}`}
                className={classes.links}
              >
                <div className={classes.dropdownListItem}>Profile</div>
              </Link>
              <Link to="/editProfile" className={classes.links}>
                <div className={classes.dropdownListItem}>Edit profile</div>
              </Link>
              <Link to={`/myCollections/${currentUser.username}`}>
                <div className={classes.dropdownListItem}>My collections</div>
              </Link>
              <div className={classes.dropdownListItem}>
                <LogoutBtn />
              </div>
            </div>
          </div>
        ) : null}

        {loggedIn ? (
          <Link to="/upload" className={classes.links}>
            <div className={classes.uploadButton}>
              <img
                className={classes.uploadButtonImg}
                src={PF + "/uploadIcon.svg"}
                alt="uploadButtonIcon"
              />
              Upload
            </div>
          </Link>
        ) : (
          <>
            <Link to="/login" className={classes.links}>
              <div className={classes.loginButton}>Log in</div>
            </Link>
            <Link to="/register" className={classes.links}>
              <div className={classes.registerButton}>Register</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Topbar;
