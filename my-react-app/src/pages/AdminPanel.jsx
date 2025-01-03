// src/pages/AdminPanel.jsx

import React, { useEffect } from 'react';
import { Tabs, Tab, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/servicesSlice';
import { fetchAddons } from '../redux/addonsSlice';
import ServicesManagement from '../components/admin/ServicesManagement';
import AddonsManagement from '../components/admin/AddonsManagement';
import Orders from './Orders'; // Import the Orders component
import './AdminPanel.css'; // Optional: Custom styles

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { services, loading: servicesLoading, error: servicesError } = useSelector((state) => state.services);
  const { addonsByService, loading: addonsLoading, error: addonsError } = useSelector((state) => state.addons);

  useEffect(() => {
    // Fetch services when the admin panel loads
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    // Once services are fetched, fetch addons for each service
    services.forEach(service => {
      dispatch(fetchAddons(service.service_id));
    });
  }, [dispatch, services]);

  return (
    <Container className="admin-panel mt-5 pt-5">
      <h1 className="mb-4">Admin Panel</h1>

      {(servicesError || addonsError) && (
        <Alert variant="danger">
          {servicesError && <div>{servicesError}</div>}
          {addonsError && <div>{addonsError}</div>}
        </Alert>
      )}

      <Tabs defaultActiveKey="services" id="admin-tabs" className="mb-3">
        <Tab eventKey="services" title="Services">
          <ServicesManagement services={services} loading={servicesLoading} />
        </Tab>
        <Tab eventKey="addons" title="Service Add-Ons">
          <AddonsManagement services={services} addonsByService={addonsByService} loading={addonsLoading} />
        </Tab>
        <Tab eventKey="orders" title="Orders">
          {/* Display the Orders component here */}
          <Orders />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminPanel;
