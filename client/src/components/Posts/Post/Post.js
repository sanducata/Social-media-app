import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AuthContext from "../../../context/AuthContext/AuthContext";
import PostPage from "../PostPage/PostPage";

import classes from "./post.module.css";

function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { loggedIn, currentUser, setNewNotifications } =
    useContext(AuthContext);
  const username = useParams().username;
  const [user, setUser] = useState([]);
  const [like, setLike] = useState(post.likes.length);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [openPostPage, setOpenPostPage] = useState(false);
  const [comments, setComments] = useState(post?.comments);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchUserResponse = await axios.get(
        `http://localhost:5000/user?userId=${post?.userId}`
      );

      setUser(fetchUserResponse.data);
    };

    fetchUser();

    setIsPostLiked(post.likes.includes(currentUser._id));
  }, [username, post.userId, currentUser._id, post.likes]);

  const handleLikePost = async (e) => {
    e.preventDefault();

    try {
      const createdAt = new Date();

      const likePostResponse = await axios.put(
        `http://localhost:5000/post/like/${post._id}`,
        {
          userId: currentUser._id,
          createdAt,
        }
      );

      if (likePostResponse.data.message === "like")
        setNewNotifications(likePostResponse.data.updatedUser.newNotifications);
    } catch (error) {
      console.log(error.message);
    }

    if (loggedIn) {
      setLike(isPostLiked ? like - 1 : like + 1);
      setIsPostLiked((prev) => !prev);
    }
  };

  const ellipsifyText = (text) => {
    if (text.length > 15) {
      return text.substring(0, 15) + "...";
    } else return text;
  };

  return (
    <>
      <div className={classes.postContainer}>
        <div className={classes.postTop} onClick={() => setOpenPostPage(true)}>
          <img
            src={`http://localhost:5000/images/${post.selectedFile}`}
            className={classes.postImg}
            alt={post.selectedFile}
          />
          <div className={classes.postOverlay}>
            <span className={classes.postOverlayText}>
              {ellipsifyText(post.title)}
            </span>
          </div>
        </div>
        <div className={classes.postBottom}>
          <div className={classes.postBottomLeft}>
            <span className={classes.postBottomLeftImgBox}>
              <Link to={`/profile/${user.username}`}>
                <img
                  className={classes.postBottomLeftImg}
                  src={
                    user._id
                      ? `http://localhost:5000/images/${user.profilePicture}`
                      : PF + "profileIcon.svg"
                  }
                  alt={user.profilePicture}
                />
              </Link>
            </span>

            <span className={classes.postBottomLeftName}>
              <Link to={`/profile/${user.username}`}>{user.name}</Link>
            </span>
          </div>
          <div className={classes.postBottomRight}>
            <div className={classes.postBottomRightDiv}>
              {isPostLiked ? (
                <img
                  className={classes.postBottomRightIcon}
                  src={PF + "notificationsIconColor.svg"}
                  alt={PF + "notificationsIconColor.svg"}
                  onClick={handleLikePost}
                />
              ) : (
                <img
                  className={classes.postBottomRightIcon}
                  src={PF + "notificationsIcon.svg"}
                  alt={PF + "notificationsIcon.svg"}
                  onClick={handleLikePost}
                />
              )}
              <span className={classes.postBottomRightText}>{like}</span>
            </div>
            <div className={classes.postBottomRightDiv}>
              <img
                className={classes.postBottomRightIcon}
                src={PF + "comment-solid.svg"}
                alt={PF + "comment-solid.svg"}
                onClick={() => setOpenPostPage(true)}
              />
              <span className={classes.postBottomRightText}>
                {comments?.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      <PostPage
        openPostPage={openPostPage}
        closePostPage={() => setOpenPostPage(false)}
        handleLikePost={handleLikePost}
        isPostLiked={isPostLiked}
        user={user}
        post={post}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
}

export default Post;
