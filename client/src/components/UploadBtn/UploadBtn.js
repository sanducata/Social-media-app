import { useContext, useState } from "react";
import axios from "axios";

import SideMenuToggleContext from "../../context/SideMenuToggleContext";

import classes from "./uploadBtn.module.css";
import { useNavigate } from "react-router-dom";

function Upload() {
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState("");
  const [file, setFile] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    tags: [],
    description: "",
    selectedFile: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      data.append("name", fileName);
      data.append("file", file);

      newPost.selectedFile = fileName;

      try {
        await axios.post("http://localhost:5000/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("http://localhost:5000/post", newPost);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImageHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div
      className={isSideMenuOpen ? classes.pageMenuOpen : classes.pageMenuClosed}
    >
      <div className={classes.uploadWrapper}>
        <h1>Upload your design!</h1>
        <form onSubmit={submitHandler} className={classes.uploadImageForm}>
          <div className={classes.formDiv}>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => {
                uploadImageHandler(e);
                setFile(e.target.files[0]);
              }}
              id="uploadImage"
              disabled={uploadImage ? true : false}
              required
            />
            <label htmlFor="uploadImage">
              <div className={classes.uploadDiv}>
                <img
                  className={
                    uploadImage ? classes.uploadedImage : classes.displayNone
                  }
                  src={uploadImage}
                  alt={uploadImage}
                />

                <img
                  src={PF + "/uploadImage.svg"}
                  alt={PF + "/uploadImage.svg"}
                  className={classes.defaultUploadImage}
                />
                <p className={classes.uploadDivText}>
                  Click to upload an image
                </p>
                <p className={classes.uploadDivSmallText}>
                  High resolution images only (png, jpeg, gif)
                </p>
              </div>
            </label>
            <div
              className={
                uploadImage ? classes.rightSideDiv : classes.displayNone
              }
            >
              <input
                placeholder="Title"
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                maxLength="50"
                required
              />
              <input
                placeholder="Tags"
                onChange={(e) =>
                  setNewPost({ ...newPost, tags: e.target.value })
                }
                required
              />
              <textarea
                className={classes.description}
                onChange={(e) =>
                  setNewPost({ ...newPost, description: e.target.value })
                }
                placeholder="Description"
              />
              <div className={classes.buttonsDiv}>
                <div
                  className={classes.trashCan}
                  onClick={() => {
                    setUploadImage("");
                  }}
                >
                  <img
                    className={classes.trashCanImg}
                    src={PF + "/trash-can-solid.svg"}
                    alt={PF + "/trash-can-solid.svg"}
                  />
                </div>
                <button type="submit" className={classes.submitButton}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
