import React, { useMemo, useCallback } from 'react'
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faEnvelopeCircleCheck, faBookmark, faGrip } from "@fortawesome/free-solid-svg-icons";
import Title from '../Title'
import UserDetailsCard from '../UserDetailsCard';
import Button from '../../elements/Button';
import List from '../../elements/List';
import menuItems from '../../../constant/navigations';
import "./index.scss";
import useModal from '../../../hooks/useModal';
import { MODAL_KEYS } from '../../../constant/modalKeys/modal.keys';
import CreateRoomModal from '../CreateRoomModal';

const linkDefaultStyle = { textDecoration: 'none'}

const Sidebar = () => {

  const user = useSelector((state) => state.auth.user);
  const { pathname } = useLocation();
  const createNewRoomModal = useModal(MODAL_KEYS.CREATE_NEW_ROOM);
  
  const menuItemsIcon = useMemo(() => {
    return {
      faGrip,
      faBookmark,
      faEnvelopeCircleCheck,
      faAddressCard
    }
  }, []);

  const openCreateNewRoomPopup = useCallback(() => {
    createNewRoomModal.activateModal(true)
  }, [createNewRoomModal]);

  return (
    <div className="sidebar_container">
      <Title />
      <UserDetailsCard user={user} />
      <List className='navigation_items'>
        {menuItems.map((menu) => (
          <Link  key={menu.id} to={menu.route} style={linkDefaultStyle}>
            <List.ListItem className={`navigation_item ${pathname === menu.route && 'active'}`}>
                <div className='navigation_item_icons_wrapper'>
                  <FontAwesomeIcon icon={menuItemsIcon[menu.icon]} className="nav_icon" />
                </div>
                <span>{menu.displayTitle}</span>
            </List.ListItem>
          </Link>
        ))}
      </List>
      <div className="bottom_btns">
        <Button 
          text="Join Private Room" 
          className='btn'
        />
        <Button 
          text="Create New Room"
          className="btn"
          startIcon='voice' 
          iconClasses="btn_start_icon"
          onClick={openCreateNewRoomPopup}
        />
      </div>
      <CreateRoomModal modalData={createNewRoomModal} />
    </div>
  )
}

export default Sidebar