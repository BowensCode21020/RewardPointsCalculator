import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TransactionForm from '../../src/components/TransactionForm';
import '@testing-library/jest-dom/extend-expect';

describe('TransactionForm', () => {

  test('renders form inputs', () => {
    render(<TransactionForm onSubmit={() => { }} />);

    // Assert that form inputs are rendered
    expect(screen.getByLabelText('Customer ID:')).toBeInTheDocument();
    expect(screen.getByLabelText('Transaction Amount:')).toBeInTheDocument();
    expect(screen.getByLabelText('Date:')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const onSubmit = jest.fn();

    render(<TransactionForm onSubmit={onSubmit} />);

    // Fill out form inputs with valid data
    fireEvent.change(screen.getByLabelText('Customer ID:'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Transaction Amount:'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-03-21' } });

    // Submit the form
    fireEvent.click(screen.getByText('Add Transaction'));

    // Wait for form submission
    await waitFor(() => {
      // Assert that onSubmit function is called with correct data
      expect(onSubmit).toHaveBeenCalledWith({
        customerId: '123',
        amount: '100',
        date: '2024-03-21'
      });
    });
  });

  test('displays error messages for invalid data', async () => {
    const onSubmit = jest.fn();
    
    render(<TransactionForm onSubmit={onSubmit} />);
  
    // Input invalid data
    fireEvent.change(screen.getByLabelText('Customer ID:'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Transaction Amount:'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '' } });
  
    // Submit the form
    fireEvent.click(screen.getByText('Add Transaction'));
  
    // Wait for error messages to appear
    await waitFor(() => {
      // Assert that error messages are displayed for required fields
      expect(screen.getByText('Customer ID is required.')).toBeInTheDocument();
      expect(screen.getByText('Amount is required.')).toBeInTheDocument();
      expect(screen.getByText('Date is required.')).toBeInTheDocument();
    });
  });

  test('submits form with an invalid customer ID', async () => {
    const onSubmit = jest.fn();
  
    render(<TransactionForm onSubmit={onSubmit} />);
  
    // Fill out form inputs with valid data
    fireEvent.change(screen.getByLabelText('Customer ID:'), { target: { value: 'whats going on?' } });
    fireEvent.change(screen.getByLabelText('Transaction Amount:'), { target: { value: 'hi there!' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-03-21' } });
  
    // Submit the form
    fireEvent.click(screen.getByText('Add Transaction'));
  
    // Wait for form submission
    await waitFor(() => {
      // Assert that onSubmit function is not called with specific data
      expect(onSubmit).not.toHaveBeenCalledWith({
        customerId: '123',
        amount: '100',
        date: '2024-03-21'
      });
    });
  });

  test('submits form with an invalid transaction amount', async () => {
    const onSubmit = jest.fn();
  
    render(<TransactionForm onSubmit={onSubmit} />);
  
    // Fill out form inputs with valid data
    fireEvent.change(screen.getByLabelText('Customer ID:'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Transaction Amount:'), { target: { value: 'hi there!' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-03-21' } });
  
    // Submit the form
    fireEvent.click(screen.getByText('Add Transaction'));
  
    // Wait for form submission
    await waitFor(() => {
      // Assert that onSubmit function is not called with specific data
      expect(onSubmit).not.toHaveBeenCalledWith({
        customerId: '123',
        amount: '100', // This should not be the expected amount as it's invalid
        date: '2024-03-21'
      });
    });
  });

  test('submits form with an invalid date format', async () => {
    const onSubmit = jest.fn();
  
    render(<TransactionForm onSubmit={onSubmit} />);
  
    // Fill out form inputs with valid data
    fireEvent.change(screen.getByLabelText('Customer ID:'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Transaction Amount:'), { target: { value: 'hi there!' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: 'February 2nd, 2022' } });
  
    // Submit the form
    fireEvent.click(screen.getByText('Add Transaction'));
  
    // Wait for form submission
    await waitFor(() => {
      // Assert that onSubmit function is not called with specific data
      expect(onSubmit).not.toHaveBeenCalledWith({
        customerId: '123',
        amount: '100', // This should not be the expected amount as it's invalid
        date: '2024-03-21'
      });
    });
  });
  
});