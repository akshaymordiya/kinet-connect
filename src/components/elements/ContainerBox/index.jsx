import React from 'react';
import "./index.scss"

const ContainerBox = ({ title, paragraph, children, titleClass = "", paragraphClass = ""}) => {
  return (
    <div className="container_box">
      <div className="title_text">
        <h1 className={titleClass}>{title}</h1>
        <p className={paragraphClass} >{paragraph}</p>
      </div>
      {children}
    </div>
  )
}

export default ContainerBox