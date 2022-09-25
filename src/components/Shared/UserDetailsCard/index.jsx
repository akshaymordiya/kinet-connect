import React from 'react'
import "./index.scss"
import Icon from '../../Icon'
import Avatar from '../Avatar'

const UserDetailsCard = ({
  user = null
}) => {
  return (
    <div className="user_details_card">
      <div className="user_details_card_wrapper">
        <Avatar 
          avatarSrc={user.avatarURL}
          size="mini"
        />
        <div className="user_details_card_wrapper_text">
          <h3 className="user_details_card_wrapper_text_fullname">{user?.fullName}</h3>
          <p className="user_details_card_wrapper_text_username">@{user?.userName}</p>
        </div>
      </div>
      <Icon vecotrName='upper_below_arrow' className="sort_icon" />
    </div>
  )
}

export default UserDetailsCard