import React, { useMemo } from 'react'
import "./index.scss"
import Avatar from '../Avatar'
import { getParticipantsWithRemainingComputation } from '../../../helper';

const AvatarList = ({
  avatarList = []
}) => {

  const renderAvatars = useMemo(() => {
    return getParticipantsWithRemainingComputation(avatarList, 4);
  }, [avatarList]);

  return (
    <div className="avatar_list">
      {renderAvatars.map((avatar, index) => {
        if(avatar?.showMessage){
          return (
            <div
            key={index}
            className="avatar_card_container extra_mini avatar_list_border avatar_message">
              <span>{avatar.showMessage}</span>
            </div>
          )
        }

        return (<Avatar
          key={index}
          avatarSrc={avatar}
          size="extra_mini"
          imageBorderClasses="avatar_list_border"
        />)
      })}
    </div>
  )
}

export default AvatarList