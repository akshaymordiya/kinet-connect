import React from 'react'
import "./index.scss"
import { MODAL_KEYS } from '../../../../constant/modalKeys/modal.keys';
import useModal from '../../../../hooks/useModal';
import Button from '../../../elements/Button';
import Popup from '../../../elements/Popup'
import TextCard from '../../TextCard';
import { isEmpty } from 'lodash';

const WarningPopup = () => {

  const {
    modal
  } = useModal(MODAL_KEYS.WARNING_POPUP);

  if(isEmpty(modal.actions) || isEmpty(modal.data)){
    return null
  }

  return (
    <Popup
      isOpen={modal.active}
      onClose={modal.actions.onClose}
    >
      <Popup.Header 
        onClose={modal.actions.onClose} 
      >
        <h1 className="warning_title">Warning</h1>
      </Popup.Header>
      <Popup.Body>
        <TextCard 
          title={modal.data.title}
          excert={modal.data.description}
          titleClass="warning_body_title"
        />
      </Popup.Body>
      <Popup.Footer>
        <Button
          text="Cancel"
          onClick={modal.actions.onClose}
          className="warning_footer_btn"
        />
        <Button 
          text="Continue"
          onClick={modal.actions.onSubmit}
          className="warning_footer_btn"
        />
      </Popup.Footer>
    </Popup>
  )
}

export default WarningPopup