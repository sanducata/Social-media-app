import axios from "axios";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext/AuthContext";
import SideMenuToggleContext from "../../context/SideMenuToggleContext";
import SingleCollection from "./SingleCollection/SingleCollection";

import classes from "./collections.module.css";

function Collections() {
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const { currentUser } = useContext(AuthContext);
  const [allCollections, setAllCollections] = useState([]);

  useEffect(() => {
    if (currentUser._id) {
      const fetchCollections = async () => {
        const fetchCollectionsResponse = await axios.get(
          `http://localhost:5000/user/getCollections/${currentUser._id}`
        );

        setAllCollections(fetchCollectionsResponse.data);
      };

      fetchCollections();
    }
  }, [currentUser._id]);

  return (
    <div
      className={
        isSideMenuOpen ? classes.collectionsOpen : classes.collectionsClosed
      }
    >
      <div className={classes.collectionsWrapper}>
        {allCollections.map((collection, key) => (
          <SingleCollection key={key} collection={collection} />
        ))}
      </div>
    </div>
  );
}

export default Collections;
