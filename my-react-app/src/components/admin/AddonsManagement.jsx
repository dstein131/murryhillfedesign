// src/components/admin/AddonsManagement.jsx

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert, Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAddon, updateAddon, deleteAddon, fetchAddons } from '../../redux/addonsSlice';

const AddonsManagement = ({ services, addonsByService, loading }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.addons);

  const [showModal, setShowModal] = useState(false);
  const [currentAddon, setCurrentAddon] = useState(null); // For editing
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleClose = () => {
    setShowModal(false);
    setCurrentAddon(null);
    setFormData({ name: '', price: '', description: '' });
    setSelectedServiceId('');
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (serviceId, addon) => {
    setCurrentAddon(addon);
    setSelectedServiceId(serviceId);
    setFormData({
      name: addon.name,
      price: addon.price,
      description: addon.description,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedServiceId) {
      alert('Please select a service.');
      return;
    }

    // Validate and convert price to a number
    const validatedFormData = {
      ...formData,
      price: formData.price ? Number(formData.price) : null,
    };

    if (isNaN(validatedFormData.price) && validatedFormData.price !== null) {
      alert('Please enter a valid number for the price.');
      return;
    }

    try {
      if (currentAddon) {
        // Update existing add-on
        await dispatch(updateAddon({
          serviceId: selectedServiceId,
          addonId: currentAddon.addon_id,
          updatedData: validatedFormData,
        })).unwrap();
      } else {
        // Create new add-on
        await dispatch(createAddon({
          serviceId: selectedServiceId,
          addonData: validatedFormData,
        })).unwrap();
      }

      // Refresh add-ons for the selected service
      dispatch(fetchAddons(selectedServiceId));

      handleClose();
    } catch (err) {
      console.error('Error submitting the form:', err);
      // Optionally, handle submission errors here
    }
  };

  const handleDelete = async (serviceId, addonId) => {
    if (window.confirm('Are you sure you want to delete this add-on?')) {
      try {
        await dispatch(deleteAddon({ serviceId, addonId })).unwrap();
        // Refresh add-ons for the service
        dispatch(fetchAddons(serviceId));
      } catch (err) {
        console.error('Error deleting the add-on:', err);
        // Optionally, handle deletion errors here
      }
    }
  };

  /**
   * Helper function to format the price.
   * Ensures that the price is a number before calling toFixed.
   * Returns 'N/A' if price is not a valid number.
   */
  const formatPrice = (price) => {
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) return 'N/A';
    return numericPrice.toFixed(2);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add New Add-On
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Accordion defaultActiveKey="0">
          {services.map(service => (
            <Accordion.Item eventKey={service.service_id.toString()} key={service.service_id}>
              <Accordion.Header>{service.title}</Accordion.Header>
              <Accordion.Body>
                {addonsByService[service.service_id]?.length > 0 ? (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Add-On ID</th>
                        <th>Name</th>
                        <th>Price ($)</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addonsByService[service.service_id].map(addon => (
                        <tr key={addon.addon_id}>
                          <td>{addon.addon_id}</td>
                          <td>{addon.name}</td>
                          <td>{addon.price != null ? formatPrice(addon.price) : 'N/A'}</td>
                          <td>{addon.description}</td>
                          <td>
                            <Button variant="warning" size="sm" onClick={() => handleEdit(service.service_id, addon)} className="me-2">
                              Edit
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(service.service_id, addon.addon_id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>No add-ons found for this service.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}

      {/* Add/Edit Add-On Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentAddon ? 'Edit Add-On' : 'Add New Add-On'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {!currentAddon && (
              <Form.Group controlId="selectService" className="mb-3">
                <Form.Label>Select Service</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  required
                >
                  <option value="">-- Select Service --</option>
                  {services.map(service => (
                    <option key={service.service_id} value={service.service_id}>
                      {service.title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            {currentAddon && (
              <Form.Group controlId="serviceName" className="mb-3">
                <Form.Label>Service</Form.Label>
                <Form.Control
                  type="text"
                  value={services.find(s => s.service_id === selectedServiceId)?.title || ''}
                  readOnly
                />
              </Form.Group>
            )}

            <Form.Group controlId="addonName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter add-on name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="addonPrice" className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter add-on price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <Form.Text className="text-muted">
                Leave blank if not applicable.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="addonDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter add-on description"
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
              {currentAddon ? 'Update Add-On' : 'Create Add-On'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AddonsManagement;
