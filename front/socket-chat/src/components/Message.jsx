import React from 'react'

const Message = ({msg, color}) => {
  return (
    <div className='my-4'>
        <span className={color}><b>{msg.username}</b>: {msg.message}</span>
    </div>
  )
}

export default Message
