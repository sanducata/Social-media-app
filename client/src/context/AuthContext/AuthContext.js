import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newMessages, setNewMessages] = useState([]);

  const getLoggedIn = async () => {
    const loggedInResponse = await axios.get(
      "http://localhost:5000/auth/loggedIn"
    );

    setLoggedIn(loggedInResponse.data);
  };

  const fetchCurrentUser = async () => {
    const currentUserResponse = await axios.get(
      "http://localhost:5000/user/getUser/currentUser"
    );

    setCurrentUser(currentUserResponse.data);
    setNewNotifications(currentUserResponse.data.newNotifications);
    setNotifications(currentUserResponse.data.notifications);
  };

  const fetchCurrentUserConversations = async () => {
    const currentUserConversationsResponse = await axios.get(
      "http://localhost:5000/user/getConversations"
    );

    setConversations(
      currentUserConversationsResponse.data.sort((conv1, conv2) => {
        return new Date(conv2.createdAt) - new Date(conv1.createdAt);
      })
    );
  };

  useEffect(() => {
    getLoggedIn();

    loggedIn && fetchCurrentUserConversations();
    loggedIn && fetchCurrentUser();
  }, [loggedIn]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        getLoggedIn,
        currentUser,
        setCurrentUser,
        setNotifications,
        notifications,
        setNewNotifications,
        newNotifications,
        newMessages,
        setNewMessages,
        conversations,
        setConversations,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
