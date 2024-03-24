import React, { useState } from 'react';

const TransactionForm = ({ onSubmit }) => {
  const [customerIdError, setCustomerIdError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const [formData, setFormData] = useState({
    customerId: '',
    amount: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Initialize error states
    let hasError = false;
    setCustomerIdError(false);
    setAmountError(false);
    setDateError(false);

    // Validate form inputs
    if (!formData.customerId) {
      setCustomerIdError(true);
      hasError = true;
    }
    if (!formData.amount) {
      setAmountError(true);
      hasError = true;
    }
    if (!formData.date) {
      setDateError(true);
      hasError = true;
    }

    // If there are errors, exit early
    if (hasError) {
      return;
    }

    // Call onSubmit prop with form data
    onSubmit(formData);

    // Reset form data
    setFormData({ customerId: '', amount: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='customerId'>
          Customer ID:
          <input
            id="customerId"
            type="text"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
            aria-describedby={customerIdError ? "customer-id-error" : null}
          />
        </label>
        {customerIdError && <div id="customer-id-error" className="error-message" data-testid="customer-id-error">Customer ID is required.</div>}
      </div>
      <div>
        <label htmlFor='amount'>
          Transaction Amount:
          <input
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            aria-describedby={amountError ? "amount-error" : null}
          />
        </label>
        {amountError && <div id="amount-error" className="error-message" data-testid="amount-error">Amount is required.</div>}
      </div>
      <div>
        <label htmlFor='date'>
          Date:
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            aria-describedby={dateError ? "date-error" : null}
          />
        </label>
        {dateError && <div id="date-error" className="error-message" data-testid="date-error">Date is required.</div>}
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
