import SideMenu from "../../components/SideMenu/SideMenu";
import Topbar from "../../components/Topbar/Topbar";
import MessagesComp from "../../components/Messages/MessagesComp";

import classes from "./messages.module.css";

function Messages() {
  return (
    <div className={classes.messagesContainer}>
      <div className={classes.rightSideContainer}>
        <Topbar />
        <MessagesComp />
      </div>
      <SideMenu />
    </div>
  );
}

export default Messages;
