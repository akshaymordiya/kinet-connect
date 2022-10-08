import React, { Fragment, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

const baseClassName = "pagination_container";
const selectorComposeClassName = `${baseClassName}_selector_container`;
const navigationButtonClassName = `${baseClassName}_navigation_container`
const Pagination = function Pagination({
  children
}){
  return (
    <div className={`${baseClassName}`}>
      {children}
    </div>
  )
}



Pagination.Selector = function Selector({
  children = null,
  selectorTitle = "",
  selectorValue = "",
  selectorNumbers = [],
  showNumbersInOneRow = false,
  popoverStartFrom = "left"
}){

  const [isOpen, setIsOpen] = useState(false);

  const selectorNumbersIfNotInOneRow = useMemo(() => {
    if(showNumbersInOneRow){
      return selectorNumbers;
    }

    const offset = 5;
    let index = 0;
    const updatedArray = [];
    do {
      const peice = selectorNumbers.slice(index, index + offset);
      updatedArray.push(peice);
      index += offset
    } while (index <= (selectorNumbers.length - 1));

    return updatedArray

  }, [selectorNumbers]);

  return (
    <div className={`${selectorComposeClassName}`} onClick={() => setIsOpen((prev) => !prev)}>
      {children || (
        <Fragment>
          {isOpen && (
            <div className={`${selectorComposeClassName}_popover_container ${!showNumbersInOneRow && 'limited-width'}
            start_from_${popoverStartFrom}
            `}>
              {showNumbersInOneRow ? selectorNumbers.map((number) => (
                <p key={number} className={`numbers ${selectorValue === number && "active"}`}>{number}</p>
              )) : 
              selectorNumbersIfNotInOneRow.map((collection, index) => (
                <div key={index} className={`${selectorComposeClassName}_popover_container_collection`}>
                  {collection.map((number) => (
                    <p key={number} className={`numbers ${selectorValue === number && "active"}`}>{number}</p>
                  ))}
                </div>
              ))
            }  
            </div>
          )}
          <h1 className={`${selectorComposeClassName}_label`}>{selectorTitle} :</h1>
          <p className={`${selectorComposeClassName}_label_number`}>{selectorValue}</p>
          <FontAwesomeIcon icon={faAngleDown} className={`${baseClassName}_angle_down`} />
        </Fragment>
      )}
    </div>
  )
}

Pagination.NavigationButton = function NavigationButton({
  onNexClick = () => {},
  onPreviousClick = () => {},
  children = null
}){
  return children || (
    <div className={`${navigationButtonClassName}`}>
      <div 
        className={`${navigationButtonClassName}_button`}
        onClick={onPreviousClick}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </div>
      <div 
        className={`${navigationButtonClassName}_button`}
        onClick={onNexClick}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </div>
    </div>
  )
}

export default Pagination