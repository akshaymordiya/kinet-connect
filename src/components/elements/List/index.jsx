import React from 'react'
import "./index.scss"

const List = function List({ children, className = ""}) {
    return (
      <ul className={`${className} list`}>{children}</ul>
    )
}


List.ListItem = function ListItem ({ children, className = "" }) {
  return (
    <li className={`${className} list_item`}>
      {children}
    </li>
  )
}

export default List