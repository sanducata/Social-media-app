import axios from "axios";
import { useContext } from "react";

import AuthContext from "../../../context/AuthContext/AuthContext";
import ErrorAndSuccessContext from "../../../context/ErrorAndSuccessContext/ErrorAndSuccessContext";
import ErrorAndSuccess from "../../ErrorAndSuccess/ErrorAndSuccess";

import classes from "./editProfileContent.module.css";

function SocialLinks({ newUser, setNewUser }) {
  const { currentUser } = useContext(AuthContext);
  const { setErrorMessage, setSuccessMessage } = useContext(
    ErrorAndSuccessContext
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/user/editProfileLinks/${currentUser._id}`,
        newUser
      );

      setSuccessMessage("Links updated successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.editProfileForm}>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Personal website</div>
        <input
          type="text"
          placeholder="Personal website"
          onChange={(e) => setNewUser({ ...newUser, website: e.target.value })}
          defaultValue={currentUser.website}
        />
      </div>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Facebook</div>
        <input
          type="text"
          placeholder="Facebook"
          onChange={(e) => setNewUser({ ...newUser, facebook: e.target.value })}
          defaultValue={currentUser.facebook}
        />
      </div>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Instagram</div>
        <input
          type="text"
          placeholder="Instagram"
          onChange={(e) =>
            setNewUser({ ...newUser, instagram: e.target.value })
          }
          defaultValue={currentUser.instagram}
        />
      </div>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Twitter</div>
        <input
          type="text"
          placeholder="Twitter"
          onChange={(e) => setNewUser({ ...newUser, twitter: e.target.value })}
          defaultValue={currentUser.twitter}
        />
      </div>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Dribbble</div>
        <input
          type="text"
          placeholder="Dribbble"
          onChange={(e) => setNewUser({ ...newUser, dribbble: e.target.value })}
          defaultValue={currentUser.dribbble}
        />
      </div>
      <button type="submit" className={classes.editProfileFormButton}>
        Save
      </button>
      <ErrorAndSuccess />
    </form>
  );
}

export default SocialLinks;
