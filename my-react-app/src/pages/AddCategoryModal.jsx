// src/components/AddCategoryModal.jsx

import React, { useState } from 'react';
import api from '../api/api'; // Adjust the path if necessary
import './modal.css'; // Ensure this path is correct based on your project structure

const AddCategoryModal = ({ isOpen, onClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setError('Category name is required.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/blog/categories', { name: categoryName.trim() });
      // Adjusted to match the actual API response
      const { categoryId, message } = response.data;
      
      if (categoryId) {
        // Pass categoryId and categoryName to the parent component
        onCategoryAdded(categoryId, categoryName.trim());
        setCategoryName('');
        setError('');
        onClose();
      } else {
        // Handle unexpected API response structure
        setError('Unexpected response from the server.');
      }
    } catch (err) {
      console.error('Error adding category:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add category.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal__title">Add New Category</h2>
        {error && <p className="modal__error">{error}</p>}
        <form onSubmit={handleAddCategory} className="modal__form">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="modal__input"
            placeholder="Enter category name"
          />
          <button type="submit" className="modal__submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
