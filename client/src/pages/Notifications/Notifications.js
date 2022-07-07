import axios from "axios";
import { useContext, useEffect } from "react";

import SideMenu from "../../components/SideMenu/SideMenu";
import Topbar from "../../components/Topbar/Topbar";
import AuthContext from "../../context/AuthContext/AuthContext";
import SideMenuToggleContext from "../../context/SideMenuToggleContext";
import Notification from "./Notification";

import classes from "./notifications.module.css";

function Notifications() {
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const { notifications, setNotifications, setNewNotifications, currentUser } =
    useContext(AuthContext);

  useEffect(() => {
    if (currentUser?._id) {
      const setUserNotifications = async () => {
        const setNotificationsResponse = await axios.put(
          `http://localhost:5000/user/setNotifications/${currentUser?._id}`
        );

        setNotifications(
          setNotificationsResponse.data.notifications.sort(
            (notification1, notification2) => {
              return (
                new Date(notification2.createdAt) -
                new Date(notification1.createdAt)
              );
            }
          )
        );

        setNewNotifications([]);
      };

      setUserNotifications();
    }
  }, [setNotifications, currentUser._id, setNewNotifications]);

  return (
    <div className={classes.notificationsContainer}>
      <div className={classes.rightSideContainer}>
        <Topbar />
        <div
          className={
            isSideMenuOpen
              ? classes.notificationsOpen
              : classes.notificationsClosed
          }
        >
          <div className={classes.notificationsWrapper}>
            <div className={classes.notificationsTitle}>Notifications</div>
            <ul className={classes.notifications}>
              {notifications?.map((notification, key) => (
                <li key={key} className={classes.notification}>
                  <Notification notification={notification} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <SideMenu />
    </div>
  );
}

export default Notifications;
