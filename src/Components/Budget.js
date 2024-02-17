import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Budget = () => {
  const [budget, setBudget] = useState(2000);
  const [editMode, setEditMode] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setBudget(newBudget);
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setNewBudget(budget);
  };

  return (
    <div className='alert alert-secondary'>
      <span>Budget: ₹{budget}</span>
      {editMode ? (
        <>
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
          />
          <button className='btn btn-success mx-2' onClick={handleSaveClick}>Save</button>
          <button className='btn btn-secondary mx-2' onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <button className='btn btn-outline-primary mx-4' onClick={handleEditClick}>Edit Budget</button>
      )}
    </div>
  );
};

export default Budget;
