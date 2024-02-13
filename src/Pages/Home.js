import React, { useEffect, useState } from 'react'
import Budget from '../Components/Budget'
import Remaining from '../Components/Remaining'
import Expense from '../Components/Expense'

import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
const Home = () => {
  const [expenses,setExpenses] = useState([]);
  // const [incomes,setIncomes] = useState([]);
  useEffect(()=>{
    loadExpenses();
    // loadIncomes();
  },[]);
  const {id} = useParams()
  const loadExpenses = async()=>{
    const result = await axios.get("http://localhost:8080/expenses");
    setExpenses(result.data);
  }
  // const loadIncomes = async()=>{
  //   const result = await axios.get("http://localhost:8080/incomes");
  //   setIncomes(result.data);
  // }
  const deleteExpense=async(id)=>{
    await axios.delete(`http://localhost:8080/expense/${id}`)
    loadExpenses()
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
            <Remaining/>
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
      <th scope="col">Cost</th>
      <th scope="col">Date</th>
      <th scope='col'>Actions</th>
    </tr>
  </thead>
  <tbody>
    {
        expenses.map((expense,index)=>(
          <tr >
                <th scope="row" key={index}>{index+1}</th>
                <td>{expense.expenseType}</td>
                <td>{expense.cost}</td>
                <td>{expense.expenseDate}</td>
                <td>
                    <Link className='btn btn-primary mx-2' to={`/viewexpense/${expense.id}`}>View</Link>
                    <Link className='btn btn-outline-primary mx-2' to={`/editexpense/${expense.id}`}>Edit</Link>
                    <button className='btn btn-danger mx-2' onClick={()=>deleteExpense(expense.id)}>Delete</button>
                </td>
            </tr>
        ))
    }
    
   
    
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
