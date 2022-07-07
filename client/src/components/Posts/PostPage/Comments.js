import axios from "axios";
import { useContext, useRef, useState } from "react";

import AuthContext from "../../../context/AuthContext/AuthContext";

import Comment from "./Comment";

import classes from "./postPage.module.css";

function Comments({ post, comments, setComments }) {
  const { currentUser, setNewNotifications } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [newComment, setNewComment] = useState({
    text: "",
    userId: currentUser._id,
  });
  const commentRef = useRef();

  async function sendCommentHandler(e) {
    e.preventDefault();

    try {
      const createdAt = new Date();

      newComment.createdAt = createdAt;

      const newComments = await axios.put(
        `http://localhost:5000/post/comment/${post._id}`,
        newComment
      );

      setComments(newComments.data.updatedPost.comments);
      setNewComment({
        text: "",
        userId: currentUser._id,
      });
      setNewNotifications(newComments.data.updatedUser.newNotifications);

      commentRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        Comments &#40;<span>{comments?.length}&#41;</span>
      </div>
      <div className={classes.commentsDiv}>
        <form onSubmit={sendCommentHandler} className={classes.textareaForm}>
          {/^\s*$/.test(newComment.text) ? (
            <textarea
              id="textarea"
              className={classes.commentsTextareaCollapsed}
              placeholder="Write a comment..."
              onChange={(e) =>
                setNewComment({ ...newComment, text: e.target.value })
              }
              value={newComment.text}
            />
          ) : (
            <textarea
              id="textarea"
              className={classes.commentsTextarea}
              placeholder="Write a comment..."
              onChange={(e) =>
                setNewComment({ ...newComment, text: e.target.value })
              }
              value={newComment.text}
            />
          )}
          <label htmlFor="textarea">
            <div className={classes.sendButtonDiv}>
              {/^\s*$/.test(newComment.text) ? (
                <button
                  disabled
                  type="submit"
                  className={classes.sendCommentDisabled}
                >
                  Send
                </button>
              ) : (
                <button type="submit" className={classes.sendComment}>
                  Send
                </button>
              )}
            </div>
          </label>
        </form>

        <ul className={classes.allComments}>
          {comments.length === 0 ? (
            <div className={classes.noCommentsDiv}>
              <img
                className={classes.noCommentsIcon}
                src={PF + "/noCommentsIcon.svg"}
                alt="noCommentsIcon"
              />
              <span className={classes.noCommentsText}>
                Be the first one who comments on this post!
              </span>
            </div>
          ) : (
            comments.map((comment, key) => (
              <li className={classes.comment} key={key}>
                <Comment
                  comment={comment}
                  currentUser={currentUser}
                  post={post}
                  setComments={setComments}
                />
              </li>
            ))
          )}
          <div ref={commentRef} />
        </ul>
      </div>
    </>
  );
}

export default Comments;
