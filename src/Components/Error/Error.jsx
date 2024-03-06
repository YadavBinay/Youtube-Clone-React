import React from 'react'
import './Error.css'
import tech from '../../assets/tech.png'
const Error = ({msg}) => {
  return (
    <div className='error'>
        <img src={tech} alt="" />
        <h1>Failed To Serve</h1>
        <h2>{msg}</h2>
    </div>
  )
}

export default Error