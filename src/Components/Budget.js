import React from 'react'
import { Link } from 'react-router-dom'
const Budget = () => {
  return (
    <div className='alert alert-secondary'>
        <span>Budget:  ₹2000</span>
        {/* <Link className='btn btn-outline-primary mx-2' to={'/editbudget'}>Edit</Link> */}
    </div>
  )
}

export default Budget
