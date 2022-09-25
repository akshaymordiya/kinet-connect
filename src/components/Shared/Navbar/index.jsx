import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useAuth from '../../../hooks/useAuth';
import API from '../../../http';
import Button from '../../elements/Button';
import "./index.scss";

const Navbar = ({
  renderInsideLeftWrapper = null,
  renderInsideRightWrapper = null,
  navItemsClass = ""
}) => {

  const {
    handleAuthUserLogout
  } = useAuth({});

  const handleLogout = () => {
    API.auth.logout().then((res) => {
      if(res?.statusCode === 200 && res?.isLoggedOut){
        handleAuthUserLogout();
      }
    }).catch((err) => console.error(err))
  }

  return (
    <nav className={`nav_items ${navItemsClass}`}>
      <div className='nav_items_wrapper'>
        {renderInsideLeftWrapper && renderInsideLeftWrapper}
      </div>
      <div className='nav_items_wrapper'>
        {renderInsideRightWrapper && renderInsideRightWrapper}
        <div className="nav_items_wrapper_devider"></div>
        <Button 
          text="Logout" 
          className="logout_btn"
          onClick={handleLogout}
          showAdditionalIcon={(
            <FontAwesomeIcon icon={faRightFromBracket} />
          )}
        />
      </div>
    </nav>
  )
}

export default Navbar