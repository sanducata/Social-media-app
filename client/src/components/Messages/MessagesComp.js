import { useContext } from "react";

import AuthContext from "../../context/AuthContext/AuthContext";
import SideMenuToggleContext from "../../context/SideMenuToggleContext";
import Conversation from "./Conversation";

import classes from "./messages.module.css";

function MessagesComp() {
  const { isSideMenuOpen } = useContext(SideMenuToggleContext);
  const { conversations } = useContext(AuthContext);

  return (
    <div
      className={isSideMenuOpen ? classes.messagesOpen : classes.messagesClosed}
    >
      <div className={classes.messagesWrapper}>
        <h1>All messages</h1>

        {conversations.map((conversation, key) => (
          <Conversation key={key} conversation={conversation} />
        ))}
      </div>
    </div>
  );
}

export default MessagesComp;
