import React from 'react'
import ExpenseItem from './ExpenseItem'
const ExpenseList = () => {
    const expenses = [
        {id:1231,name:"Shopping",cost:50},
        {id:1232,name:"Holiday",cost:50},
        {id:1233,name:"Transportaion",cost:50},
        {id:1234,name:"Fuel",cost:50},
        {id:1235,name:"Child Care",cost:50},
    ]
  return (
    <ul className='list-group'>
        {expenses.map((expense)=>(
            <ExpenseItem key={expense.id} name={expense.name} cost={expense.cost}/>
        ))}
    </ul>
  )
}

export default ExpenseList
