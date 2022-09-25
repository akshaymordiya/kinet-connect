import React, { Fragment, useState } from 'react'
import "./index.scss";
import Icon from '../../Icon'

const Collapse = ({ children, headingText, defaultExpanded = false }) => {

  const [isExpanded , setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <Fragment>
      <div className='header_section' onClick={toggleExpand}>
        <span>{headingText}</span>
        <Icon vecotrName='upper_below_arrow' className='collapse_icon_vector' />
      </div>
      <div className={`content ${isExpanded ? "expanded" : ""}`}>
        {children}
      </div>
    </Fragment>
  )
}

export default Collapse