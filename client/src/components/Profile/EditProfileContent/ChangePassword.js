import axios from "axios";
import { useContext, useState } from "react";

import AuthContext from "../../../context/AuthContext/AuthContext";
import ErrorAndSuccessContext from "../../../context/ErrorAndSuccessContext/ErrorAndSuccessContext";
import ErrorAndSuccess from "../../ErrorAndSuccess/ErrorAndSuccess";

import classes from "./editProfileContent.module.css";

function ChangePassword() {
  const { currentUser } = useContext(AuthContext);
  const { setErrorMessage, setSuccessMessage } = useContext(
    ErrorAndSuccessContext
  );
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/user/changePassword/${currentUser._id}`,
        passwords
      );

      setSuccessMessage("Password changed successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.editProfileForm}>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Old password</div>
        <input
          required
          type="password"
          placeholder="Old password"
          onChange={(e) =>
            setPasswords({ ...passwords, oldPassword: e.target.value })
          }
        />
      </div>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>New password</div>
        <input
          required
          type="password"
          placeholder="New password"
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
        />
      </div>
      <button type="submit" className={classes.editProfileFormButton}>
        Save
      </button>
      <ErrorAndSuccess />
    </form>
  );
}

export default ChangePassword;
