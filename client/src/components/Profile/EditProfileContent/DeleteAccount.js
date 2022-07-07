import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext/AuthContext";
import ErrorAndSuccessContext from "../../../context/ErrorAndSuccessContext/ErrorAndSuccessContext";
import ErrorAndSuccess from "../../ErrorAndSuccess/ErrorAndSuccess";

import classes from "./editProfileContent.module.css";

function DeleteAccount() {
  const { currentUser, getLoggedIn } = useContext(AuthContext);
  const { setErrorMessage, setSuccessMessage } = useContext(
    ErrorAndSuccessContext
  );
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(
        `http://localhost:5000/user/deleteAccount/${currentUser._id}`
      );

      setSuccessMessage("Links updated successfully!");

      await axios.get("http://localhost:5000/auth/logout");
      await getLoggedIn();

      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className={classes.deleteDiv}>
      <span className={classes.deleteTitle}>
        We're sorry to see you leave :&#40;
      </span>

      <div className={classes.deleteButton} onClick={submitHandler}>
        Delete account
      </div>
      <ErrorAndSuccess />
    </div>
  );
}

export default DeleteAccount;
