import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

import SideMenuToggleContext from "../../context/SideMenuToggleContext";
import Message from "./Message";

import classes from "./messages.module.css";

function Messages() {
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const { currentUser, setConversations } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const conversationId = useParams().conversation;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState([]);
  const messageRef = useRef();

  useEffect(() => {
    const fetchConversation = async () => {
      const fetchConversationResponse = await axios.get(
        `http://localhost:5000/user/getOneConversation/${conversationId}`
      );

      setConversation(fetchConversationResponse.data);
    };

    if (currentUser._id) {
      const secondUsersId =
        conversation.members &&
        conversation.members.filter((member) => member !== currentUser._id);

      const fetchUser = async () => {
        const fetchUserResponse = await axios.get(
          `http://localhost:5000/user/?userId=${secondUsersId}`
        );

        setUser(fetchUserResponse.data);
      };

      fetchUser();
    }

    fetchConversation();

    if (conversation._id) {
      const setUserMessages = async () => {
        const setUserMessagesResponse = await axios.put(
          `http://localhost:5000/user/setMessages/${conversation._id}`
        );

        setConversations(setUserMessagesResponse.data);
      };

      setUserMessages();
    }
  }, [
    conversationId,
    currentUser._id,
    conversation.members,
    conversation._id,
    setConversations,
  ]);

  useEffect(() => {}, []);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

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

      setConversations(sendMessageResponse.data.newMessages);

      messageRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={isSideMenuOpen ? classes.messagesOpen : classes.messagesClosed}
    >
      <div className={classes.messagesWrapper}>
        <div className={classes.conversationsDiv}>
          <div className={classes.nameDiv}>
            <div className={classes.profilePictureDiv}>
              <img
                src={
                  user?.profilePicture
                    ? `http://localhost:5000/images/${user?.profilePicture}`
                    : PF + "profileIcon.svg"
                }
                alt="profilePictureUser"
                className={classes.profilePicture}
              />
            </div>
            <div className={classes.userNameDiv}>
              <div>{user.name}</div>
              <div>@{user.username}</div>
            </div>
          </div>
          <div className={classes.messagesDiv}>
            {conversation._id &&
              conversation.messages.map((message, key) => (
                <div
                  className={
                    currentUser._id !== message.sender
                      ? classes.messageDiv
                      : classes.messageDivRight
                  }
                  key={key}
                >
                  {currentUser._id !== message.sender ? (
                    <div className={classes.messageProfilePictureDiv}>
                      <img
                        src={
                          user?.profilePicture
                            ? `http://localhost:5000/images/${user?.profilePicture}`
                            : PF + "profileIcon.svg"
                        }
                        alt="profilePictureUser"
                        className={classes.messageProfilePicture}
                      />
                    </div>
                  ) : null}
                  <div className={classes.senderMessage}>
                    <Message
                      message={message.message}
                      sender={message.sender}
                    />
                  </div>
                  <div ref={messageRef} />
                </div>
              ))}
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

export default Messages;
