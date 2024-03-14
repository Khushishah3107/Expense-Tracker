import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [existingCategories, setExistingCategories] = useState([]);
  const [categoryExists, setCategoryExists] = useState(false);
  const [categoryAdded, setCategoryAdded] = useState(false); // State to manage success message


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setExistingCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const exists = existingCategories.some(
        category => category.categoryName === categoryName
      );

      if (exists) {
        setCategoryExists(true);
        return;
      }

      const response = await axios.post('http://localhost:8080/placeCategory', {
        category: {
          categoryName: categoryName,
        },
      });

      console.log('Server Response:', response.data);
      setCategoryAdded(true); // Set categoryAdded state to true on successful addition
      setCategoryName(""); // Clear input field after successful addition

    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Category</h2>
          {categoryAdded && (
            <div className="alert alert-success" role="alert">
              Category added successfully!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">Category Name</label>
              <input
                required
                type="text"
                placeholder='Enter new Category'
                className={`form-control ${categoryExists ? 'is-invalid' : ''}`}
                id="categoryName"
                value={categoryName}
                onChange={(e) => {
                  setCategoryExists(false);
                  setCategoryAdded(false); // Reset categoryAdded state when input changes
                  setCategoryName(e.target.value);
                }}
              />
              {categoryExists && (
                <div className="invalid-feedback" style={{ fontSize: "18px" }}>
                  "This category already exists! Please add a different one."
                </div>
              )}
            </div>
            <div className="col-sm">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding Category...' : 'Add Category'}
              </button>
              <Link to="/" className="btn btn-outline-danger mx-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
