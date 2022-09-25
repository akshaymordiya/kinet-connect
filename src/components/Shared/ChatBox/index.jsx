import React from 'react';
import Input from '../../elements/Input';
import Icon from '../../Icon';
import Message from '../Message';
import "./index.scss"

const ChatBox = () => {
  return (
    <div className='chatbox_container'>
      <div className='chatbox_container_messages'>
        <Message username='John doe' comment='Hello There!' />
        <Message username='Glane Max' comment='Hey John, How are you?'/>
      </div>
      <div className='chatbox_container_input'>
        <Input
          placeHolder="Type Something..."
          className="chatbox_container_input_box"
          />
        <Icon vecotrName='send' className='chatbox_container_input_send_icon' />
      </div>
    </div>
  )
}

export default ChatBox