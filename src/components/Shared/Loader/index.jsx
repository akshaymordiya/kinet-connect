import React, { Fragment } from 'react'
import "./index.scss";

const Loader = ({
  show = false,
  className = "",
  xClassName = "",
  yClassName = "",
  loadingText = null,
  loadingTextClasses = "",
  enableFullScreenMode = false
}) => {
  return (
    <Fragment>
      <div className={`loading_outer_wrapper ${enableFullScreenMode && "fullHeight"}`}>
        <div className={`loading_inner_wrapper ${show && 'visible'} ${className}`}>
          <div className={`loader_Y ${yClassName}`}>
          </div>
          <div className={`loader_X ${xClassName}`}>
          </div>
          {loadingText && (
            <p className={`loading_text ${loadingTextClasses}`}>{loadingText}</p>
            )}
        </div>
      </div>
    </Fragment>
  )
}




export default Loader