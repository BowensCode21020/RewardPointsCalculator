import React from 'react';

export const calculateRewardPoints = (transactionAmount) => {
    const pointsOver100 = Math.max(0, transactionAmount - 100) * 2;
    const pointsBetween50And100 = Math.max(0, Math.min(transactionAmount, 100) - 50);
    return pointsOver100 + pointsBetween50And100;
};

 // Calculate total reward points per customer per month
 export const calculateTotalRewardPoints = (transactions, customerId, year, month) => {
    return transactions.reduce((totalPoints, transaction) => {
        if (transaction.date && transaction.date.length >= 7) {
            const transactionYear = parseInt(transaction.date.substring(0, 4)); // Extract year from date string
            const transactionMonth = parseInt(transaction.date.substring(5, 7)); // Extract month from date string
            if (
                transaction.customerId === customerId &&
                parseInt(transactionYear) === year &&
                parseInt(transactionMonth) === month + 1 // Month is 0-indexed, so adding 1
            ) {
                return totalPoints + calculateRewardPoints(transaction.amount);
            }
        }
        return totalPoints;
    }, 0);
};

const RewardPointsDisplay = ({ transactionData }) => {

    // Display total reward points for each customer per month
    const displayRewardPoints = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth(); // Current month

        // Assuming transactionData is an array of transaction objects
        // Each transaction object should have properties like customerId, amount, and date

        // Iterate over unique customer IDs
        const uniqueCustomerIds = [...new Set(transactionData.map((transaction) => transaction.customerId))];
        return uniqueCustomerIds.map((customerId) => {
            const totalPoints = calculateTotalRewardPoints(transactionData, customerId, year, month);
            return (
                <div key={customerId}>
                    <h3>Customer ID: {customerId}</h3>
                    <p>Total Reward Points: {totalPoints}</p>
                </div>
            );
        });
    };

    return (
        <div>
            <h2>Reward Points</h2>
            {displayRewardPoints()}
        </div>
    );
};

export default RewardPointsDisplay;
