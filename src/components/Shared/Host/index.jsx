import React from 'react';
import Avatar from '../Avatar';
import ControlPanel from '../ControlPanel';
import "./index.scss";

const Host = ({
  enableChatHandler = () => {},
  isChatEnabled
}) => {
  return (
    <div className="host_container">
      <h1>Which is best framework for frontend ?</h1>
      <Avatar
        size='large'
        imageBorderClasses='host_container_avatar'
        guideText='Akshay M'
        overRideGuideTextClass='host_container_avatar_text'
      />
      <ControlPanel
        enableChatHandler={enableChatHandler}
        isChatEnabled={isChatEnabled}
      />
    </div>
  )
}

export default Host