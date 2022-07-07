import axios from "axios";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../../../context/AuthContext/AuthContext";

import classes from "./postPage.module.css";

function Collection({ collection, post, isPostSaved, setIsPostSaved }) {
  const { currentUser } = useContext(AuthContext);
  const [postImage, setPostImage] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const fetchPostResponse = await axios.get(
        `http://localhost:5000/post/${collection.posts[0]}`
      );

      setPostImage(fetchPostResponse.data);
    };

    fetchPost();
  }, [collection.posts]);

  const addPostToCollection = async (e) => {
    e.preventDefault();

    try {
      const addPostToCollectionResponse = await axios.put(
        `http://localhost:5000/post/addPostToCollection/${currentUser._id}`,
        { collectionTitle: collection.title, post: post._id }
      );

      setIsPostSaved(
        addPostToCollectionResponse.data.updatedPost.isPostSavedToCollection
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removePostFromCollection = async (e) => {
    e.preventDefault();

    try {
      const removePostToCollectionResponse = await axios.put(
        `http://localhost:5000/post/removePostToCollection/${currentUser._id}`,
        { collectionTitle: collection.title, post: post._id }
      );

      setIsPostSaved(
        removePostToCollectionResponse.data.updatedPost.isPostSavedToCollection
      );
    } catch (error) {
      console.error(error);
    }
  };

  const ellipsifyText = (text) => {
    if (text.length > 18) {
      return text.substring(0, 18) + "...";
    } else return text;
  };
  console.log(isPostSaved);
  return (
    <>
      <div className={classes.collectionImageDiv}>
        <img
          className={classes.collectionImage}
          src={
            post._id &&
            `http://localhost:5000/images/${postImage?.selectedFile}`
          }
          alt={post.selectedFile}
        />
      </div>
      <div className={classes.collectionTitle}>
        {ellipsifyText(collection.title)}
      </div>
      <div
        className={classes.saveButton}
        onClick={
          isPostSaved.includes(collection.title)
            ? removePostFromCollection
            : addPostToCollection
        }
      >
        {isPostSaved.length > 0 && isPostSaved.includes(collection.title)
          ? "Remove"
          : "Save"}
      </div>
    </>
  );
}

export default Collection;
