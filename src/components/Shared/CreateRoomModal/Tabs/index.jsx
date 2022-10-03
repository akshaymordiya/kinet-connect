import React from 'react'
import AlreadyExist from './AlreadyExists';
import InputComponent from './InputComponent';
import TypeOptions from './TypesOptions';

const Tabs = ({
  activeTabKey = "",
  roomDetails = {},
  updateRoomDetails
}) => {

  const TabComponents = {
    "input": <InputComponent 
                details={roomDetails} updateDetails={updateRoomDetails} 
              />,
    "type_option": <TypeOptions
                      activeType={roomDetails.type} updateType={(value) => updateRoomDetails("type",   value)} 
                    />,
    "already_exist": <AlreadyExist 
    
                      />
  };

  return TabComponents[activeTabKey]
}

export default Tabs