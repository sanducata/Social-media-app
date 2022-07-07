import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import AuthContext from "./context/AuthContext/AuthContext";
import Explore from "./pages/Explore/Explore";
import ConversationPage from "./pages/Messages/ConversationPage";
import Messages from "./pages/Messages/Messages";
import Notifications from "./pages/Notifications/Notifications";
import About from "./pages/Profile/About";
import CollectionPage from "./pages/Profile/CollectionPage";
import EditProfile from "./pages/Profile/EditProfile";
import LikedPosts from "./pages/Profile/LikedPosts";
import MyCollections from "./pages/Profile/MyCollections";
import Profile from "./pages/Profile/Profile";
import SearchPosts from "./pages/Search/SearchPosts";
import SearchUsers from "./pages/Search/SearchUsers";
import Upload from "./pages/Upload/Upload";

function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/searchPosts/:searchQuery" element={<SearchPosts />} />
        <Route path="/searchUsers/:searchQuery" element={<SearchUsers />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/about/:username" element={<About />} />
        {loggedIn === true && (
          <>
            <Route path="/login" element={<Navigate replace to="/" />} />
            <Route path="/register" element={<Navigate replace to="/" />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/likedPosts/:username" element={<LikedPosts />} />
            <Route
              path="/myCollections/:username"
              element={<MyCollections />}
            />
            <Route
              path="/collectionPage/:collectionName/:username"
              element={<CollectionPage />}
            />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route
              path="/messages/:conversation"
              element={<ConversationPage />}
            />
          </>
        )}
        {loggedIn === false && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<Navigate replace to="/" />} />
            <Route path="/upload" element={<Navigate replace to="/" />} />
            <Route path="/editProfile" element={<Navigate replace to="/" />} />
            <Route
              path="/likedPosts/:username"
              element={<Navigate replace to="/" />}
            />
            <Route
              path="/myCollections/:username"
              element={<Navigate replace to="/" />}
            />
            <Route
              path="/notifications"
              element={<Navigate replace to="/" />}
            />
            <Route path="/messages" element={<Navigate replace to="/" />} />
            <Route
              path="/messages/:conversation"
              element={<Navigate replace to="/" />}
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
