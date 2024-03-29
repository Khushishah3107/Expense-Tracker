
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddExpenseForm = () => {
  let navigate = useNavigate();

  const [expense, setExpense] = useState({
    expenseType: '',
    cost: '',
    expenseDate: '',
    categoryId: '' // New property for category ID
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const { expenseType, cost, expenseDate, categoryId } = expense;

  const onInputChange = (e) => {
    if (e.target.name === 'categoryId') {
      setExpense({ ...expense, categoryId: e.target.value });
    } else {
      setExpense({ ...expense, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      const selectedCategory = categories.find((category) => {
        return category.id === parseInt(expense.categoryId);
      });
  
      console.log("Selected Category:", selectedCategory);
  
      const updatedExpense = {
        ...expense,
        categoryId: selectedCategory.id,
        category: selectedCategory, // Set the entire category object
      };
  
      const response = await axios.post('http://localhost:8080/expense', updatedExpense, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      navigate('/');
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Expense</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Other input fields */}
            {/* ... */}
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
            <div className="row mb-3">
              <label htmlFor="categoryId" className="col-sm-2 col-form-label">
                Category
              </label>
              <div className="col-sm-6">
              <select
  className="form-select"
  name="categoryId"
  value={categoryId}
  onChange={(e) => onInputChange(e)}
>
  <option value="">Select a category</option>
  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.categoryName}
    </option>
  ))}
</select>

              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <button type="submit" className="btn btn-primary">
                  Add Expense
                </button>
                <Link to="/" className="btn btn-outline-danger mx-2">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseForm;


