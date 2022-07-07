import axios from "axios";
import { useContext, useState } from "react";

import AuthContext from "../../../context/AuthContext/AuthContext";
import Collection from "./Collection";

import classes from "./postPage.module.css";

function AddToCollection({
  openSavePostPanel,
  closeSavePostPanel,
  post,
  isPostSaved,
  setIsPostSaved,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { currentUser } = useContext(AuthContext);
  const [collections, setCollections] = useState(currentUser?.collections);
  const [newCollection, setNewCollection] = useState({ collectionName: "" });

  const createCollectionHandler = async (e) => {
    e.preventDefault();

    try {
      const newCollections = await axios.put(
        `http://localhost:5000/user/createCollection/${currentUser._id}`,
        { newCollection: newCollection, post: post }
      );

      setCollections(newCollections.data.updatedUser.collections);
      setIsPostSaved(newCollections.data.updatedPost.isPostSavedToCollection);
    } catch (error) {
      console.error(error);
    }
  };

  if (!openSavePostPanel) return null;

  return (
    <div className={classes.overlay} onClick={closeSavePostPanel}>
      <div
        className={classes.addToCollectionDiv}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {collections.length > 0 ? (
          <div className={classes.collectionsDiv}>
            <div className={classes.collectionsText}>
              Your collections &#40;{collections.length}&#41;
            </div>
            <ul className={classes.allCollections}>
              {collections.map((collection, key) => {
                return (
                  <li key={key} className={classes.collection}>
                    <Collection
                      collection={collection}
                      isPostSaved={isPostSaved}
                      setIsPostSaved={setIsPostSaved}
                      post={post}
                    />
                    <div
                      className={
                        isPostSaved.length > 0 &&
                        isPostSaved.includes(collection.title)
                          ? classes.showActiveMark
                          : classes.activeMark
                      }
                    ></div>
                  </li>
                );
              })}
            </ul>
            <div className={classes.createCollectionDiv}>
              <div className={classes.collectionsText}>
                Create new collection
              </div>
              <div className={classes.inputAndButton}>
                <input
                  type="text"
                  maxLength="30"
                  placeholder="Collection name"
                  className={classes.newCollectionInput}
                  onChange={(e) => {
                    setNewCollection({ collectionName: e.target.value });
                  }}
                />
                <div
                  className={classes.createCollectionButton}
                  onClick={createCollectionHandler}
                >
                  <img
                    className={classes.uploadButtonImg}
                    src={PF + "uploadIcon.svg"}
                    alt="uploadButtonIcon"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.noCollectionsDiv}>
            <div className={classes.collectionsText}>
              You have no collections yet. Create one
            </div>
            <div className={classes.createCollectionDiv}>
              <input
                type="text"
                placeholder="Collection name"
                maxLength="30"
                className={classes.newCollectionInput}
                onChange={(e) => {
                  setNewCollection({ collectionName: e.target.value });
                }}
              />
              <div
                className={classes.createCollectionButton}
                onClick={createCollectionHandler}
              >
                <img
                  className={classes.uploadButtonImg}
                  src={PF + "uploadIcon.svg"}
                  alt="uploadButtonIcon"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddToCollection;
