import React, { Fragment } from 'react'
import "./index.scss"
import TextCard from '../../../components/Shared/TextCard'
import RoomCard from '../../../components/Shared/RoomCard'
import Grid from '../../../components/elements/Grid'
import useAuth from '../../../hooks/useAuth'
import { ROOM } from '../../../constant/contents/rooms.contents' 
import { formateMessage } from '../../../helper'

const Rooms = () => {
  const {
    authenticatedUser
  } = useAuth();
  
  return (
    <Fragment>
      <div className="header_box">
        <TextCard
          title={formateMessage(ROOM.HEADER_TITLE_TEXT, { userFullName: authenticatedUser?.fullName })}
          titleClass="title_text"
          excert={ROOM.HEADER_EXCERT_TEXT}
          excertClass='excert_text'
        />
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