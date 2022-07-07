import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../context/AuthContext/AuthContext";
import ErrorAndSuccessContext from "../../../context/ErrorAndSuccessContext/ErrorAndSuccessContext";

import classes from "./registerStep2.module.css";
import ErrorAndSuccess from "../../ErrorAndSuccess/ErrorAndSuccess";

function RegisterStep1({
  formData,
  setFormData,
  setFormSteps,
  setProfileImg,
  profileImg,
}) {
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setErrorMessage, setSuccessMessage } = useContext(
    ErrorAndSuccessContext
  );

  const prevStep = () => {
    setFormSteps((step) => step - 1);
  };

  async function register(e) {
    e.preventDefault();

    if (formData.profilePicture) {
      const data = new FormData();
      const fileName = Date.now() + formData.profilePicture.name;

      data.append("name", fileName);
      data.append("file", formData.profilePicture);

      console.log(formData.profilePicture, " ", fileName);

      formData.profilePicture = fileName;

      try {
        await axios.post("http://localhost:5000/upload", data);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }

    try {
      const registerData = {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profilePicture: formData.profilePicture,
        occupation: formData.occupation,
        description: formData.description,
      };

      await axios.post("http://localhost:5000/auth/register", registerData);

      setSuccessMessage("Account created successfully!");

      getLoggedIn();

      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  }

  const profileImageHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  console.log(formData);
  return (
    <>
      <button
        type="button"
        onClick={prevStep}
        className={classes.backButton}
      ></button>
      <div className={classes.leftSideTitle}>
        <h1>Sign up!</h1>
        <p>tell us a bit more about yourself</p>
      </div>

      <form onSubmit={register} className={classes.registerForm}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            profileImageHandler(e);
            setFormData({ ...formData, profilePicture: e.target.files[0] });
          }}
          id="uploadProfilePic"
        />
        <div className={classes.profilePicDiv}>
          <label htmlFor="uploadProfilePic">
            <div
              className={
                profileImg ? classes.profilePicNoBorder : classes.profilePic
              }
            >
              <img
                className={
                  profileImg ? classes.profileImg : classes.displayNone
                }
                src={profileImg}
                alt={profileImg}
              />
              <div
                className={
                  profileImg ? classes.displayNone : classes.profilePicPlus1
                }
              ></div>
              <div
                className={
                  profileImg ? classes.displayNone : classes.profilePicPlus2
                }
              ></div>
            </div>
          </label>
          <div className={classes.uploadPicText}>
            Upload a profile picture
            <label htmlFor="uploadProfilePic">
              <div className={classes.chooseImageButton}>Choose image</div>
            </label>
          </div>
        </div>

        <input
          type="text"
          placeholder="Your occupation"
          onChange={(e) =>
            setFormData({ ...formData, occupation: e.target.value })
          }
          value={formData.occupation}
          required={true}
        />
        <textarea
          placeholder="Drop a few lines about yourself!"
          className={classes.descInput}
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
        />
        <button type="submit" className={classes.registerFormButton}>
          Create account
        </button>
        <ErrorAndSuccess />
      </form>
    </>
  );
}

export default RegisterStep1;
