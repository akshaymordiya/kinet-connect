import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import List from '../../../../elements/List'
import TextCard from '../../../TextCard'
import { faEarListen, faUsers } from '@fortawesome/free-solid-svg-icons'

const baseClass = "room_existing_card"

const AlreadyExist = () => {
  return (
    <div className={`${baseClass}_container`}>
      <TextCard 
        title="Which framework is best for frontend ?"
        excert="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae"
        titleClass={`${baseClass}_container_title`}
        excertClass={`${baseClass}_container_description`}
      />
      <List className={`${baseClass}_container_list`}>
        <List.ListItem className="list_item">
          <div className="card_icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <p>Active Speakers: 4 Peoples</p>
        </List.ListItem>
        <List.ListItem className="list_item">
          <div className="card_icon">
            <FontAwesomeIcon icon={faEarListen} />
          </div>
          <p>Active Listners: 123 Peoples</p>
        </List.ListItem>
      </List>
    </div>
  )
}

export default AlreadyExist