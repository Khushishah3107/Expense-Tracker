import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
const AddincomeForm = () => {
  let navigate = useNavigate()
  const [income,setIncome] = useState({
    incomeDesc:"",
    amount:"",
    incomeDate:""
  })
  const{incomeDesc,amount,incomeDate}= income
  const onInputChange=(e)=>{
    setIncome({...income,[e.target.name]:e.target.value})
  }
  const onSubmit=async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8080/income",income);
    navigate("/")
  }
  return (
    <div className="container">
       <div className="row">
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>
                Add Income
            </h2>
      <form onSubmit={(e)=>onSubmit(e)}>
        <div className="row mb-3">
          <label htmlFor="incomeDesc" className="col-sm-2 col-form-label">Income Description</label>
          <div className="col-sm-6">
            <input type={"text"} required="required" className='form-control' name='incomeDesc' placeholder='Enter income description' value={incomeDesc} onChange={(e)=>onInputChange(e)}/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="amount" className="col-sm-2 col-form-label">Amount</label>
          <div className="col-sm-6">
            <input type={"text"} required="required" className='form-control' name='amount' value={amount} placeholder='Enter amount' onChange={(e)=>onInputChange(e)}/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="incomeDate" className="col-sm-2 col-form-label">Income Date</label>
          <div className="col-sm-6">
            <input type={"date"} required="required" className='form-control' name='incomeDate' placeholder='Enter income date' value={incomeDate} onChange={(e)=>onInputChange(e)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <button type='submit' className='btn btn-primary'>Add Income</button>
            <Link to="/" className='btn btn-outline-danger mx-2'>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default AddincomeForm;
