import Messages from "../../components/Messages/Messages";
import SideMenu from "../../components/SideMenu/SideMenu";
import Topbar from "../../components/Topbar/Topbar";

import classes from "./messages.module.css";

function ConversationPage() {
  return (
    <div className={classes.messagesContainer}>
      <div className={classes.rightSideContainer}>
        <Topbar />
        <Messages />
      </div>
      <SideMenu />
    </div>
  );
}

export default ConversationPage;
