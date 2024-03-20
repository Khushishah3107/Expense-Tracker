import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
const EditIncome = () => {
    const {id}=useParams()
    let navigate = useNavigate()
    const [income,setIncome] = useState({
        incomeDesc:"",
        amount:"",
        incomeDate:""
    })
    const{incomeDesc,amount,incomeDate}=income
    const onInputChange=(e)=>{
        setIncome({...income,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        loadIncome();
    },[])
    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/incomes/${id}`,income)
        navigate("/");
    }
    const loadIncome = async()=>{
        const result = await axios.get(`http://localhost:8080/incomes/${id}`)
        setIncome(result.data)
    }
  return (
    <div className="container">
    <div className="row">
     <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
         <h2 className='text-center m-4'>
             Edit Income
         </h2>
   <form onSubmit={(e)=>onSubmit(e)}>
     <div className="row mb-3">
       <label htmlFor="incomeDesc" className="col-sm-2 col-form-label">Income Description</label>
       <div className="col-sm-6">
         <input type={"text"} required="required" className='form-control' name='incomeDesc' placeholder='Enter Income Description' value={incomeDesc} onChange={(e)=>onInputChange(e)}/>
       </div>
     </div>
     <div className="row mb-3">
       <label htmlFor="cost" className="col-sm-2 col-form-label">Amount</label>
       <div className="col-sm-6">
         <input type={"text"} required="required" className='form-control' name='amount' value={amount} placeholder='Enter amount' onChange={(e)=>onInputChange(e)}/>
       </div>
     </div>
     <div className="row mb-3">
       <label htmlFor="expenseDate" className="col-sm-2 col-form-label">Income Date</label>
       <div className="col-sm-6">
         <input type={"date"} required="required" className='form-control' name='incomeDate' placeholder='Enter income date' value={incomeDate} onChange={(e)=>onInputChange(e)}/>
       </div>
     </div>
     <div className="row">
       <div className="col-sm">
         <button type='submit' className='btn btn-primary'>Edit Income</button>
         <Link to="/" className='btn btn-outline-danger mx-2'>Cancel</Link>
       </div>
     </div>
   </form>
 </div>
 </div>
 </div>
  )
}

export default EditIncome
