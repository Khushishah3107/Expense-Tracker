import React from 'react';

const Expense = ({ totalExpense }) => {
  return (
    <div className='alert alert-danger' style={{ height: `${70}px` }}>
      <span>Expended: ₹{totalExpense}</span>
    </div>
  );
};

export default Expense;
