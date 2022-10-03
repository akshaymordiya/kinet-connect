import React, { useMemo } from 'react'

const TypeOptions = ({
  activeType = "",
  updateType
}) => {

  const activeTypeFormattedName = useMemo(() => {
    return activeType.charAt(0).toUpperCase() + activeType.slice(1)
  }, [activeType])

  return (
    <div className="room_types_options_container">
      <h4>
        Room should be treated as
        <span> {activeTypeFormattedName}</span> Room.
      </h4>
      <div className="room_types_options_container_options_blocks">
        <div>
          <div 
            className={`room_types_options_container_options_blocks_type ${activeType === "public" && "active"}`}
            onClick={() => updateType("public")}
            >
            <img src="../images/3d/earth.webp" />
          </div>
          <p>Public</p>
        </div>
        <div>
          <div 
            className={`room_types_options_container_options_blocks_type ${activeType === "private" && "active"}`}
            onClick={() => updateType("private")}
          >
            <img src="../images/3d/sheild.webp" />
          </div>
          <p>Priavte</p>
        </div>
      </div>
    </div>
  )
}


export default TypeOptions