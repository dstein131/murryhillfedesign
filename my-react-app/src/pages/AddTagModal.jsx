// src/components/AddTagModal.jsx

import React, { useState } from 'react';
import api from '../api/api'; // Adjust the path if necessary
import './modal.css'; // Ensure this path is correct based on your project structure

const AddTagModal = ({ isOpen, onClose, onTagAdded }) => {
  const [tagName, setTagName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) {
      setError('Tag name is required.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/blog/tags', { name: tagName.trim() });
      // Adjusted to match the actual API response
      const { tagId, message } = response.data;
      
      if (tagId) {
        // Pass tagId and tagName to the parent component
        onTagAdded(tagId, tagName.trim());
        setTagName('');
        setError('');
        onClose();
      } else {
        // Handle unexpected API response structure
        setError('Unexpected response from the server.');
      }
    } catch (err) {
      console.error('Error adding tag:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add tag.');
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
        <h2 className="modal__title">Add New Tag</h2>
        {error && <p className="modal__error">{error}</p>}
        <form onSubmit={handleAddTag} className="modal__form">
          <label htmlFor="tagName">Tag Name:</label>
          <input
            type="text"
            id="tagName"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            required
            className="modal__input"
            placeholder="Enter tag name"
          />
          <button type="submit" className="modal__submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Tag'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTagModal;
