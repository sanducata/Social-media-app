import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import SearchList from "./SearchList";

import classes from "./search.module.css";
import { Link } from "react-router-dom";

function Search() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [openSearchDrowpdown, setOpenSearchDrowpdown] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const searchUsers = async () => {
      const searchUsersResponse = await axios.get(
        `http://localhost:5000/user/searchUsers?searchQuery=${searchQuery}`
      );

      setUsers(searchUsersResponse.data);
    };

    const searchPosts = async () => {
      const searchPostsResponse = await axios.get(
        `http://localhost:5000/post/search/posts?searchQuery=${searchQuery}`
      );

      setPosts(searchPostsResponse.data);
    };

    if (searchQuery.length > 2) {
      searchUsers();
      searchPosts();
      setOpenSearchDrowpdown(true);
    } else {
      setOpenSearchDrowpdown(false);
    }

    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenSearchDrowpdown(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside);

    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [searchQuery]);

  return (
    <form className={classes.search}>
      <input
        id="searchInput"
        className={classes.searchInput}
        placeholder="Search"
        type="text"
        autoComplete="off"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <label htmlFor="searchInput">
        <img
          className={classes.searchImg}
          src={PF + "searchIcon.svg"}
          alt="searchIcon"
        />
      </label>
      <div
        className={
          openSearchDrowpdown
            ? classes.searchDropdown
            : classes.searchDropdownNone
        }
        ref={ref}
      >
        {users.length !== 0 && (
          <div className={classes.searchAllDiv}>People</div>
        )}
        {users.slice(0, 3).map((user) => (
          <SearchList
            key={user._id}
            searchedUser={user}
            openSearchDrowpdown={openSearchDrowpdown}
            closeSearchDrowpdown={() => setOpenSearchDrowpdown(false)}
          />
        ))}

        {users.length > 3 && (
          <div className={classes.searchAllDiv}>Search all users</div>
        )}

        {posts.length !== 0 && <hr />}

        {posts.length !== 0 && (
          <div className={classes.searchAllDiv}>Posts</div>
        )}
        {posts.slice(0, 3).map((post) => (
          <SearchList
            key={post._id}
            searchedPost={post}
            openSearchDrowpdown={openSearchDrowpdown}
            closeSearchDrowpdown={() => setOpenSearchDrowpdown(false)}
          />
        ))}

        {posts.length > 3 && (
          <Link to={`/searchPosts/${searchQuery}`}>
            <div className={classes.searchAllDiv}>Search all posts</div>
          </Link>
        )}
      </div>
    </form>
  );
}

export default Search;
