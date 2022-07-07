import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import AuthContext from "../../../context/AuthContext/AuthContext";
import SideMenuToggleContext from "../../../context/SideMenuToggleContext";

import classes from "./profileInfo.module.css";
import SendMessage from "./SendMessage";

function ProfileInfo() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const { loggedIn, currentUser, setNewNotifications } =
    useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.following?.includes(user._id)
  );
  const [openSendMessage, setOpenSendMessage] = useState(false);
  const username = useParams().username;
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchUserResponse = await axios.get(
        `http://localhost:5000/user?username=${username}`
      );

      setUser(fetchUserResponse.data);
    };
    fetchUser();

    if (currentUser.following?.includes(user._id))
      setFollowed(currentUser.following?.includes(user._id));
  }, [username, currentUser.following, followed, user._id]);

  const follow = async () => {
    try {
      const createdAt = new Date();

      const followResponse = await axios.put(
        `http://localhost:5000/user/follow/${user._id}`,
        {
          currentUser,
          createdAt,
        }
      );

      setFollowed((prev) => !prev);
      setNewNotifications(followResponse.data.newNotifications);
    } catch (error) {
      console.error(error);
    }
  };

  const unfollow = async () => {
    try {
      await axios.put(
        `http://localhost:5000/user/unfollow/${user._id}`,
        currentUser
      );

      setFollowed((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={
        isSideMenuOpen
          ? classes.profileInfoContainerOpen
          : classes.profileInfoContainerClosed
      }
    >
      <div className={classes.profilePictureDiv}>
        <img
          className={classes.profilePicture}
          src={
            user.profilePicture
              ? `http://localhost:5000/images/${user.profilePicture}`
              : PF + "profileIcon.svg"
          }
          alt="/profileIcon.svg"
        />
      </div>
      <div className={classes.userInfo}>
        <p>{user.name}</p>
        <p>{user.occupation}</p>
        {loggedIn && currentUser._id !== user._id ? (
          <div className={classes.followAndMessageButton}>
            {!followed ? (
              <div onClick={follow} className={classes.followButton}>
                Follow
              </div>
            ) : (
              <div onClick={unfollow} className={classes.unfollowButton}>
                Unfollow
              </div>
            )}
            <div
              className={classes.followButton}
              onClick={() => setOpenSendMessage(true)}
            >
              Message
            </div>
            <SendMessage
              openSendMessage={openSendMessage}
              closeSendMessage={() => setOpenSendMessage(false)}
              user={user}
            />
          </div>
        ) : null}
      </div>
      <ul className={classes.profileLinks}>
        <Link to={`/profile/${user.username}`}>
          <li
            className={
              location.pathname === `/profile/${user.username}`
                ? `${classes.profileLink} ${classes.profileLinkActive}`
                : classes.profileLink
            }
          >
            Posts
          </li>
        </Link>
        {username === currentUser.username ? (
          <Link to={`/myCollections/${user.username}`}>
            <li
              className={
                location.pathname === `/myCollections/${user.username}` ||
                location.pathname.slice(0, 16) === "/collectionPage/"
                  ? `${classes.profileLink} ${classes.profileLinkActive}`
                  : classes.profileLink
              }
            >
              My collections
            </li>
          </Link>
        ) : null}
        {username === currentUser.username ? (
          <Link to={`/likedPosts/${currentUser.username}`}>
            <li
              className={
                location.pathname === `/likedPosts/${user.username}`
                  ? `${classes.profileLink} ${classes.profileLinkActive}`
                  : classes.profileLink
              }
            >
              Liked posts
            </li>
          </Link>
        ) : null}
        <Link to={`/about/${user.username}`}>
          <li
            className={
              location.pathname === `/about/${user.username}`
                ? `${classes.profileLink} ${classes.profileLinkActive}`
                : classes.profileLink
            }
          >
            About
          </li>
        </Link>
        {username === currentUser.username ? (
          <Link to="/editProfile">
            <li className={classes.profileLink}>Edit profile</li>
          </Link>
        ) : null}
      </ul>
    </div>
  );
}

export default ProfileInfo;
