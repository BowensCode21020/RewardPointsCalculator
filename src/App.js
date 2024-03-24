import { React, useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import RewardPointsDisplay from './components/RewardPointsDisplay';

const App = () => {

  const [transactionData, setTransactionData] = useState([]);

  const handleTransactionSubmit = (transaction) => {
    setTransactionData([...transactionData, transaction]);
  };

  // Function to fetch transaction data (e.g., from an API)
  const fetchTransactionData = () => {
    // Simulated asynchronous API call
    setTimeout(() => {
      // Sample transaction data (replace this with actual fetched data)
      const transactions = [
        { customerId: 1, amount: 120, date: '2024-03-21' },
        { customerId: 2, amount: 80, date: '2024-03-15' },
        // Add more transactions...
      ];
      setTransactionData(transactions);
    }, 1000); // Simulating a delay of 1 second
  };

  // Call the fetchTransactionData function when component mounts
  useEffect(() => {
    fetchTransactionData();
  }, []);

  return (
    <div className="App">
      <h1>Reward Points Calculator</h1>
      <TransactionForm onSubmit={handleTransactionSubmit} />
      <RewardPointsDisplay transactionData={transactionData} />
    </div>
  );
}

export default App;
