import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const ViewIncome = () => {
    const [income,setIncome] = useState({
        incomeDesc:"",
        amount:"",
        incomeDate:""
    })
    const {id} = useParams()
    useEffect(()=>{
        loadIncome()
    },[])
    const loadIncome = async ()=>{
        const result = await axios.get(`http://localhost:8080/incomes/${id}`)
        setIncome(result.data)
    }
  return (
    <div>
      <div className='container'>
      <div className="row">
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>
                Income Details
            </h2>
            <div className="card">
                <div className="card-header">
                    Details of income id : {income.id}
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <b>Income Description : </b>
                            {income.incomeDesc}
                        </li>
                        <li className='list-group-item'>
                            <b>Amount : </b>
                            {income.amount}
                        </li>
                        <li className='list-group-item'>
                            <b>Income date : </b>
                            {income.incomeDate}
                        </li>
                    </ul>
                </div>
            </div>
            <Link className='btn btn-primary my-2' to={"/"}>Back to Home</Link>
            </div>
           
         </div>
     </div>
    </div>
  )
}

export default ViewIncome
