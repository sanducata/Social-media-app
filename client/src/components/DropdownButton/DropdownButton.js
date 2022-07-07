import { useContext, useEffect, useRef, useState } from "react";

import AuthContext from "../../context/AuthContext/AuthContext";
import DropdownToggleContext from "../../context/DropdownToggleContext/DropdownToggleContext";
import SideMenuToggleContext from "../../context/SideMenuToggleContext";

import classes from "./dropdownButton.module.css";

function DropdownButton() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const { loggedIn } = useContext(AuthContext);
  const { selectValue, setSelectValue } = useContext(DropdownToggleContext);
  const [selectBtnClicked, setSelectBtnClicked] = useState(false);
  const ref = useRef();
  const dropdownBtnRef = useRef();

  const selectHandler = (e) => {
    dropdownBtnRef.current = e.target.innerText;
    setSelectValue(dropdownBtnRef.current);
  };

  const selectBtnClick = () => {
    setSelectBtnClicked(!selectBtnClicked);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setSelectBtnClicked(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside);

    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  return (
    <>
      {loggedIn ? (
        <div
          className={
            isSideMenuOpen ? classes.dropdownOpen : classes.dropdownClosed
          }
        >
          <div className={classes.dropdownWrapper}>
            <div className={classes.dropdown}>
              <div
                ref={ref}
                className={
                  selectBtnClicked
                    ? `${classes.dropbtnClicked} ${classes.dropbtn}`
                    : classes.dropbtn
                }
                onClick={selectBtnClick}
              >
                <span>{selectValue}</span>
                <img
                  className={
                    selectBtnClicked
                      ? `${classes.dropbtnArrowClicked} ${classes.dropbtnArrow}`
                      : classes.dropbtnArrow
                  }
                  src={PF + "/caret-down-solid.svg"}
                  alt="dropbtnArrow"
                />
              </div>

              <div
                className={
                  selectBtnClicked
                    ? classes.dropdownContent
                    : classes.dropdownContentNone
                }
              >
                <div
                  className={classes.dropdownListItem}
                  onClick={selectHandler}
                >
                  Following
                </div>
                <div
                  className={classes.dropdownListItem}
                  onClick={selectHandler}
                >
                  All
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DropdownButton;
