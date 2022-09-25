import React from 'react'
import { Outlet } from 'react-router-dom'
import Title from '../../../components/Shared/Title'
import './OnBoard.scss'

const OnBoard = () => {
  return (
    <div className="container container_wrapper">
      <div className="row">
        <div className="col_6_left">
          <div className="headline_box">
            <Title />
            <p className="headline_box_description">
              it is a long establish fact that a reader will be distracted by thte readable content of the a page when looking at its layout.
            </p>
          </div>
          <div className="image_container">
            <img src="/images/background/background.png"   alt="background" className="background_image" />
          </div>
        </div>
        <div className="col_6_right">
          <Outlet />
          {/* <div className="logo_container">
            <img src="/images/company_logo.png" className="company_logo" />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default OnBoard