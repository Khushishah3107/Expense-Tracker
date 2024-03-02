import React, { useEffect, useState ,useRef} from 'react'
import Budget from '../Components/Budget'

import Expense from '../Components/Expense'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Income from '../Components/Income'
import {useReactToPrint} from "react-to-print";
const WarningMessage = () => (
  <div className="alert alert-warning" role="alert">
    Warning: Your budget is greater than 0!
  </div>
);
const Home = () => {
  const componentPDF = useRef();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [budget, setBudget] = useState(2000);
  
  const [transactions, setTransactions] = useState([]);
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
 
    loadTransactions();
  },[]);
  const {id} = useParams()
 
  const loadTransactions = async () => {
    const incomeResult = await axios.get('http://localhost:8080/incomes');
    const expenseResult = await axios.get('http://localhost:8080/expenses');
  
  
    const combinedTransactions = [
      ...expenseResult.data.map((expense) => ({ ...expense, isExpense: true })),
      ...incomeResult.data.map((income) => ({ ...income, isExpense: false })),
    ];
  
   
    const sortedTransactions = combinedTransactions.sort((a, b) => {
      const dateA = new Date(a.isExpense ? a.expenseDate : a.incomeDate);
      const dateB = new Date(b.isExpense ? b.expenseDate : b.incomeDate);
      return dateA - dateB;
    });
  
    setTransactions(sortedTransactions);
  };
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

    fetchIncomes();
    fetchExpenses();
  }, []);

  useEffect(() => {
    
    const newBudget = totalIncome - totalExpense;
    setBudget(newBudget);
    
    setWarning(newBudget < 0);
  }, [totalIncome, totalExpense]);
 
  const deleteTransaction = async (id, isExpense) => {
    const endpoint = isExpense ? "expense" : "income";
    await axios.delete(`http://localhost:8080/${endpoint}/${id}`);
    loadTransactions();
  }
  const generatePDF = useReactToPrint({
    content:()=>componentPDF.current,
    documentTitle:"ExpenseData",
    onAfterPrint:()=>alert("Data saved in PDF")
  })
  return (
    <>
    {warning && <WarningMessage />}
    <div className='container'>
      <h1 className='mt-3'>My Budget Planner</h1>
      <div className="row mt-3">
        <div className="col-sm">
            <Budget budget={budget}/>
        </div>
        <div className="col-sm">
           <Income totalIncome={totalIncome}/>
        </div>
        <div className="col-sm">
            <Expense totalExpense={totalExpense}/>
        </div>
      </div>
      <div className='container'>
      <div className="py-4">
        <div ref={componentPDF} style={{width:'100%'}}>
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
<div className='d-flex justify-content-center mb-3'>
  <button className='btn btn-success' onClick={generatePDF}>PDF</button>
</div>

      </div>
    </div>
    </div>
    
    <Link
          className={`btn btn-outline-danger mr-2 ${budget < 0 ? 'disabled' : ''}`}
          to={{ pathname: "/addexpense", state: { isExpense: true } }}
         
          style={{ marginRight: '13px' }}
        >
          Add Expense
        </Link>
      <Link className='btn btn-outline-success' to={{ pathname: "/addincome", state: { isExpense: false } }}>Add Income</Link>

    </>
  )
}

export default Home
