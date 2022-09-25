import React, { Fragment, useRef } from 'react';
import { createPortal } from"react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./popup.scss";
import Button from '../Button';

const Popup = function Popup({
  children,
  isOpen = false,
  onClose = () => {},
  closeOnOutSideClick = false
}){
  const container = document.getElementById("popup-root");

  const popupContainerRef = useRef(null);

  const onClickOutSide = (e) => {
    if(closeOnOutSideClick){
      if(!popupContainerRef.current.contains(e.target)){
        onClose();
      }   
    }
  }

  const PopupWrapper = (
    <div 
      className={`popup_wrapper ${isOpen && "visible"}`}
      onClick={onClickOutSide}
    >
      <div 
        ref={popupContainerRef}className="popup_container"
      >
        {children}  
      </div>
    </div>
  )

  return createPortal(
    PopupWrapper,
    container
  )
}

Popup.Header = function Header({
  children = null,
  title = "",
  onClose= () => {}
}){
  return (
    <div className="popup_container_header">
      {children || (
        <h1            className='popup_container_header_title'>   {title}
        </h1>
      )}
      <FontAwesomeIcon 
        icon={faCircleXmark}  
        className="xmark"
        onClick={onClose}
      />
    </div>
  )
}

Popup.Body = function Body({
  children = null,
  text = ""
}){
  return (
    <div className="popup_container_body">
      {children || (
        <p className='popup_container_body_text'>
          {text}
        </p>
      )}
    </div>
  )
}

Popup.Footer = function Footer({
  children = null,
  submitText = "Submit",
  submitAction = () => {},
  submitClass = "",
  cancelText = "Cancel",
  onCancelAction = () => {},
  cancelClass = "",
  footerClass = ""
}){
  return (
    <div className={`popup_container_footer ${footerClass}`}>
      {children || (
        <Fragment>
          <Button 
            text={cancelText}
            onClick={onCancelAction}
            className={`cancel_btn ${cancelClass}`}
          />
          <Button 
            text={submitText}
            onClick={submitAction}
            className={`submit_btn ${submitClass}`}
          />
        </Fragment>
      )}
    </div>
  )
}


export default Popup