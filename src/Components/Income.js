import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Income = () => {
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const result = await axios.get("http://localhost:8080/incomes");
        const incomes = result.data;
        const total = incomes.reduce((acc, income) => acc + income.amount, 0);
        setTotalIncome(total);
      } catch (error) {
        console.error("Error fetching incomes", error);
      }
    };

    fetchIncomes();
  }, []);

  return (
    <div className='alert alert-success' style={{ height: `${70}px` }}>
      <span>Income: ₹{totalIncome}</span>
    </div>
  );
};

export default Income;
