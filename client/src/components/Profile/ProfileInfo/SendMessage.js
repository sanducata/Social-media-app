import axios from "axios";
import { useContext, useState } from "react";

import AuthContext from "../../../context/AuthContext/AuthContext";

import classes from "./profileInfo.module.css";

function SendMessage({ openSendMessage, closeSendMessage, user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { currentUser, setNewMessages } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const sendMessageHandler = async (e) => {
    try {
      const createdAt = new Date();

      const sendMessageResponse = await axios.put(
        `http://localhost:5000/user/sendMessage/${user._id}`,
        {
          currentUser,
          createdAt,
          message,
        }
      );

      setNewMessages(sendMessageResponse.data.newMessages);
    } catch (error) {
      console.error(error);
    }
  };

  if (!openSendMessage) return null;

  return (
    <div className={classes.overlay} onClick={closeSendMessage}>
      <div
        className={classes.sendMessageDiv}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={classes.sendMessageTop}>
          <div className={classes.sendMessagePicture}>
            <img
              className={classes.profilePicture}
              src={
                user.profilePicture
                  ? `http://localhost:5000/images/${user.profilePicture}`
                  : PF + "profileIcon.svg"
              }
              alt="/profileIcon.svg"
            />
          </div>
          <div className={classes.sendMessageTitle}>
            Message <span>{user.name}</span>
          </div>
        </div>
        <form onSubmit={sendMessageHandler} className={classes.textareaForm}>
          <textarea
            id="textarea"
            className={classes.messageTextarea}
            placeholder="Write a message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />

          <button type="submit" className={classes.sendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default SendMessage;
