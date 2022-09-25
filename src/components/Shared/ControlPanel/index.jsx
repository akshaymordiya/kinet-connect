import React from 'react'
import Button from '../../elements/Button'
import Dropdown from '../../elements/Dropdown'
import Icon from '../../Icon'
import "./index.scss"

const ControlPanel = ({
  enableChatHandler = () => {},
  isChatEnabled
}) => {
  return (
    <div className='control_panel_section'>
      <div className='control_panel_section_wrapper'>
        <div className='control_panel_section_wrapper_left_panel'>
          <Icon 
            vecotrName='mike_primary'
          />
          <Dropdown 
             placeHolderText="Shure SM7B Microphone"
          />
          <Icon
            vecotrName={`chat_${isChatEnabled ? "primary" : "grey" }`}
            className='chat_icon'
            onClick={() => enableChatHandler((prev) => !prev)}
          />
        </div>
        <div className='control_panel_section_wrapper_right_panel'>
          <Button 
            text="Leave Room"
            className="leave_btn"
          />
        </div>
      </div>
    </div>
  )
}

export default ControlPanel