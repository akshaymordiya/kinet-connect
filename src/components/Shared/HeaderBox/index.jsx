import React from 'react'
import TextCard from '../TextCard'
import "./index.scss"

const HeaderBox = ({
  titleText = "",
  excertText = ""
}) => {
  return (
    <div className="header_box">
      <TextCard
        title={titleText}
        titleClass="title_text"
        excert={excertText}
        excertClass='excert_text'
      />
    </div>
  )
}

export default HeaderBox