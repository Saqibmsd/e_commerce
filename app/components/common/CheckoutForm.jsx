import React, { useState } from 'react';

const CheckoutForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        paymentMethod: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
            <select name="paymentMethod" onChange={handleChange} required>
                <option value="">Select Payment Method</option>
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
            </select>
            <button type="submit">Confirm Order</button>
        </form>
    );
};

export default CheckoutForm;