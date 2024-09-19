import React, { useEffect, useState } from 'react';

const PaymentUser = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch(`http://localhost:9952/birth/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPayments(data);
            } catch (error) {
                console.error('Error fetching payment history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Payment History</h2>
            {payments.length === 0 ? (
                <p>No payment history available.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.paymentId}>
                                <td>{payment.paymentId}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.transactionId}</td>
                                <td>{new Date(payment.date).toLocaleString()}</td>
                                <td>{payment.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentUser;
