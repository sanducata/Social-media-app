import axios from "axios";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../../../context/AuthContext/AuthContext";
import ErrorAndSuccessContext from "../../../context/ErrorAndSuccessContext/ErrorAndSuccessContext";
import ErrorAndSuccess from "../../ErrorAndSuccess/ErrorAndSuccess";

import classes from "./editProfileContent.module.css";

function EditProfileInfo({ newUser, setNewUser }) {
  const { currentUser } = useContext(AuthContext);
  const { setErrorMessage, setSuccessMessage } = useContext(
    ErrorAndSuccessContext
  );
  const [profileImg, setProfileImg] = useState("");
  const [newProfileImg, setNewProfileImg] = useState("");

  useEffect(() => {
    const setProfileImgHandler = () => {
      if (currentUser.profilePicture) {
        setProfileImg(
          `http://localhost:5000/images/${currentUser.profilePicture}`
        );
        newUser.oldPicture = currentUser.profilePicture;
      }
    };

    setProfileImgHandler();
  }, [currentUser.profilePicture, newUser]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newProfileImg !== "") {
      const data = new FormData();
      const fileName = Date.now() + newProfileImg.name;

      data.append("name", fileName);
      data.append("file", newProfileImg);

      newUser.profilePicture = fileName;

      try {
        await axios.post("http://localhost:5000/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const isProfilePictureDifferent =
        newUser.oldPicture !== newUser.profilePicture ? true : false;

      newUser.isProfilePictureDifferent = isProfilePictureDifferent;

      await axios.put(
        `http://localhost:5000/user/editProfile/${currentUser._id}`,
        newUser
      );

      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const profileImageHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <form onSubmit={submitHandler} className={classes.editProfileForm}>
      <div className={classes.inputDiv}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            profileImageHandler(e);
            setNewProfileImg(e.target.files[0]);
          }}
          id="uploadProfilePic"
        />
        <div className={classes.profilePicDiv}>
          <label htmlFor="uploadProfilePic" className={classes.label1}>
            <div className={classes.profilePic}>
              <img
                className={classes.profileImg}
                src={profileImg}
                alt={profileImg}
              />
            </div>
          </label>
          <label htmlFor="uploadProfilePic" className={classes.label2}>
            <div className={classes.chooseImageButton}>Change image</div>
          </label>
        </div>
      </div>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Name</div>
        <input
          required
          type="text"
          placeholder="Name"
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          defaultValue={newUser.name}
        />
      </div>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Username</div>
        <input
          required
          type="text"
          placeholder="Username"
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          defaultValue={newUser.username}
        />
      </div>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Email</div>
        <input
          required
          type="email"
          placeholder="Email"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          defaultValue={newUser.email}
        />
      </div>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Occupation</div>
        <input
          type="text"
          placeholder="Occupation"
          onChange={(e) =>
            setNewUser({ ...newUser, occupation: e.target.value })
          }
          defaultValue={newUser.occupation}
        />
      </div>
      <div className={classes.inputDiv}>
        <div className={classes.labelDiv}>Description</div>
        <textarea
          className={classes.descInput}
          type="text"
          placeholder="Description"
          onChange={(e) =>
            setNewUser({ ...newUser, description: e.target.value })
          }
          defaultValue={newUser.description}
        ></textarea>
      </div>

      <button type="submit" className={classes.editProfileFormButton}>
        Save
      </button>
      <ErrorAndSuccess />
    </form>
  );
}

export default EditProfileInfo;
