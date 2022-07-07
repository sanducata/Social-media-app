import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./search.module.css";

function SearchList({
  openSearchDrowpdown,
  closeSearchDrowpdown,
  searchedUser,
  searchedPost,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    if (searchedUser?._id) {
      const fetchUser = async () => {
        const fetchUserResponse = await axios.get(
          `http://localhost:5000/user?userId=${searchedUser?._id}`
        );

        setUser(fetchUserResponse.data);
      };

      fetchUser();
    }

    if (searchedPost?._id) {
      const fetchPost = async () => {
        const fetchPostResponse = await axios.get(
          `http://localhost:5000/post/${searchedPost?._id}`
        );

        setPost(fetchPostResponse.data);
      };

      fetchPost();
    }
  }, [searchedUser?._id, searchedPost?._id]);

  const ellipsifyText = (text) => {
    if (text.length > 10) {
      return text.substring(0, 7) + "...";
    } else return text;
  };

  if (!openSearchDrowpdown) return null;

  return (
    <div className={classes.searchListContainer}>
      {user?.name ? (
        <div className={classes.listItem}>
          <Link to={`/profile/${user.username}`} className={classes.link}>
            <div className={classes.userProfilePictureDiv}>
              <img
                className={classes.userProfilePicture}
                src={
                  user.profilePicture
                    ? `http://localhost:5000/images/${user.profilePicture}`
                    : PF + "/profileIcon.svg"
                }
                alt="userProfilePict"
              />
            </div>
            <div className={classes.listItemText}>{user.name}</div>
          </Link>
        </div>
      ) : post?._id ? (
        <div className={classes.listItem}>
          <div className={classes.link}>
            <div className={classes.postImageDiv}>
              <img
                className={classes.postImage}
                src={`http://localhost:5000/images/${post?.selectedFile}`}
                alt="postImage"
              />
            </div>
            <div className={classes.listItemText}>
              {ellipsifyText(post?.title)}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SearchList;
