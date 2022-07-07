import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext/AuthContext";

import classes from "./messages.module.css";

function Conversation({ conversation }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { currentUser, setConversations } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (currentUser._id) {
      const secondUsersId = conversation.members.filter(
        (member) => member !== currentUser._id
      );

      const fetchUser = async () => {
        const fetchUserResponse = await axios.get(
          `http://localhost:5000/user/?userId=${secondUsersId}`
        );

        setUser(fetchUserResponse.data);
      };

      fetchUser();
    }
  }, [
    conversation.secondUsersId,
    conversation._id,
    setConversations,
    conversation.members,
    currentUser._id,
  ]);

  return (
    <Link to={`/messages/${conversation._id}`}>
      <div
        className={
          conversation.newMessages && conversation.newMessages.length !== 0
            ? `${classes.conversation} ${classes.conversationHighlight}`
            : classes.conversation
        }
      >
        <div className={classes.profilePictureDiv}>
          <img
            src={
              user?.profilePicture
                ? `http://localhost:5000/images/${user?.profilePicture}`
                : PF + "/profileIcon.svg"
            }
            alt="profilePictureUser"
            className={classes.profilePicture}
          />
        </div>
        <div className={classes.userNameDiv}>
          <div>{user.name}</div>
          <div>@{user.username}</div>
        </div>
        <div className={classes.message}>
          {conversation.newMessages.length !== 0
            ? conversation.newMessages[conversation.newMessages.length - 1]
                .message
            : conversation.messages[conversation.messages.length - 1].message}
        </div>
        <div className={classes.sendDate}>
          {conversation.newMessages.length !== 0
            ? moment(
                conversation.newMessages[conversation.newMessages.length - 1]
                  .createdAt
              ).fromNow()
            : moment(
                conversation.messages[conversation.messages.length - 1]
                  .createdAt
              ).fromNow()}
        </div>
      </div>
    </Link>
  );
}

export default Conversation;
