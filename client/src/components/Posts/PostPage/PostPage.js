import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../../context/AuthContext/AuthContext";
import EditPost from "../EditPost/EditPost";
import AddToCollection from "./AddToCollection";
import Comments from "./Comments";

import classes from "./postPage.module.css";

function PostPage({
  openPostPage,
  closePostPage,
  handleLikePost,
  isPostLiked,
  user,
  post,
  comments,
  setComments,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { loggedIn, currentUser } = useContext(AuthContext);
  const [openSavePostPanel, setOpenSavePostPanel] = useState(false);
  const [isPostSaved, setIsPostSaved] = useState(post?.isPostSavedToCollection);
  const [openEditPost, setOpenEditPost] = useState(false);

  if (!openPostPage) return null;

  return (
    <div className={classes.overlay} onClick={closePostPage}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.postPageContainer}
      >
        <div className={classes.side}>
          <div className={classes.postTitleDiv}>
            <div className={classes.titleDivSide}>
              <div className={classes.userProfilePicDiv}>
                <Link to={`/profile/${user.username}`}>
                  <img
                    className={classes.userProfilePic}
                    src={
                      user.profilePicture
                        ? `http://localhost:5000/images/${user.profilePicture}`
                        : PF + "/profileIcon.svg"
                    }
                    alt="userProfilePicture"
                  />
                </Link>
              </div>
              <div className={classes.titleAndName}>
                <h1 className={classes.postTitle}>{post.title}</h1>

                <span>
                  <Link
                    to={`/profile/${user.username}`}
                    className={classes.userName}
                  >
                    {user.name}
                  </Link>
                </span>
              </div>
            </div>
            <div className={classes.titleDivSide}>
              {isPostLiked ? (
                <div
                  className={`${classes.iconWrapperColor} ${classes.iconWrapper}`}
                  onClick={handleLikePost}
                >
                  <img
                    className={classes.likeAndSaveImg}
                    src={PF + "notificationsIconColor.svg"}
                    alt={PF + "notificationsIconColor.svg"}
                  />
                </div>
              ) : (
                <div className={classes.iconWrapper} onClick={handleLikePost}>
                  <img
                    className={classes.likeAndSaveImg}
                    src={PF + "notificationsIcon.svg"}
                    alt={PF + "notificationsIcon.svg"}
                  />
                </div>
              )}

              {loggedIn ? (
                isPostSaved?.length > 0 ? (
                  <div
                    className={`${classes.iconWrapperColor} ${classes.iconWrapper}`}
                    onClick={() => setOpenSavePostPanel(true)}
                  >
                    <img
                      className={classes.likeAndSaveImg}
                      src={PF + "save-post-color.svg"}
                      alt={PF + "save-post-color.svg"}
                    />
                  </div>
                ) : (
                  <div
                    className={classes.iconWrapper}
                    onClick={() => setOpenSavePostPanel(true)}
                  >
                    <img
                      className={classes.likeAndSaveImg}
                      src={PF + "save-post.svg"}
                      alt={PF + "save-post.svg"}
                    />
                  </div>
                )
              ) : null}
              <AddToCollection
                openSavePostPanel={openSavePostPanel}
                closeSavePostPanel={() => setOpenSavePostPanel(false)}
                isPostSaved={isPostSaved}
                setIsPostSaved={setIsPostSaved}
                post={post}
              />
            </div>
          </div>
          {post.userId === currentUser._id ? (
            <div className={classes.edit} onClick={() => setOpenEditPost(true)}>
              <div>
                <span>Edit post</span>
                <img
                  className={classes.editIcon}
                  src={PF + "editPost.svg"}
                  alt="editPostIcon"
                />
              </div>
            </div>
          ) : null}
          <EditPost
            openEditPost={openEditPost}
            closeEditPost={() => setOpenEditPost(false)}
            post={post}
          />
          <div className={classes.imageDiv}>
            <img
              src={`http://localhost:5000/images/${post.selectedFile}`}
              alt="postImage"
            />
          </div>
          <div className={classes.description}>{post?.description}</div>
          <div className={classes.tags}>
            {post?.tags.map((tag, key) => {
              return (
                <div key={key} className={classes.tag}>
                  {`#${tag}`}
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.side}>
          <div className={classes.closeBtn} onClick={closePostPage}>
            Close
          </div>
          <Comments post={post} comments={comments} setComments={setComments} />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
