import React, { useState, useEffect } from 'react';
import BarChart from './LineChart';

const Statistics = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Expense',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
        borderColor: 'rgba(255, 99, 132, 1)', 
        borderWidth: 3,
        fill: false,
      },
      {
        label: 'Income',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        borderColor: 'rgba(75, 192, 192, 1)', 
        borderWidth: 3,
        fill: false,
      },
    ],

  });

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        // Replace 'your_expense_api_endpoint' and 'your_income_api_endpoint' with your actual API endpoints
        const expenseResponse = await fetch('http://localhost:8080/expenses');
        const incomeResponse = await fetch('http://localhost:8080/incomes');
  
        const expenseData = await expenseResponse.json();
        const incomeData = await incomeResponse.json();
  
        // Combine and sort dates
        const allDates = [
          ...expenseData.map(item => item.expenseDate),
          ...incomeData.map(item => item.incomeDate)
        ].sort((a, b) => new Date(a) - new Date(b));
  
        // Deduplicate dates
        const uniqueDates = Array.from(new Set(allDates));
  
        // Generate chart data
        const combinedData = {
          labels: uniqueDates,
          datasets: [
            {
              label: 'Expense',
              data: expenseData.map(item => ({ x: item.expenseDate, y: item.cost })),
            },
            {
              label: 'Income',
              data: incomeData.map(item => ({ x: item.incomeDate, y: item.amount })),
            },
          ],
        };
  
        setChartData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
    <div style={{ width: '80%', height: '80%' }}>
      <BarChart chartData={chartData} xAxisLabel="Date" yAxisLabel="Amount"/>
    </div>
  </div>
  
   
  );
};

export default Statistics;
