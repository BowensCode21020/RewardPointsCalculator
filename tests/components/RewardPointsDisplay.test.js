import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import custom matcher
import RewardPointsDisplay from '../../src/components/RewardPointsDisplay';
import { calculateRewardPoints, calculateTotalRewardPoints } from '../../src/components/RewardPointsDisplay'; // having issues with importing the const within the component
// this is why you will see const exported directly from the component.

describe('RewardPointsDisplay', () => {
  // Mock transaction data
  const mockTransactionData = [
    { customerId: '1', amount: 50, date: '2022-01-15' },
    { customerId: '1', amount: 150, date: '2022-01-20' },
    { customerId: '2', amount: 200, date: '2022-01-25' },
  ];

  test('renders without crashing', () => {
    render(<RewardPointsDisplay transactionData={[]} />);
  });

  test('displays correct total reward points', async () => {
    const transactionData = [
      { customerId: '1', amount: 100, date: '2024-03-01' },
      { customerId: '1', amount: 50, date: '2024-03-15' },
      { customerId: '2', amount: 200, date: '2024-03-05' },
    ];
  
    render(<RewardPointsDisplay transactionData={transactionData} />);
  
    await waitFor(() => {
      // Assert that the correct total reward points are displayed for each customer
      expect(screen.getByText('Customer ID: 1')).toBeInTheDocument();
      expect(screen.getByText('Total Reward Points: 50')).toBeInTheDocument(); // Adjust this text based on your actual calculation
      expect(screen.getByText('Customer ID: 2')).toBeInTheDocument();
      expect(screen.getByText('Total Reward Points: 250')).toBeInTheDocument(); // Adjust this text based on your actual calculation
    });
  });
  

  test('calculates reward points correctly for a single transaction', () => {
    const rewardPoints = calculateRewardPoints(150);
    expect(rewardPoints).toBe(150); // 50 + 100
  });

  test('calculates total reward points correctly for a customer in a specific month', () => {
    const totalPoints = calculateTotalRewardPoints(
      mockTransactionData,
      '1',
      2022,
      0 // January (0-indexed)
    );
    expect(totalPoints).toBe(150); // Customer 1 total reward points in January
  });

  // Additional tests for edge cases and other scenarios...
});
