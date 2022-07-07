import React, { useState } from "react";

import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import classes from "./register.module.css";

function Register() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    profilePicture: "",
    occupation: "",
    description: "",
  });
  const [formSteps, setFormSteps] = useState(1);
  const [profileImg, setProfileImg] = useState("");

  const stepDisplay = () => {
    if (formSteps === 1) {
      return (
        <RegisterStep1
          formData={formData}
          setFormData={setFormData}
          setFormSteps={setFormSteps}
        />
      );
    } else {
      return (
        <RegisterStep2
          formData={formData}
          setFormData={setFormData}
          setFormSteps={setFormSteps}
          setProfileImg={setProfileImg}
          profileImg={profileImg}
        />
      );
    }
  };

  return (
    <div className={classes.registerContainer}>
      <div className={classes.leftSide}>{stepDisplay()}</div>
      <div className={classes.rightSide}>
        <img
          className={classes.registerImg}
          src={PF + "/6300958.jpg"}
          alt="registerPhoto"
        />
      </div>
    </div>
  );
}

export default Register;
