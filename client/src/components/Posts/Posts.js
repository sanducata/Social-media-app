import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import AuthContext from "../../context/AuthContext/AuthContext";
import DropdownToggleContext from "../../context/DropdownToggleContext/DropdownToggleContext";
import SideMenuToggleContext from "../../context/SideMenuToggleContext";

import Post from "./Post/Post";

import classes from "./posts.module.css";

function Posts({ searchQuery }) {
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const { currentUser } = useContext(AuthContext);
  const { selectValue } = useContext(DropdownToggleContext);
  const [posts, setPosts] = useState([]);
  const location = useLocation().pathname;
  const username = useParams().username;
  const collectionTitle = useParams().collectionName;

  useEffect(() => {
    const fetchPosts = async () => {
      if (location.slice(0, 13) === "/searchPosts/") {
        const searchPosts = async () => {
          const searchPostsResponse = await axios.get(
            `http://localhost:5000/post/search/posts?searchQuery=${searchQuery}`
          );

          setPosts(searchPostsResponse.data);
        };

        if (searchQuery.length > 2) {
          searchPosts();
        }
      } else if (username && location === `/profile/${username}`) {
        const fetchPostsResponse = await axios.get(
          `http://localhost:5000/post/profilePosts/${username}`
        );

        setPosts(
          fetchPostsResponse?.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } else if (location === `/likedPosts/${currentUser.username}`) {
        const fetchPostsResponse = await axios.get(
          `http://localhost:5000/post/likedPosts/${currentUser._id}`
        );

        setPosts(
          fetchPostsResponse?.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } else if (
        location === "/" &&
        selectValue === "Following" &&
        currentUser._id
      ) {
        const fetchPostsResponse = await axios.get(
          `http://localhost:5000/post/following/${currentUser._id}`
        );

        setPosts(
          fetchPostsResponse?.data.posts.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } else if (
        location.slice(0, 16) === "/collectionPage/" &&
        currentUser._id
      ) {
        const fetchPostsResponse = await axios.get(
          `http://localhost:5000/post/collection/getPosts/?userId=${currentUser._id}&collectionTitle=${collectionTitle}`
        );

        setPosts(
          fetchPostsResponse?.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } else {
        const fetchPostsResponse = await axios.get(
          "http://localhost:5000/post/get/allPosts"
        );

        setPosts(
          fetchPostsResponse.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      }
    };
    fetchPosts();
  }, [
    username,
    selectValue,
    currentUser._id,
    location,
    currentUser.username,
    searchQuery,
    collectionTitle,
  ]);

  return (
    <div className={isSideMenuOpen ? classes.postsOpen : classes.postsClosed}>
      <div className={classes.postsWrapper}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
