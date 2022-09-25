import React from 'react'
import Icon from '../../Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import "./index.scss"

const Button = ({ 
  text, 
  className = "", 
  showNextIconVector = false, 
  startIcon = "", 
  iconClasses, 
  onClick, 
  disabled = false,
  showAdditionalIcon = null,
  ...restProps 
}) => {
  const onBtnClickHandler = () => {
    if(disabled){
      return;
    }

    onClick();
  }
  return (
      <button className={`${className} ${disabled && "disabled"}`} onClick={onBtnClickHandler} {...restProps}>
        {startIcon && (
          <Icon vecotrName={startIcon} className={iconClasses} />
        )}
        {text}
        {showNextIconVector && (
          <img src="/images/vector/Vector.png" />
        )}
        {showAdditionalIcon && (
          showAdditionalIcon
        )}
      </button>
  )
}

export default Button