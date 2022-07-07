import axios from "axios";
import { useState } from "react";

import classes from "./editPost.module.css";

function EditPost({ openEditPost, closeEditPost, post }) {
  const [postDetails, setPostDetails] = useState({
    title: post.title,
    description: post.description,
    tags: post.tags,
    selectedFile: post.selectedFile,
  });

  const deletePostHandler = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/post/deletePost/${post._id}/${post.selectedFile}`
      );

      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editPostHandler = async () => {
    try {
      await axios.put(
        `http://localhost:5000/post/editPost/${post._id}`,
        postDetails
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!openEditPost) return null;

  return (
    <div className={classes.overlay} onClick={closeEditPost}>
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.editPostContainer}
        onSubmit={editPostHandler}
      >
        <div className={classes.postTitleDiv}>
          <span>Edit post</span>
          <div className={classes.closeBtn} onClick={closeEditPost}>
            Close
          </div>
        </div>
        <div className={classes.imageAndDetailsDiv}>
          <div className={classes.imageDiv}>
            <img
              src={`http://localhost:5000/images/${post.selectedFile}`}
              alt="postImage"
            />
          </div>
          <div className={classes.detailsDiv}>
            <span className={classes.detailsTitle}>Title</span>
            <span
              className={classes.postTitle}
              contentEditable
              suppressContentEditableWarning="true"
              onInputCapture={(e) =>
                setPostDetails({
                  ...postDetails,
                  title: e.currentTarget.textContent,
                })
              }
            >
              {post.title}
            </span>

            <span className={classes.detailsTitle}>Description</span>
            <span
              className={classes.description}
              contentEditable
              suppressContentEditableWarning="true"
              onInputCapture={(e) =>
                setPostDetails({
                  ...postDetails,
                  description: e.currentTarget.textContent,
                })
              }
            >
              {post?.description}
            </span>
          </div>
        </div>

        <div className={classes.tags}>
          {post?.tags.map((tag, key) => {
            return (
              <div key={key} className={classes.tag}>
                {`#${tag}`}
              </div>
            );
          })}
        </div>

        <div className={classes.buttonsDiv}>
          <span className={classes.deletePost} onClick={deletePostHandler}>
            Delete post
          </span>
          <button type="submit" className={classes.sendMessage}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
