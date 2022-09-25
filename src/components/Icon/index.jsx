import React, { memo } from 'react'
import "./index.scss"

const Icon = ({ vecotrName = "", extension = "png", bgWrapper = false, className = "", bgWrapperClass = "", onClick = () => {} }) => {

  if(bgWrapper){
    return (
      <div 
        className={`background_Wrapper ${bgWrapperClass}`}
        onClick={onClick}
      >
        <img src={`/images/vector/${vecotrName}.${extension}`} className={className} />
      </div>
    )
  }

  return (
    <img 
      src={`/images/vector/${vecotrName}.${extension}`} className={className}
      onClick={onClick}
    />
  )
}

export default memo(Icon)