import React, { Fragment, useEffect, useMemo, useState } from 'react';
import "./index.scss";
import Popup from "../../elements/Popup";
import isEmpty from 'lodash/isEmpty';
import first from 'lodash/first';
import { useNavigate } from 'react-router-dom';
import { MODAL_KEYS } from '../../../constant/modalKeys/modal.keys';
import Button from '../../elements/Button';
import API from "../../../http";
import { toast } from 'react-toastify';
import Tabs from './Tabs';
import useAuth from '../../../hooks/useAuth';
import commonNotifications from '../../../constant/notifications/common.notifications';
import roomNotifications from '../../../constant/notifications/room.notifications';
import useModal from '../../../hooks/useModal';
import WarningPopup from '../Modals/Warning';

const tabs = ["input", "type_option", "already_exist"];
const DEFAULT_ACTIVE_TAB = first(tabs);
const roomInitialState = {
  topic: "",
  description: "",
  type: "public"
}

const CreateRoomModal = ({
  modalData = {}
}) => {

  const [roomDetails, setRoomDetails] = useState(roomInitialState);

  const { authenticatedUser } = useAuth();
  const navigate = useNavigate();
  const warningModal = useModal(MODAL_KEYS.WARNING_POPUP);

  useEffect(() => {
    if(modalData.modal.key && modalData.modal.active){
      modalData.updateData({
        activeTab: DEFAULT_ACTIVE_TAB,
        tabs
      });
    }

    return () => {
      modalData.updateData({})
    }
  }, [modalData.modal.key, modalData.modal.active]);
  
  const onRoomCardBtnClick = (actionType) => () => {
    const activeTabIndex = tabs.indexOf(activeTab);
    const types = {
      "next": activeTabIndex + 1,
      "previous": activeTabIndex - 1
    }
    modalData.updateData({
      ...modalData.modal.data,
      activeTab: tabs[types[actionType]] 
    })
  }

  const joinExistingRoom = () => {
    if(modalData?.modal?.data?.existing_room){
      const roomKey = modalData?.modal?.data?.existing_room?.roomKey;
      cleanUp();
      navigate(`/room/${roomKey}`, { replace: true });
      return
    }

    toast.error(roomNotifications.errors.failedToJoined)
  }

  const onSubmit = ({
    confirmBeforeSave = false,
    destroyExistingAndCreateNew = false
  }) => {
    if(Object.keys(roomDetails).some((detail) => !roomDetails[detail] )){
      toast.error(commonNotifications.common.requiredFeildError)
      return
    }

    if(confirmBeforeSave){
      warningModal.updateData({
        title: roomNotifications.warning.message.title,
        description: roomNotifications.warning.message.description
      })
      warningModal.addModalAction("onClose", () => {
        warningModal.activateModal(false)
      });
      warningModal.addModalAction("onSubmit", () => onSubmit({ destroyExistingAndCreateNew: true }));
      warningModal.activateModal(true);
      return
    }
    
    if(destroyExistingAndCreateNew){
      warningModal.activateModal(false);
      warningModal.updateData()
      warningModal.removeActions()
    }

    const payload = {
      ...roomDetails,
      hostBy: authenticatedUser._id,
      ...(destroyExistingAndCreateNew && ({
        destroyExistingAndCreateNew
      }))
    }

    API.room.create(payload)
    .then((res) => {
      if(!isEmpty(res) && res?.statusCode === 200){
        if(res?.isAlreadyExist){
          toast.warning(roomNotifications.warning.alreadyExist)
          modalData.updateData({
            ...modalData.modal.data,
            activeTab: "already_exist",
            existing_room: res?.room
          })
          return
        }

        if(res?.isRecreate){
          toast.success(roomNotifications.reCreate)
        }

        cleanUp();
        navigate(`/room/${res?.room?.roomKey}`, { replace: true })
      }
    })
    .catch((err) => {
      toast.error(err?.message || commonNotifications.common.somethingWentWrong)
    });
  }

  const updateRoomDetails = (key, value) => {
    setRoomDetails((prevState) => ({
      ...prevState,
      [key]: value
    }))
  }

  const cleanUp = () => {
    modalData.updateData({});
    setRoomDetails({});
    closePopup();
  }

  const closePopup = () => {
    modalData.activateModal(false)
  }

  const activeTab = useMemo(() => {
    if(isEmpty(modalData.modal.data)){
      return DEFAULT_ACTIVE_TAB
    }

    return modalData.modal.data.activeTab;
  }, [modalData.modal.data]);

  const FooterButtons = useMemo(() => {

    const buttons = [
      {
        key: "next",
        text: "Next",
        className: "room_card_btn",
        onclick: onRoomCardBtnClick("next"),
        usedFor: ["input"],
      },
      {
        key: "previous",
        text: "Previous",
        className: "room_card_btn",
        onclick: onRoomCardBtnClick("previous"),
        usedFor: ["type_option"],
      },
      {
        key: "create-room",
        text: `Create ${activeTab === "already_exist" ? "New" : ''} Room`,
        className: "room_card_btn",
        onclick: () => {
          onSubmit({
            confirmBeforeSave: activeTab === "already_exist"
          })
        },
        usedFor: ["type_option", "already_exist"],
      },
      {
        key: "join",
        text: "Join",
        className: "room_card_btn",
        onclick: joinExistingRoom,
        usedFor: ["already_exist"],
      },
    ];

    return buttons.filter((btn) => btn.usedFor.includes(activeTab));
  }, [activeTab]);

  if(isEmpty(modalData) || modalData.modal.key !== MODAL_KEYS.CREATE_NEW_ROOM){
    return null;
  }

  return (
  <Fragment>
    <WarningPopup />
    <Popup 
      isOpen={modalData.modal.active}
      onClose={cleanUp}
    >
      <Popup.Header 
        title={activeTab === "already_exist" ? "Room Already Exist" : 'New Room'} onClose={cleanUp} />
      <Popup.Body>
        <Tabs
          activeTabKey={activeTab}
          roomDetails={roomDetails}
          updateRoomDetails={updateRoomDetails}
        />
      </Popup.Body>
      <Popup.Footer>
        {FooterButtons.map((btn) => (
          <Button
            key={btn.key} 
            text={btn.text}
            className={btn.className}
            onClick={btn.onclick}
          />
        ))}
      </Popup.Footer>
    </Popup>
  </Fragment>
  )
}

export default CreateRoomModal