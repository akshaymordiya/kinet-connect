import React from 'react'
import "./index.scss";
import Icon from '../../Icon'
import Collapse from '../../elements/Collapse';
import Avatar from '../Avatar';

const Participants = function Participants({ children, boxTitle = "", iconVectorName = "", iconVectorClass = "icon", listHorizonatal = false}){
  return (
    <div className='participants_list_container'>
      <div className='participants_list_container_header'>
        <div className="box_title">
          <span>{boxTitle}</span>
        </div>
        <Icon vecotrName={iconVectorName} className={iconVectorClass} />
      </div>
      <div className={`participants_list_container_list ${listHorizonatal ? "horizonatal" : ""}`}>
        {children}
      </div>
    </div>
  )
}

Participants.Card = function Card ({ children }) {
  return (
    <div className="participant_person_card">
      {children}
    </div>
  )
}

Participants.ListView = function ListView ({
  data = [], listName = "", renderSwitchListOptions = null  }) {
  return (
    <div className="participants_list_view">
      {/* <Collapse
        headingText={titleText}
      >
        {data.map((item) => {
          return (
            <div className='participants_list_view_item'>
              <div className='participants_list_view_item_wrapper'>
                <Avatar
                  size='extra_mini'
                  defaultGender={item.gender}
                />
                <span>{item.name}</span>
              </div>
              <Icon vecotrName='setting_gray' className='participants_list_view_item_icon' />
            </div>
          )
        })}
      </Collapse> */}
      <div className='header_text'>
        <span>{listName}</span>
        <div className='switch_list_options'>
          {renderSwitchListOptions && renderSwitchListOptions}
        </div>
      </div>
      <div className='participants_list_view_items'>
        {data.map((item) => {
          return (
            <div className='participants_list_view_items_item'>
              <div className='participants_list_view_items_item_wrapper'>
                <Avatar
                  size='extra_mini'
                  defaultGender={item.gender}
                />
                <span>{item.name}</span>
              </div>
              <Icon vecotrName='setting_gray' className='participants_list_view_items_item_icon' />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Participants