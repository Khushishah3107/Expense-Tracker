import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const EditExpense = () => {
    const {id}=useParams()
    let navigate = useNavigate()
    const [expense,setExpense] = useState({
        expenseType:"",
    cost:"",
    expenseDate:""
    })
    const{expenseType,cost,expenseDate}= expense
    const onInputChange=(e)=>{
        setExpense({...expense,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        loadExpense();
    },[])
    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/expense/${id}`,expense)
        navigate("/");
    }
    const loadExpense = async()=>{
        const result = await axios.get(`http://localhost:8080/expense/${id}`)
        setExpense(result.data)
    }
  return (
    <div className="container">
    <div className="row">
     <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
         <h2 className='text-center m-4'>
             Edit Expense
         </h2>
   <form onSubmit={(e)=>onSubmit(e)}>
     <div className="row mb-3">
       <label htmlFor="expenseType" className="col-sm-2 col-form-label">Expense Type</label>
       <div className="col-sm-6">
         <input type={"text"} required="required" className='form-control' name='expenseType' placeholder='Enter expense type' value={expenseType} onChange={(e)=>onInputChange(e)}/>
       </div>
     </div>
     <div className="row mb-3">
       <label htmlFor="cost" className="col-sm-2 col-form-label">Cost</label>
       <div className="col-sm-6">
         <input type={"text"} required="required" className='form-control' name='cost' value={cost} placeholder='Enter cost' onChange={(e)=>onInputChange(e)}/>
       </div>
     </div>
     <div className="row mb-3">
       <label htmlFor="expenseDate" className="col-sm-2 col-form-label">Expense Date</label>
       <div className="col-sm-6">
         <input type={"date"} required="required" className='form-control' name='expenseDate' placeholder='Enter expense date' value={expenseDate} onChange={(e)=>onInputChange(e)}/>
       </div>
     </div>
     <div className="row">
       <div className="col-sm">
         <button type='submit' className='btn btn-primary'>Edit Expense</button>
         <Link to="/" className='btn btn-outline-danger mx-2'>Cancel</Link>
       </div>
     </div>
   </form>
 </div>
 </div>
 </div>
  )
}

export default EditExpense
