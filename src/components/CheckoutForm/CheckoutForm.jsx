import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { US_STATES } from "../../data/usStates";
import { useCart } from "../../context/CartContext";
import "./CheckoutForm.css";

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Basic validators
  const validators = {
    fullName: (v) => v.trim().length > 1 || "Full name is required",
    email: (v) =>
      /\S+@\S+\.\S+/.test(v) || "Please enter a valid email address",
    address: (v) => v.trim().length > 4 || "Address is required",
    city: (v) => v.trim().length > 1 || "City is required",
    state: (v) => v.trim().length > 1 || "State is required",
    zip: (v) => /^\d{4,10}$/.test(v) || "ZIP/postal code must be numeric",
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(validators).forEach((key) => {
      const res = validators[key](form[key]);
      if (res !== true) newErrors[key] = res;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    // clear error for that field
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setErrors({ form: "Your cart is empty. Add items before checkout." });
      return;
    }

    if (!validateAll()) return;

    setSubmitting(true);

    // MOCK order processing (simulate)
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`;
      const order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customer: { ...form },
        items: cart,
        total: cart.reduce((s, it) => s + it.price * it.quantity, 0),
      };

      // Clear cart and navigate to thank-you with order data
      clearCart();
      setSubmitting(false);
      navigate("/thank-you", { state: { order } });
    }, 900); // small simulated delay
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      {errors.form && <div className="form-error">{errors.form}</div>}

      <label>
        Full name
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <div className="field-error">{errors.fullName}</div>
        )}
      </label>

      <label>
        Email
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          aria-invalid={!!errors.email}
        />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </label>

      <label>
        Address
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          aria-invalid={!!errors.address}
        />
        {errors.address && <div className="field-error">{errors.address}</div>}
      </label>

      <div className="two-col">
        <label>
          City
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <div className="field-error">{errors.city}</div>}
        </label>

        <label>
          State
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {US_STATES.map(({ name, abbreviation }) => (
              <option key={abbreviation} value={abbreviation}>
                {name}
              </option>
            ))}
          </select>
          {errors.state && <div className="field-error">{errors.state}</div>}
        </label>
      </div>

      <label>
        ZIP / Postal code
        <input
          name="zip"
          value={form.zip}
          onChange={handleChange}
        />
        {errors.zip && <div className="field-error">{errors.zip}</div>}
      </label>

      <button className="place-order" type="submit" disabled={submitting}>
        {submitting ? "Placing order..." : "Place Order"}
      </button>
    </form>
  );
};

export default CheckoutForm;
