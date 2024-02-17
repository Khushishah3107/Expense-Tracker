import React from 'react';

const Income = ({ totalIncome }) => {
  return (
    <div className='alert alert-success' >
      <span>Income: ₹{totalIncome}</span>
    </div>
  );
};

export default Income;
