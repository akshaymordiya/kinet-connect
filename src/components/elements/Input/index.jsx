import React, { forwardRef } from 'react';
import Loader from '../../Shared/Loader';
import "./index.scss"

const Input = forwardRef(({
  className,
  placeholder = "",
  type = "",
  value = "",
  onChange = () => {},
  onBlur = () => {},
  rightPlacement = null,
  rightPlacementClassName = "",
  leftPlacement = null,
  leftPlacementClassName = "",
  showLoaderOnRightPlacement = false,
  inputAdditionalProps = {}
}, inputRef) => {
  return (
    <div className="input_container">
      {leftPlacement && (
        <div className={`input_container_left_placement ${leftPlacementClassName}`}>
          {leftPlacement}
        </div>
      )}
      <input
        ref={inputRef}
        className={className}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...inputAdditionalProps}
      />
      {showLoaderOnRightPlacement && (
        <Loader 
          show={showLoaderOnRightPlacement} className="input_container_custom_loader"
          xClassName='input_container_custom_loader_x'
          yClassName='input_container_custom_loader_y' 
        />
      )}
      {rightPlacement && (
        <div    
        className={`input_container_right_placement ${rightPlacementClassName}`}>
          {rightPlacement}
        </div>
      )}
    </div>
  )
})

export default Input