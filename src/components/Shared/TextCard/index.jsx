import React, { Fragment } from 'react'
import "./index.scss"

const TextCard = ({ title, excert, titleClass = "", excertClass = "" }) => {
  return (
    <Fragment>
      <h1 className={`card_title ${titleClass}`}>{title}</h1>
      <p className={`card_excert ${excertClass}`}>{excert}</p>
    </Fragment>
  )
}

export default TextCard