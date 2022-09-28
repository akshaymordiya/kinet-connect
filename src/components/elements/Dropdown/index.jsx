import React, { useState } from 'react'
import "./index.scss"
import Icon from '../../Icon';
import Input from '../Input';

const Dropdown = ({
  options = [],
  selectedValue = "",
  placeHolderText = "Choose Value",
  setSelectedValuesHandler = () => {},
  enableSearchOnOptions = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionsData, setOptionsData] = useState({
    list: options,
    filteredList: [],
    isFiltered: false
  })

  const toggleChangeHandler = () => {
    setIsOpen(!isOpen);
  };

  const filterHandler = ({ target: { value }}) => {
    const filteredData = optionsData.list.filter((val) => {
      return val.displayText.toUpperCase().indexOf(value?.toUpperCase()) > -1
    }) || [];

    setOptionsData({
      ...optionsData,
      filteredList: filteredData,
      isFiltered: filteredData.length > 0
    });
  };

  const optionClickHandler = (value) => {
    setSelectedValuesHandler(value);
    setIsOpen(false); 
  }

  return (
    <div className="dropdown_container">
      <div className="selected_value" onClick={toggleChangeHandler}>
        <p className={` selected_text ${!selectedValue && 'placeholder-text'}`}>{selectedValue ? selectedValue : placeHolderText}</p>
        <Icon
          vecotrName="down_arrow"
        />
      </div>
      <ul className={`options_list ${isOpen ? "show" : ""}`}>
        {enableSearchOnOptions && (
          <li className='option_list_item'>
            <Input 
              placeholder="Search..."
              className="option_list_item_input"
              onChange={filterHandler}
              />
          </li>
        )}
        {optionsData[optionsData.isFiltered ? "filteredList" : "list"].map(({ key, value, displayText }) => (
          <li key={key} className={`option_list_item ${selectedValue === displayText ? "active" : ""}`} onClick={() => optionClickHandler(value)}><p>{displayText}</p></li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown