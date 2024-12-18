// src/components/admin/ServicesManagement.jsx

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createService, updateService, deleteService, fetchServices } from '../../redux/servicesSlice';

const ServicesManagement = ({ services, loading }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.services);

  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null); // For editing
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
  });

  const handleClose = () => {
    setShowModal(false);
    setCurrentService(null);
    setFormData({ title: '', price: '', description: '' });
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (service) => {
    setCurrentService(service);
    setFormData({
      title: service.title,
      price: service.price,
      description: service.description,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentService) {
      // Update existing service
      await dispatch(updateService({ id: currentService.service_id, updatedData: formData })).unwrap();
    } else {
      // Create new service
      await dispatch(createService(formData)).unwrap();
    }

    // Refresh services
    dispatch(fetchServices());

    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await dispatch(deleteService(id)).unwrap();
      // Refresh services
      dispatch(fetchServices());
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add New Service
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Title</th>
              <th>Price ($)</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.service_id}>
                <td>{service.service_id}</td>
                <td>{service.title}</td>
                <td>{service.price !== null ? service.price.toFixed(2) : 'N/A'}</td>
                <td>{service.description}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(service)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(service.service_id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add/Edit Service Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentService ? 'Edit Service' : 'Add New Service'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="serviceTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="servicePrice" className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter service price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <Form.Text className="text-muted">
                Leave blank if not applicable.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="serviceDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter service description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {currentService ? 'Update Service' : 'Create Service'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ServicesManagement;
