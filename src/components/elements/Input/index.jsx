import React, { forwardRef } from 'react';
import Loader from '../../Shared/Loader';
import "./index.scss"

const Input = forwardRef(({
  className,
  containerClassName = "",
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
  minLength = "30",
  maxLength = "60",
  inputAdditionalProps = {}
}, inputRef) => {
  return (
    <div className={`input_container ${containerClassName}`}>
      {leftPlacement && (
        <div className={`input_container_left_placement ${leftPlacementClassName}`}>
          {leftPlacement}
        </div>
      )}
      {type === "textarea" ? (
        <textarea
          ref={inputRef}
          placeholder={placeholder}
          className={className}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          minLength={minLength}
          maxLength={maxLength}
          {...inputAdditionalProps}
          />
      ) : (
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
      )}
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