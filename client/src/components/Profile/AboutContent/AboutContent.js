import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SideMenuToggleContext from "../../../context/SideMenuToggleContext";

import classes from "./aboutContent.module.css";

function AboutContent() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const [user, setUser] = useState([]);
  const username = useParams().username;
  let date = new Date();
  let memberSince = {};

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/user?username=${username}`
      );

      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  if (user.createdAt) {
    date = new Date(
      user.createdAt.substring(0, 4),
      user.createdAt.substring(5, 7) - 1,
      user.createdAt.substring(8, 10)
    );

    let month = date.toLocaleString("en", { month: "long" });

    memberSince = {
      day: user.createdAt.substring(8, 10),
      month: month,
      year: user.createdAt.substring(0, 4),
    };
  }

  return (
    <div className={isSideMenuOpen ? classes.aboutOpen : classes.aboutClosed}>
      <div className={classes.aboutWrapper}>
        <div className={classes.sideWrapper}>
          <div className={classes.followingsDiv}>
            <span className={classes.followSpan}>
              Followers{" "}
              <span className={classes.followNumber}>
                {Array.isArray(user.followers) ? user.followers.length : 0}
              </span>
            </span>
            <span className={classes.followSpan}>
              Following{" "}
              <span className={classes.followNumber}>
                {Array.isArray(user.following) ? user.following.length : 0}
              </span>
            </span>
          </div>
          <div className={classes.section}>
            <span className={classes.sectionTitle}>About me</span>
            <span className={classes.sectionContent}>{user.description}</span>
          </div>
        </div>
        <div className={classes.sideWrapper}>
          <div className={classes.section}>
            <span className={classes.sectionTitle}>Find me on</span>
            {user.website ? (
              <div className={classes.socialMedia}>
                <img
                  src={PF + "link-solid.svg"}
                  className={classes.socialMediaIcon}
                  alt="social media icon"
                />
                <a
                  className={classes.sectionContent}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://${user.instagram}`}
                >
                  Personal website
                </a>
              </div>
            ) : null}
            {user.dribbble ? (
              <div className={classes.socialMedia}>
                <img
                  src={PF + "/instagram-square-brands.svg"}
                  className={classes.socialMediaIcon}
                  alt="social media icon"
                />
                <a
                  className={classes.sectionContent}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://${user.instagram}`}
                >
                  Instagram
                </a>
              </div>
            ) : null}
            {user.facebook ? (
              <div className={classes.socialMedia}>
                <img
                  src={PF + "/facebook-square-brands.svg"}
                  className={classes.socialMediaIcon}
                  alt="social media icon"
                />
                <a
                  className={classes.sectionContent}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://${user.facebook}`}
                >
                  Facebook
                </a>
              </div>
            ) : null}
            {user.twitter ? (
              <div className={classes.socialMedia}>
                <img
                  src={PF + "/twitter-square-brands.svg"}
                  alt="social media icon"
                  className={classes.socialMediaIcon}
                />
                <a
                  className={classes.sectionContent}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://${user.twitter}`}
                >
                  Twitter
                </a>
              </div>
            ) : null}
            {user.dribbble ? (
              <div className={classes.socialMedia}>
                <img
                  src={PF + "/dribbble-square-brands.svg"}
                  alt="social media icon"
                  className={classes.socialMediaIcon}
                />
                <a
                  className={classes.sectionContent}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://${user.dribbble}`}
                >
                  Dribbble
                </a>
              </div>
            ) : null}
          </div>
          <div className={classes.section}>
            <span className={classes.sectionContent}>
              Member since{" "}
              <span
                className={classes.followNumber}
              >{`${memberSince.day} ${memberSince.month} ${memberSince.year}`}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutContent;
