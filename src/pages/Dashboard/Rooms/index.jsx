import React, { Fragment, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import "./index.scss"
import RoomCard from '../../../components/Shared/RoomCard'
import Grid from '../../../components/elements/Grid'
import { ROOM } from '../../../constant/contents/rooms.contents' 
import HeaderBox from '../../../components/Shared/HeaderBox'
import Input from '../../../components/elements/Input'
import Button from '../../../components/elements/Button'
import Dropdown from '../../../components/elements/Dropdown';

const sortOptions = [
  {
    key: "latest",
    value: "latest",
    displayText: "Latest First"
  },
  {
    key: "trending-topics",
    value: "trending-topics",
    displayText: "Trending Topics"
  }
]

const Rooms = () => {

  const [searchText, setSearchText] = useState("");
  // const [sortOption, setSortOption] = useState("");

  return (
    <Fragment>
      <HeaderBox 
        titleText={ROOM.HEADER_TITLE_TEXT}
      />
      <div className='rooms_header_container'>
        <Input 
          placeholder="search"
          containerClassName="rooms_header_container_input_container"
          className="rooms_header_container_input_container_input_box"
          leftPlacement={(
            <FontAwesomeIcon icon={faSearch} />
          )}
          type="text"
          value={searchText}
          onChange={({ target: { value }}) => setSearchText(value)}
        />
        <div className='rooms_header_container_right_portion'>
          <Button
            text="Refresh"
          />
        </div>
      </div>
      <Grid templateColumns={{lg: "col_3", xlg: "col_4"}} overrideClass='rooms_list'>
        <Grid.GridItem>
          <RoomCard />
        </Grid.GridItem>
        <Grid.GridItem>
          <RoomCard />
        </Grid.GridItem>
        <Grid.GridItem>
          <RoomCard />
        </Grid.GridItem>
        <Grid.GridItem>
          <RoomCard />
        </Grid.GridItem>
        <Grid.GridItem>
          <RoomCard />
        </Grid.GridItem>
        <Grid.GridItem>
          <RoomCard />
        </Grid.GridItem>
        <Grid.GridItem>
          <RoomCard />
        </Grid.GridItem>
        <Grid.GridItem>
          <RoomCard />
        </Grid.GridItem>
        <Grid.GridItem>
          <RoomCard />
        </Grid.GridItem>
      </Grid>
    </Fragment>
  )
}

export default Rooms