import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import SideMenu from "../../components/SideMenu/SideMenu";
import Topbar from "../../components/Topbar/Topbar";
import SideMenuToggleContext from "../../context/SideMenuToggleContext";

import classes from "./search.module.css";

function SearchUsers() {
  const searchQueryParam = useParams().searchQuery;
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const searchUsers = async () => {
      const searchUsersResponse = await axios.get(
        `http://localhost:5000/user/searchUsers?searchQuery=${searchQuery}`
      );

      setUsers(searchUsersResponse.data);
    };

    if (searchQuery.length > 2) {
      searchUsers();
    }
  }, [searchQuery]);

  return (
    <div className={classes.searchContainer}>
      <div className={classes.rightSideContainer}>
        <Topbar />
        <div
          className={isSideMenuOpen ? classes.searchOpen : classes.searchClosed}
        >
          <div className={classes.wrapper}>
            <input
              className={classes.searchInput}
              placeholder="Search users"
              id="searchPosts"
              type="text"
              autoComplete="off"
              onChange={(e) => setSearchQuery(e.target.value)}
              defaultValue={searchQueryParam}
            />
            <label htmlFor="searchPosts">
              <img
                className={classes.searchImg}
                src={PF + "searchIcon.svg"}
                alt="searchIcon"
              />
            </label>
          </div>
        </div>
        <div
          className={isSideMenuOpen ? classes.searchOpen : classes.searchClosed}
        >
          <div className={classes.searchTitle}>People</div>
          <div className={classes.searchUserWrapper}>
            {users.map((user, key) => (
              <Link to={`/profile/${user.username}`}>
                <div key={key} className={classes.userDiv}>
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
                  <div className={classes.userName}>{user.name}</div>
                  <div className={classes.userOccupation}>
                    {user.occupation}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <SideMenu />
    </div>
  );
}

export default SearchUsers;
