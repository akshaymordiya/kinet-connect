import React, { Fragment, useMemo, useState } from 'react'
import Button from '../../components/elements/Button'
import Grid from '../../components/elements/Grid'
import Icon from '../../components/Icon'
import Avatar from '../../components/Shared/Avatar'
import ChatBox from '../../components/Shared/ChatBox'
import Host from '../../components/Shared/Host'
import Navbar from '../../components/Shared/Navbar'
import Participants from '../../components/Shared/Participants'
import Title from '../../components/Shared/Title'
import { participantsList } from '../../constant/dummayConstant'
import { getParticipantsWithRemainingComputation } from '../../helper'
import "./index.scss"

const listIconTypes = {
  "Speakers": "voice",
  "Listners": "listening"
}

const Room = () => {

  const [activeList, setActiveList] = useState("Speakers");
  const [isChatEnabled, setIsChatEnables] = useState(true);

  const switchActiveListOptions = useMemo(() => {
    return (
      <div className='list_switch_options'>
        {["Speakers", "Listners"].map((listType) => (
          <Icon 
            onClick={() => setActiveList(listType)}
            vecotrName={`${listIconTypes[listType]}_${activeList === listType ? "primary" : "gray"}`} className={`list_switch_options_icon ${listType === activeList ? "active" : ""}`}
          />
        ))}
      </div>
    )
  }, [activeList]);
  return (
    <div className='main_wrapper'>
      <div className="room_container" >
        <Navbar 
          navItemsClass="navbar"
          renderInsideRightWrapper={
            <Button 
              text="Leave Room"
              className="leave_btn"
            />
          }
          renderInsideLeftWrapper={
            <Title className='nav_title_text' />
          }
        />
        <Grid avoidTemplateColumns overrideClass={`room_container_grid ${isChatEnabled ? "add_chat_area" : ""}`} >
          <Grid.GridItem className="speakers room_container_grid_item">
            <Participants 
              boxTitle='Speakers'
              iconVectorName='voice_gray'>
              {["male", "female", "male", "female", "male"].map((gender) => (
                <Participants.Card>
                  <Avatar 
                    size='medium'
                    defaultGender={gender}
                  />
                  <span>John Doe</span>
                </Participants.Card>
              ))}
            </Participants>
          </Grid.GridItem>
          <Grid.GridItem className="host room_container_grid_item">
            <Host 
              enableChatHandler={setIsChatEnables}
              isChatEnabled={isChatEnabled}
            />
          </Grid.GridItem>
          <Grid.GridItem className="listners room_container_grid_item">
            <Participants 
              boxTitle='Listners' iconVectorName='listening_gray'
              listHorizonatal
              >
                {getParticipantsWithRemainingComputation(["male", "female", "male", "female", "male", "male", "female"], 5).map((gender) => (
                <Participants.Card>
                  {gender?.showMessage ? (
                    <Fragment>
                      <Avatar
                        size='medium'
                        enablePrimaryBackground
                        backgroundText={gender.showMessage}
                        >
                      </Avatar>
                      <span>Others</span>
                    </Fragment>

                  ) : (
                    <Fragment>
                      <Avatar 
                        size='medium'
                        defaultGender={gender}
                      />
                      <span>John Doe</span> 
                    </Fragment>
                  )}
                </Participants.Card>
              ))}
            </Participants>
          </Grid.GridItem>
          {isChatEnabled && (
            <Grid.GridItem className="chat room_container_grid_item">
              <ChatBox />
            </Grid.GridItem>
          )}
          <Grid.GridItem className="joiners room_container_grid_item">
            <Participants 
              boxTitle='Joiners List' iconVectorName='group_gray' iconVectorClass='group_vector_icon'>
              <Participants.ListView 
                listName={activeList}
                data={participantsList[activeList]}
                renderSwitchListOptions={switchActiveListOptions}
              />
            </Participants>
          </Grid.GridItem>
        </Grid>
      </div>
    </div>
  )
}

export default Room