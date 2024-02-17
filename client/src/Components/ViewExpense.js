import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ViewExpense = () => {
    const [expense,setExpense]= useState({
        expenseType:"",
        cost:"",
        expenseDate:""
    })
    const {id} = useParams()
    useEffect(()=>{
       loadExpense() 
    },[])
    const loadExpense=async()=>{
        const result = await axios.get(`http://localhost:8080/expense/${id}`);
        setExpense(result.data)
    }
  return (
    <div>
       <div className='container'>
      <div className="row">
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>
                Expense Details
            </h2>
            <div className="card">
                <div className="card-header">
                    Details of expense id : {expense.id}
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <b>Expense Category : </b>
                            {expense.expenseType}
                        </li>
                        <li className='list-group-item'>
                            <b>Cost : </b>
                            {expense.cost}
                        </li>
                        <li className='list-group-item'>
                            <b>Expense date : </b>
                            {expense.expenseDate}
                        </li>
                    </ul>
                </div>
            </div>
            <Link className='btn btn-primary my-2' to={"/"}>back to Home</Link>
            </div>
           
         </div>
     </div>
    </div>
  )
}

export default ViewExpense
