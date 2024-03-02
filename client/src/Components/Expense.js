import React from 'react';

const Expense = ({ totalExpense }) => {
  return (
    <div className='alert alert-danger' >
      <span>Expended: ₹{totalExpense}</span>
    </div>
  );
};

export default Expense;
