import React, { Fragment, useMemo } from 'react';
import { checkIsDefaultImage } from '../../../helper';
import "./index.scss";

const genders = ['male', 'female'];
const DEFAULT_SELECTED_GENDER = "male";

const Avatar = ({
  avatarSrc = "",
  size = "large",
  imageBorderClasses = "",
  enableOptionToChooseImage = false,
  guideText = "",
  overRideGuideTextClass = "",
  enablePrimaryBackground = false,
  backgroundText = "",
  captureImageHandler = () => {},
  selectDefaultImageHandler = () => {}
}) => {

  const imageUrl = useMemo(() => {
    if(checkIsDefaultImage(avatarSrc, genders) || !avatarSrc){
      return `/images/avatars/default_${avatarSrc || DEFAULT_SELECTED_GENDER}.jpg`
    }

    return avatarSrc;
  }, [avatarSrc]);

  return (
    <div className="avatar_card">
      <div className={`avatar_card_container ${imageBorderClasses} ${size} ${enablePrimaryBackground ? "primary_bg" :""}`}>
        {enablePrimaryBackground ? (
          <div className="primary_bg_wrapper">
            <span>{backgroundText}</span>
          </div>
        ) : (
          <img 
            src={imageUrl} className="avatar_card_container_image"
            alt='avatar'
          />
        )}
      </div>
      {enableOptionToChooseImage && (
        <Fragment>
          <div className="avatar_card_container_options">
            {["male", "female"].map((gen) => (
              <div key={gen} className={`avatar_card_container_options_mini ${(gen === avatarSrc) ? "active" : ""}`}
               onClick={() => selectDefaultImageHandler(gen)}
              >
                <img src={`/images/avatars/default_${gen}.jpg`} className="avatar_card_container_image" alt='avatars_list'/>
              </div>
            ))}
          </div>
          <input type="file" id="user_avatar" className='avatar_card_selector' onChange={captureImageHandler} />
          <label htmlFor='user_avatar' className="avatar_card_text">Choose a different photo</label>
        </Fragment>
      )}
      {guideText && (
        <div className={`avatar_card_guide_text ${overRideGuideTextClass}`}>
          {guideText}
        </div>
      )}
    </div>
  )
}

export default Avatar