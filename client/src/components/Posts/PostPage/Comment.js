import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import classes from "./postPage.module.css";

function Comment({ comment, currentUser, post, setComments }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState();

  useEffect(() => {
    if (comment.userId) {
      const fetchUser = async () => {
        const fetchUserResponse = await axios.get(
          `http://localhost:5000/user?userId=${comment.userId}`
        );

        setUser(fetchUserResponse.data);
      };

      fetchUser();
    }
  }, [comment.userId]);

  const deleteCommentHandler = async (e) => {
    e.preventDefault();

    try {
      const postWithDeletedComment = await axios.delete(
        `http://localhost:5000/post/deleteComment?postId=${post._id}&commentId=${comment.commentId}`
      );

      setComments(postWithDeletedComment.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={classes.commentContent}>
        <div className={classes.commentUser}>
          <div className={classes.commentUserPic}>
            <Link to={`/profile/${user?.username}`}>
              <img
                src={
                  user?._id
                    ? `http://localhost:5000/images/${user?.profilePicture}`
                    : PF + "/images/profileIcon.svg"
                }
                alt="profilePictureUser"
                className={classes.commentUserProfilePic}
              />
            </Link>
          </div>
          <Link to={`/profile/${user?.username}`}>
            <div className={classes.commentUserName}>{user?.name}</div>
          </Link>
        </div>
        <div className={classes.commentText}>{comment?.text}</div>
        <div className={classes.timeAgoDiv}>
          <span className={classes.timeAgo}>
            {moment(comment?.createdAt).fromNow()}
          </span>
          {currentUser._id === comment.userId ? (
            <span
              className={classes.deleteComment}
              onClick={deleteCommentHandler}
            >
              Delete
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Comment;
