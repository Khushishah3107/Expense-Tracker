import React, { useEffect, useState } from 'react'
import Budget from '../Components/Budget'
import Remaining from '../Components/Remaining'
import Expense from '../Components/Expense'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Income from '../Components/Income'
const Home = () => {
  // const [expenses,setExpenses] = useState([]);
  // const [incomes,setIncomes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  useEffect(()=>{
   // loadExpenses();
    // loadIncomes();
    loadTransactions();
  },[]);
  const {id} = useParams()
  // const loadExpenses = async()=>{
  //   const result = await axios.get("http://localhost:8080/expenses");
  //   setExpenses(result.data);
  // }

  // const loadIncomes = async()=>{
  //   const result = await axios.get("http://localhost:8080/incomes");
  //   setIncomes(result.data);
  // }
  const loadTransactions = async () => {
    const incomeResult = await axios.get('http://localhost:8080/incomes');
    const expenseResult = await axios.get('http://localhost:8080/expenses');
  
    // Assuming your income and expense structures have different column names
    const combinedTransactions = [
      ...expenseResult.data.map((expense) => ({ ...expense, isExpense: true })),
      ...incomeResult.data.map((income) => ({ ...income, isExpense: false })),
    ];
  
    // Sort transactions by date in ascending order
    const sortedTransactions = combinedTransactions.sort((a, b) => {
      const dateA = new Date(a.isExpense ? a.expenseDate : a.incomeDate);
      const dateB = new Date(b.isExpense ? b.expenseDate : b.incomeDate);
      return dateA - dateB;
    });
  
    setTransactions(sortedTransactions);
  };
  
  const deleteTransaction = async (id, isExpense) => {
    const endpoint = isExpense ? "expense" : "income";
    await axios.delete(`http://localhost:8080/${endpoint}/${id}`);
    loadTransactions();
  }
  return (
    <>
  
    <div className='container'>
      <h1 className='mt-3'>My Budget Planner</h1>
      <div className="row mt-3">
        <div className="col-sm">
            <Budget/>
        </div>
        <div className="col-sm">
           <Income/>
        </div>
        <div className="col-sm">
            <Expense/>
        </div>
      </div>
      <div className='container'>
      <div className="py-4">
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Category</th>
      <th scope="col">Amount</th>
      <th scope="col">Date</th>
      <th scope='col'>Actions</th>
    </tr>
  </thead>
  <tbody>
        {transactions.map((transaction, index) => (
        <tr key={index} className={`table-row ${transaction.isExpense ? 'table-danger' : 'table-success'}`}>
            <th scope="row">{index + 1}</th>
            <td>{transaction.isExpense ? transaction.expenseType : transaction.incomeDesc}</td>
            <td>₹{transaction.isExpense ? transaction.cost : transaction.amount}</td>
            <td>{transaction.isExpense ? transaction.expenseDate : transaction.incomeDate}</td>
           <td>
  <div className="btn-group">
    <Link className='btn btn-primary' to={`/viewtransaction/${transaction.id}`}>
      <FontAwesomeIcon icon={faEye} />
    </Link>
    <Link className='btn btn-outline-primary' to={`/edittransaction/${transaction.id}`}>
      <FontAwesomeIcon icon={faEdit} />
    </Link>
    <button className='btn btn-danger' onClick={() => deleteTransaction(transaction.id, transaction.isExpense)}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  </div>
</td>
          </tr>
        ))}
      </tbody>
</table>
      </div>
    </div>
    </div>
    {/* <AddExpenseForm/> */}
    <Link className='btn btn-outline-danger mr-2' to={{ pathname: "/addexpense", state: { isExpense: true } }} style={{ marginRight: '13px' }}>Add Expense</Link>
      <Link className='btn btn-outline-success' to={{ pathname: "/addincome", state: { isExpense: false } }}>Add Income</Link>

    </>
  )
}

export default Home
