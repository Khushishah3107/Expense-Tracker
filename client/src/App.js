import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Pages/Home';
import AddExpenseForm from './Components/AddExpenseForm';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom'; 
import AddincomeForm from './Components/AddIncomeForm';
import ViewExpense from './Components/ViewExpense';
import EditExpense from './Components/EditExpense';
import EditBudget from './Components/EditBudget';
import Navbar from './Components/Navbar';
import Statistics from './Components/Statistics';
import AddCategoryForm from './Components/AddCategoryForm';
import ViewIncome from './Components/ViewIncome';
import EditIncome from './Components/EditIncome';

function App() {
  return (
    <div className="App">
     
        <Router>
        <Navbar/>
      <Routes>
        
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/statistics' element={<Statistics/>}/>
        <Route exact path='/addexpense' element={<AddExpenseForm/>}/>
        <Route exact path='/addincome' element={<AddincomeForm/>}/>
        {/* <Route exact path='/viewtransaction/:id' element={<ViewExpense/>}/> */}
        {/* <Route exact path='/edittransaction/:id' element={<EditExpense/>}/> */}
        <Route exact path='/viewExpense/:id' element={<ViewExpense/>}/>
        <Route exact path='/viewIncome/:id' element={<ViewIncome/>}/>
        <Route exact path='/editIncome/:id' element={<EditIncome/>}/>
        <Route exact path='/editExpense/:id' element={<EditExpense/>}/> 
        <Route exact path='/editbudget' element={<EditBudget/>}/>
        <Route exact path='/cat' element={<AddCategoryForm/>}/>
      </Routes>
     
      </Router>
      {/* <Login/> */}
    </div>
  );
}

export default App;
