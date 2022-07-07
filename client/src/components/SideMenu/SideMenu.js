import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import AuthContext from "../../context/AuthContext/AuthContext";
import SideMenuToggleContext from "../../context/SideMenuToggleContext";

import classes from "./sideMenu.module.css";

function SideMenu() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { isSideMenuOpen, toggleMenu } = useContext(SideMenuToggleContext);
  const { loggedIn, newNotifications, conversations } = useContext(AuthContext);
  const location = useLocation();

  const toggleHandler = () => {
    toggleMenu();
  };

  return (
    <div
      className={isSideMenuOpen ? classes.sideMenuOpen : classes.sideMenuClosed}
    >
      <Link to="/" className={classes.links}>
        <div className={classes.logo}>
          <img
            src={PF + "nspireLogo.svg"}
            className={classes.logoImg}
            alt="logo"
          />
          <span
            className={isSideMenuOpen ? classes.logoText : classes.logoTextNone}
          >
            nspire.
          </span>
        </div>
      </Link>
      <div className={classes.menuButton} onClick={toggleHandler}>
        <div className={classes.menuButtonLine}>
          <div className={classes.menuButtonBar}></div>
          <div
            className={
              !isSideMenuOpen
                ? classes.menuButtonDot
                : classes.menuButtonDotNone
            }
          ></div>
        </div>
        <div className={classes.menuButtonLine}>
          <div
            className={
              !isSideMenuOpen
                ? classes.menuButtonDot
                : classes.menuButtonDotNone
            }
          ></div>
          <div className={classes.menuButtonBar}></div>
        </div>
        <div className={classes.menuButtonLine}>
          <div className={classes.menuButtonBar}></div>
          <div
            className={
              !isSideMenuOpen
                ? classes.menuButtonDot
                : classes.menuButtonDotNone
            }
          ></div>
        </div>
      </div>
      <ul className={classes.sideMenuLinks}>
        <Link to="/" className={`${classes.links} ${classes.leftSideLinks}`}>
          <li className={classes.listLine}>
            <div
              className={
                location.pathname === "/"
                  ? classes.showActiveMark
                  : classes.activeMark
              }
            ></div>
            <img
              className={classes.listLineImg}
              src={PF + "exploreIcon.svg"}
              alt="exploreIcon"
            />
            <div
              className={isSideMenuOpen ? classes.displayNone : classes.tooltip}
            >
              <div className={classes.tooltipArrow}></div>
              Explore
            </div>
            <span
              className={
                isSideMenuOpen ? classes.listLineText : classes.displayNone
              }
            >
              Explore
            </span>
          </li>
        </Link>
        {loggedIn ? (
          <>
            <Link
              to="/notifications"
              className={`${classes.links} ${classes.leftSideLinks}`}
            >
              <li className={classes.listLine}>
                <div
                  className={
                    location.pathname === "/notifications"
                      ? classes.showActiveMark
                      : classes.activeMark
                  }
                ></div>
                <img
                  className={classes.listLineImg}
                  src={PF + "notificationsIcon.svg"}
                  alt="notificationsIcon"
                />
                {newNotifications.length !== 0 ? (
                  <div className={classes.notificationNumber}></div>
                ) : null}
                <div
                  className={
                    isSideMenuOpen ? classes.displayNone : classes.tooltip
                  }
                >
                  <div className={classes.tooltipArrow}></div>
                  Notifications
                </div>
                <span
                  className={
                    isSideMenuOpen ? classes.listLineText : classes.displayNone
                  }
                >
                  Notifications
                </span>
              </li>
            </Link>
            <Link
              to="/messages"
              className={`${classes.links} ${classes.leftSideLinks}`}
            >
              <li className={classes.listLine}>
                <div
                  className={
                    location.pathname === "/messages"
                      ? classes.showActiveMark
                      : classes.activeMark
                  }
                ></div>
                <img
                  className={classes.listLineImg}
                  src={PF + "messagesIcon.svg"}
                  alt="messagesIcon"
                />
                {conversations.some(
                  (conversation) =>
                    conversation.newMessages &&
                    conversation.newMessages.length !== 0
                ) ? (
                  <div className={classes.notificationNumber}></div>
                ) : null}
                <div
                  className={
                    isSideMenuOpen ? classes.displayNone : classes.tooltip
                  }
                >
                  <div className={classes.tooltipArrow}></div>
                  Messages
                </div>
                <span
                  className={
                    isSideMenuOpen ? classes.listLineText : classes.displayNone
                  }
                >
                  Messages
                </span>
              </li>
            </Link>
          </>
        ) : null}
      </ul>
    </div>
  );
}

export default SideMenu;
