import React from 'react';

const Budget = ({ budget }) => {
  return (
    <div className='alert alert-secondary'>
      <span>Budget: ₹{budget}</span>
    </div>
  );
};

export default Budget;
