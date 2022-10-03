import React from 'react'
import Input from '../../../../elements/Input'

const InputComponent = ({
  details,
  updateDetails
}) => {
  return (
    <div className="room_input_container">
      <div className='room_input_container_block'>
        <label htmlFor="room_topic" className='room_input_container_block_label'>Topic</label>
        <Input
          id="room_topic"
          type="text"
          placeholder="Topic"
          containerClassName="room_input_container_block_input_wrapper"
          className="room_input_container_block_input_wrapper_input"
          value={details.topic}
          onChange={({ target : { value }}) => updateDetails("topic", value)}
        />
      </div>
      <div className='room_input_container_block'>
        <label htmlFor="room_description" className='room_input_container_block_label'>Description</label>
        <Input
          id="room_description"
          type="textarea" 
          minLength="30"
          maxLength="100"
          placeholder="Description"
          containerClassName="room_input_container_block_input_wrapper_input"
          className="room_input_container_block_input_wrapper_input"
          value={details.description}
          onChange={({ target : { value }}) => updateDetails("description", value)}
        />
      </div>
      
    </div>
  )
}

export default InputComponent