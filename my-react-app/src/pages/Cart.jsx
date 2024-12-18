// src/pages/Cart.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItemQuantity, removeCartItem, clearCart } from '../redux/cartSlice';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css'; // Custom CSS for cart page

const CartItemCard = ({ item, onUpdateQuantity, onRemove }) => {
  let { cart_item_id, title, quantity, price, addons } = item;

  // Ensure price is a valid number
  const itemPrice = isNaN(Number(price)) ? 0 : Number(price);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      onUpdateQuantity(cart_item_id, newQuantity);
    }
  };

  // Calculate line item total: item price * quantity + addons
  const addonsTotal = addons && addons.length > 0
    ? addons.reduce((sum, addon) => {
        const addonPrice = isNaN(Number(addon.price)) ? 0 : Number(addon.price);
        return sum + addonPrice;
      }, 0)
    : 0;

  const lineTotal = (itemPrice * quantity) + addonsTotal;

  return (
    <div className="cart-card">
      <div className="cart-card__content">
        <h3 className="cart-card__title">{title}</h3>
        <p className="cart-card__price">
          ${itemPrice.toFixed(2)} each<br />
          <strong>Total:</strong> ${lineTotal.toFixed(2)}
        </p>
        
        <div className="cart-card__quantity">
          <label htmlFor={`quantity-${cart_item_id}`} className="cart-card__quantity-label">
            Quantity:
          </label>
          <input
            id={`quantity-${cart_item_id}`}
            type="number"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
            className="cart-card__quantity-input"
          />
        </div>
        
        {addons && addons.length > 0 && (
          <div className="cart-card__addons">
            <h4 className="cart-card__addons-title">Add-Ons:</h4>
            <ul className="cart-card__addons-list">
              {addons.map((addon, idx) => {
                const addonPrice = isNaN(Number(addon.price)) ? 0 : Number(addon.price);
                return (
                  <li key={`addon-${idx}`} className="cart-card__addons-item">
                    {addon.name} - ${addonPrice.toFixed(2)}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="cart-card__actions">
        <button
          className="cart-card__button cart-card__button--remove"
          onClick={() => onRemove(cart_item_id)}
          aria-label={`Remove ${title}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (cart_item_id, quantity) => {
    dispatch(updateCartItemQuantity({ cart_item_id, quantity }))
      .unwrap()
      .then(() => dispatch(fetchCart()))
      .catch((err) => console.error('Error updating quantity:', err));
  };

  const handleRemoveItem = (cart_item_id) => {
    dispatch(removeCartItem(cart_item_id))
      .unwrap()
      .then(() => dispatch(fetchCart()))
      .catch((err) => console.error('Error removing item:', err));
  };

  const handleClearCart = () => {
    dispatch(clearCart())
      .unwrap()
      .catch((err) => console.error('Error clearing cart:', err));
  };

  const handleCheckout = () => {
    // Navigate to checkout page or implement checkout logic here
    navigate('/checkout');
  };

  if (loading) {
    return <div className="cart-page"><p>Loading your cart...</p></div>;
  }

  if (error) {
    return <div className="cart-page"><p>Error: {error}</p></div>;
  }

  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => {
    const itemPrice = isNaN(Number(item.price)) ? 0 : Number(item.price);
    const addonsTotal = item.addons ? item.addons.reduce((a, addon) => {
      const addonPrice = isNaN(Number(addon.price)) ? 0 : Number(addon.price);
      return a + addonPrice;
    }, 0) : 0;
    return acc + (itemPrice * item.quantity) + addonsTotal;
  }, 0);

  // Apply Florida sales tax (6%)
  const floridaSalesTaxRate = 0.06; // 6%
  const salesTax = subtotal * floridaSalesTaxRate;

  const total = subtotal + salesTax;

  return (
    <div className="cart-page">
      <header className="cart-page__header">
        <h1 className="cart-page__title">Your Cart</h1>
        {items.length > 0 ? (
          <p className="cart-page__subtitle">
            Review your items and proceed to checkout.
          </p>
        ) : (
          <p className="cart-page__subtitle">
            Your cart is empty. <Link to="/services" className="cart-page__link">Browse services</Link> to add items.
          </p>
        )}
      </header>

      <main className="cart-page__main">
        {items.length > 0 && (
          <>
            <section className="cart-page__section">
              <h2 className="cart-page__section-title">Cart Items</h2>
              <div className="cart-page__items">
                {items.map((item, idx) => (
                  <CartItemCard
                    key={`cart-item-${idx}`}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </section>

            <section className="cart-page__section">
              <h2 className="cart-page__section-title">Cart Summary</h2>
              <p className="cart-page__summary-total">
                <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
              </p>
              <p className="cart-page__summary-total">
                <strong>Sales Tax (6%):</strong> ${salesTax.toFixed(2)}
              </p>
              <p className="cart-page__summary-total">
                <strong>Total:</strong> ${total.toFixed(2)}
              </p>
              <div className="cart-page__actions">
                <button
                  className="cart-page__button cart-page__button--clear"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="cart-page__button cart-page__button--checkout"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Cart;
