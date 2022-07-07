import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import Posts from "../../components/Posts/Posts";
import SideMenu from "../../components/SideMenu/SideMenu";
import Topbar from "../../components/Topbar/Topbar";
import SideMenuToggleContext from "../../context/SideMenuToggleContext";

import classes from "./search.module.css";

function SearchPosts() {
  const searchQueryParam = useParams().searchQuery;
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);

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
              placeholder="Search posts"
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

        <Posts searchQuery={searchQuery} />
      </div>
      <SideMenu />
    </div>
  );
}

export default SearchPosts;
