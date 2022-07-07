import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

import classes from "./notifications.module.css";
import { Link } from "react-router-dom";

function Notification({ notification }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (notification._id) {
      const fetchUser = async () => {
        const fetchUserResponse = await axios.get(
          `http://localhost:5000/user?userId=${notification.userId}`
        );

        setUser(fetchUserResponse.data);
      };

      fetchUser();

      if (notification.postId) {
        const fetchPost = async () => {
          const fetchPostResponse = await axios.get(
            `http://localhost:5000/post/${notification.postId}`
          );

          setPost(fetchPostResponse.data);
        };

        fetchPost();
      }
    }
  }, [notification?.userId, notification._id, notification?.postId]);

  return (
    <div className={classes.notificationDiv}>
      <div className={classes.leftSide}>
        <div className={classes.userImageDiv}>
          <img
            className={classes.userImage}
            src={
              user.profilePicture
                ? `http://localhost:5000/images/${user.profilePicture}`
                : PF + "profileIcon.svg"
            }
            alt="/profileIcon.svg"
          />
        </div>
        <div className={classes.nameAndTimeDiv}>
          <div className={classes.notificationMessage}>
            <Link to={`/profile/${user.username}`}>
              <span className={classes.userName}>{user.name}</span>
            </Link>
            {notification?.message}
          </div>
          <div className={classes.timeAgo}>
            {moment(notification?.createdAt).fromNow()}
          </div>
        </div>
      </div>
      {notification.message !== " started following you" ? (
        <div className={classes.notificationImageDiv}>
          <img
            className={classes.notificationImage}
            src={
              post?.selectedFile
                ? `http://localhost:5000/images/${post?.selectedFile}`
                : null
            }
            alt={"notificationPostImage"}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Notification;
