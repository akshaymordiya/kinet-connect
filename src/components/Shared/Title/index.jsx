import React from 'react'
import "./index.scss"

const Title = ({ className = ""}) => {
  return (
    <h1 className={`title ${className}`}>KINET CONNECT</h1>
  )
}

export default Title