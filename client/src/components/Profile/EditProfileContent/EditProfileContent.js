import { useContext, useEffect, useState } from "react";

import AuthContext from "../../../context/AuthContext/AuthContext";
import SideMenuToggleContext from "../../../context/SideMenuToggleContext";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

import classes from "./editProfileContent.module.css";
import EditProfileInfo from "./EditProfileInfo";
import SocialLinks from "./SocialLinks";

function EditProfileContent() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const { currentUser, loggedIn } = useContext(AuthContext);
  const [formContent, setFormContent] = useState(1);
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    if (loggedIn) setNewUser(currentUser);
  }, [currentUser, loggedIn]);

  const formDisplay = () => {
    if (formContent === 1) {
      return <EditProfileInfo newUser={newUser} setNewUser={setNewUser} />;
    } else if (formContent === 2) {
      return <SocialLinks newUser={newUser} setNewUser={setNewUser} />;
    } else if (formContent === 3) {
      return <ChangePassword newUser={newUser} setNewUser={setNewUser} />;
    } else {
      return <DeleteAccount newUser={newUser} setNewUser={setNewUser} />;
    }
  };

  return (
    <div
      className={
        isSideMenuOpen ? classes.editProfileOpen : classes.editProfileClosed
      }
    >
      <div className={classes.editProfileWrapper}>
        <div className={classes.titleDiv}>
          <div className={classes.profilePictureDiv}>
            <img
              className={classes.profilePicture}
              src={
                currentUser.profilePicture
                  ? `http://localhost:5000/images/${currentUser.profilePicture}`
                  : PF + "/profileIcon.svg"
              }
              alt="/profileIcon.svg"
            />
          </div>
          <div className={classes.textDiv}>
            <span className={classes.spanTitle}>
              {currentUser.name} <span className={classes.spanContent}>/</span>
              Edit profile
            </span>
            <span className={classes.spanSubtitle}>Set up your profile</span>
          </div>
        </div>
        <div className={classes.formDiv}>
          <ul className={classes.formLinks}>
            <li
              className={classes.formLink}
              onClick={() => {
                setFormContent(1);
              }}
            >
              <div
                className={
                  formContent === 1
                    ? classes.activeMarkShow
                    : classes.activeMark
                }
              ></div>
              Profile information
            </li>
            <li
              className={classes.formLink}
              onClick={() => {
                setFormContent(2);
              }}
            >
              <div
                className={
                  formContent === 2
                    ? classes.activeMarkShow
                    : classes.activeMark
                }
              ></div>
              Social links
            </li>
            <li
              className={classes.formLink}
              onClick={() => {
                setFormContent(3);
              }}
            >
              <div
                className={
                  formContent === 3
                    ? classes.activeMarkShow
                    : classes.activeMark
                }
              ></div>
              Password
            </li>
            <li
              className={`${classes.formLink} ${classes.redText}`}
              onClick={() => {
                setFormContent(4);
              }}
            >
              <div
                className={
                  formContent === 4
                    ? classes.activeMarkShow
                    : classes.activeMark
                }
              ></div>
              Delete account
            </li>
          </ul>
          {formDisplay()}
        </div>
      </div>
    </div>
  );
}

export default EditProfileContent;
