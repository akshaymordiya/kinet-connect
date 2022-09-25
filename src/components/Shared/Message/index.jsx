import React from 'react';
import "./index.scss"

const Message = ({
  username = "",
  comment = ""
}) => {
  return (
    <div className='message'>
      <h4>{username}</h4>
      <p> - {comment}</p>
    </div>
  )
}

export default Message