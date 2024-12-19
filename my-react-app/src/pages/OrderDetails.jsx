// src/pages/OrderDetails.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderById, clearSelectedOrder } from '../redux/ordersSlice';
import './OrderDetails.css'; // Use OrderDetails.css now

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedOrder, loading, error } = useSelector((state) => state.orders);
  const { isAuthenticated, is_superadmin } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated && is_superadmin && orderId) {
      dispatch(fetchOrderById(orderId));
    }
    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [dispatch, isAuthenticated, is_superadmin, orderId]);

  const handleGoBack = () => {
    navigate('/orders');
  };

  if (!isAuthenticated) {
    return (
      <div className="orderdetails-page">
        <header className="orderdetails-page__header">
          <h1 className="orderdetails-page__title">Order Details</h1>
          <p className="orderdetails-page__subtitle">
            Please log in to view your order details.
          </p>
        </header>
      </div>
    );
  }

  if (!is_superadmin) {
    return (
      <div className="orderdetails-page">
        <header className="orderdetails-page__header">
          <h1 className="orderdetails-page__title">Access Denied</h1>
          <p className="orderdetails-page__subtitle">
            You do not have the necessary permissions to view this page.
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className="orderdetails-page">
      <header className="orderdetails-page__header">
        <h1 className="orderdetails-page__title">Order Details</h1>
      </header>

      <main className="orderdetails-page__main">
        <section className="orderdetails-page__section">
          {loading && <p>Loading order details...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {!loading && !error && selectedOrder && (
            <div className="orderdetails-card">
              <div className="orderdetails-card__content">
                <h3 className="orderdetails-card__title">
                  Order #{selectedOrder.order_id}
                </h3>
                <p className="orderdetails-card__price">
                  Status: {selectedOrder.order_status}
                </p>
                <p className="orderdetails-card__price">
                  Total: ${selectedOrder.total_amount}{' '}
                  {selectedOrder.currency ? selectedOrder.currency.toUpperCase() : 'N/A'}
                </p>
                <p className="orderdetails-card__price">
                  Payment Method: {selectedOrder.payment_method || 'N/A'}
                </p>
                <p className="orderdetails-card__price">
                  Payment Status: {selectedOrder.payment_status || 'N/A'}
                </p>
                <p className="orderdetails-card__price">
                  Payment Date: {new Date(selectedOrder.payment_date).toLocaleString()}
                </p>
                <ul className="orderdetails-card__features">
                  {selectedOrder.items.map((item) => (
                    <li key={item.order_item_id}>
                      {item.title} (x{item.quantity}) - ${item.price} each
                      <ul className="orderdetails-card__subfeatures">
                        {item.addons.map((addon) => (
                          <li key={addon.order_addon_id}>
                            {addon.name} - ${addon.price}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="orderdetails-card__button"
                onClick={handleGoBack}
                aria-label="Back to Orders"
              >
                Back to Orders
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default OrderDetails;
