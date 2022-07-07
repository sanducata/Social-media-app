import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../../context/AuthContext/AuthContext";

import classes from "./singleCollection.module.css";

function SingleCollection({ collection }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUser._id) {
      const fetchPostsInACollection = async () => {
        const fetchPostsInACollectionResponse = await axios.get(
          `http://localhost:5000/post/collection/getPosts/?userId=${currentUser._id}&collectionTitle=${collection.title}`
        );

        setPosts(fetchPostsInACollectionResponse.data);
      };

      fetchPostsInACollection();
    }
  }, [currentUser._id, collection.title]);

  return (
    <Link to={`/collectionPage/${collection.title}/${currentUser.username}`}>
      <div className={classes.collectionContainer}>
        <div className={classes.collectionTop}>
          <div className={classes.collectionOverlay}></div>
          <div className={classes.topImage}>
            <img
              className={classes.bigImage}
              src={`http://localhost:5000/images/${
                posts[0] && posts[0].selectedFile
              }`}
              alt={PF}
            />
          </div>
          <div className={classes.bottomImages}>
            <div className={classes.smallImageDiv}>
              {posts.length > 1 ? (
                <img
                  className={classes.smallImage}
                  src={`http://localhost:5000/images/${posts[1].selectedFile}`}
                  alt={posts[1].selectedFile}
                />
              ) : (
                <img
                  className={classes.smallImage}
                  src={PF + "grayImg.png"}
                  alt="grayImg.png"
                />
              )}
            </div>
            <div className={classes.smallImageDiv}>
              {posts.length > 2 ? (
                <img
                  className={classes.smallImage}
                  src={`http://localhost:5000/images/${posts[2].selectedFile}`}
                  alt={posts[2].selectedFile}
                />
              ) : (
                <img
                  className={classes.smallImage}
                  src={PF + "grayImg.png"}
                  alt="grayImg.png"
                />
              )}
            </div>
            <div className={classes.smallImageDiv}>
              {posts.length > 3 ? (
                <img
                  className={classes.smallImage}
                  src={`http://localhost:5000/images/${posts[3].selectedFile}`}
                  alt={posts[3].selectedFile}
                />
              ) : (
                <img
                  className={classes.smallImage}
                  src={PF + "grayImg.png"}
                  alt="grayImg.png"
                />
              )}
            </div>
          </div>
        </div>
        <div className={classes.collectionBottom}>
          <p>
            {collection.title}{" "}
            <span>
              &#40;{collection.posts.length}{" "}
              {collection.posts.length === 1 ? "post" : "posts"}&#41;
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SingleCollection;
