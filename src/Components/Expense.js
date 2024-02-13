import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Expense = () => {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const result = await axios.get("http://localhost:8080/expenses");
        const expenses = result.data;
        const total = expenses.reduce((acc, expense) => acc + expense.cost, 0);
        setTotalExpense(total);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className='alert alert-danger'>
      <span>Expended: ₹{totalExpense}</span>
    </div>
  );
};

export default Expense;
