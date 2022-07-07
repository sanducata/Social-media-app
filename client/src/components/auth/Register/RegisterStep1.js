import { Link } from "react-router-dom";

import classes from "./registerStep1.module.css";

function RegisterStep1({ formData, setFormData, setFormSteps }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const nextStep = () => {
    setFormSteps((step) => step + 1);
  };

  return (
    <>
      <div className={classes.leftSideTitle}>
        <h1>Sign up!</h1>
        <p>connect with creatives all over the world</p>
      </div>
      <form onSubmit={nextStep} className={classes.registerForm}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          value={formData.username}
          autoComplete="nope"
          required={true}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
          autoComplete="nope"
          required={true}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
          autoComplete="nope"
          required={true}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
          required={true}
        />

        <button type="submit" className={classes.registerFormButton}>
          Create account
        </button>
      </form>
      <span className={classes.alreadyHaveAccount}>
        Already have an account?
        <Link to="/login" className={classes.alreadyHaveAnAccount}>
          {" "}
          Sign in
        </Link>
      </span>
      <div className={classes.orDiv}>
        <hr />
        <span>or</span>
        <hr />
      </div>
      <button type="button" className={classes.googleButton}>
        <img src={PF + "/googleLogo.svg"} alt="googleButton" />
        Continue with Google
      </button>
    </>
  );
}

export default RegisterStep1;
