import React from 'react'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='vh-100'>
      <h1 className='text-center fw-bold'>Socket Chat</h1>
      <Chat />
    </div>
  )
}

export default Home
