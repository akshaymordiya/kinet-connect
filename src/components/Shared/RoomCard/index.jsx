import React from 'react';
import "./index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-regular-svg-icons";
import Avatar from '../Avatar';
import List from '../../elements/List';
import TextCard from '../TextCard';
import AvatarList from '../AvatarList';
import { faEarListen, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

const RoomCard = () => {
  return (
    <div className="room_card">
      <div className="card_top">
        <Avatar avatarSrc='male' size='mini'/>
        <FontAwesomeIcon icon={faStar} className="bookmark" />
      </div>
      <TextCard 
        title="Which framework is best for frontend ?"
        excert="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae"
        titleClass="card_title"
        excertClass="card_description"
      
      />
      <div className="card_details">
        <List className="list">
          <List.ListItem className="list_item">
            <div className="card_icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <p>Host By: @john_doe</p>
          </List.ListItem>
          <List.ListItem className="list_item">
            <div className="card_icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <p>Speakers: 4 Peoples</p>
          </List.ListItem>
          <List.ListItem className="list_item">
            <div className="card_icon">
              <FontAwesomeIcon icon={faEarListen} />
            </div>
            <p>Listners: 123 Peoples</p>
          </List.ListItem>
        </List>
        <AvatarList avatarList={["male","female","male","female","female", "male", "male"]} />
      </div>
    </div>
  )
}

export default RoomCard