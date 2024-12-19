// src/pages/Orders.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/ordersSlice';
import { useNavigate } from 'react-router-dom';
import './Orders.css'; // Use Orders.css now

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.orders);
  const { isAuthenticated, is_superadmin } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated && is_superadmin) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isAuthenticated, is_superadmin]);

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="orders-page">
        <header className="orders-page__header">
          <h1 className="orders-page__title">Your Orders</h1>
          <p className="orders-page__subtitle">Please log in to view your orders.</p>
        </header>
      </div>
    );
  }

  if (!is_superadmin) {
    return (
      <div className="orders-page">
        <header className="orders-page__header">
          <h1 className="orders-page__title">Access Denied</h1>
          <p className="orders-page__subtitle">
            You do not have the necessary permissions to view this page.
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <header className="orders-page__header">
        <h1 className="orders-page__title">Your Orders</h1>
        <p className="orders-page__subtitle">
          Review your past orders and their details.
        </p>
      </header>

      <main className="orders-page__main">
        <section className="orders-page__section">
          <div className="orders-page__packages">
            {loading && <p>Loading your orders...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && orders.length === 0 && <p>You have no orders yet.</p>}
            {!loading &&
              orders.map((order) => (
                <div key={order.order_id} className="order-card">
                  <div className="order-card__content">
                    <h3 className="order-card__title">Order #{order.order_id}</h3>
                    <p className="order-card__price">Status: {order.order_status}</p>
                    <p className="order-card__price">
                      Total: ${order.total_amount} {order.currency.toUpperCase()}
                    </p>
                    <p className="order-card__price">
                      Payment Method: {order.payment_method || 'N/A'}
                    </p>
                    <p className="order-card__price">
                      Payment Status: {order.payment_status || 'N/A'}
                    </p>
                    <p className="order-card__price">
                      Payment Date: {new Date(order.payment_date).toLocaleString()}
                    </p>
                    <ul className="order-card__features">
                      {order.items.map((item) => (
                        <li key={item.order_item_id}>
                          {item.title} (x{item.quantity}) - ${item.price} each
                          <ul className="order-card__subfeatures">
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
                    className="order-card__button"
                    onClick={() => handleViewOrder(order.order_id)}
                    aria-label={`View details for order ${order.order_id}`}
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Orders;
