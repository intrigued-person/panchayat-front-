// import React, { useState } from 'react';
// import axios from 'axios';
// import './Payment.module.css'
// import { useNavigate } from 'react-router-dom';

// // Function to generate a random transaction ID
// const generateTransactionId = () => {
//     const randomNumber = Math.floor(Math.random() * 10000);
//     return `txn${randomNumber.toString().padStart(4, '0')}`; // Format to 4 digits
// };



// const PaymentForm = () => {
//     const [amount, setAmount] = useState('');
//     const [reason, setReason] = useState('');
//     const [paymentMethod, setPaymentMethod] = useState('credit_card');
//     const [transactionId, setTransactionId] = useState('');
//     const [date, setDate] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Generate transactionId and date
//         const generatedTransactionId = generateTransactionId();
//         const currentDate = new Date().toISOString();

//         setTransactionId(generatedTransactionId);
//         setDate(currentDate);

//         const paymentData = {
//             amount: parseFloat(amount),
//             reason,
//             paymentMethod,
//             transactionId: generatedTransactionId,
//             date: currentDate
//         };

//         try {
//             const response = await axios.post('http://localhost:9952/payment', paymentData);
//             console.log('Payment successful:', response.data);
//             sessionStorage.setItem('paymentId', response.data.paymentId);
//             // navigate("/birth");

//             // Clear form or handle successful submission
//         } catch (error) {
//             console.error('Payment error:', error);
//             // Handle error
//         }
//     };
//     const navigate = useNavigate();

//     const renderPaymentFields = () => {
//         switch (paymentMethod) {
//             case 'credit_card':
//                 return (
//                     <div>
//                         <label htmlFor="cardNumber">Card Number:</label>
//                         <input
//                             type="text"
//                             id="cardNumber"
//                             placeholder="Enter your card number"
//                             required
//                         />
//                         <label htmlFor="expiryDate">Expiry Date:</label>
//                         <input
//                             type="text"
//                             id="expiryDate"
//                             placeholder="MM/YY"
//                             required
//                         />
//                         <label htmlFor="cvv">CVV:</label>
//                         <input
//                             type="text"
//                             id="cvv"
//                             placeholder="CVV"
//                             required
//                         />
//                     </div>
//                 );
//             case 'upi':
//                 return (
//                     <div>
//                         <label htmlFor="upiId">UPI ID:</label>
//                         <input
//                             type="text"
//                             id="upiId"
//                             placeholder="Enter your UPI ID"
//                             required
//                         />
//                     </div>
//                 );
//             case 'net_banking':
//                 return (
//                     <div>
//                         <label htmlFor="bankName">Bank Name:</label>
//                         <input
//                             type="text"
//                             id="bankName"
//                             placeholder="Enter your bank name"
//                             required
//                         />
//                         <label htmlFor="accountNumber">Account Number:</label>
//                         <input
//                             type="text"
//                             id="accountNumber"
//                             placeholder="Enter your account number"
//                             required
//                         />
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div>
//             <h2>Payment Form</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="amount">Amount:</label>
//                     <input
//                         type="number"
//                         id="amount"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="reason">Reason:</label>
//                     <input
//                         type="text"
//                         id="reason"
//                         value={reason}
//                         onChange={(e) => setReason(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <h3>Payment Method:</h3>
//                     <div>
//                         <input
//                             type="radio"
//                             id="credit_card"
//                             name="paymentMethod"
//                             value="credit_card"
//                             checked={paymentMethod === 'credit_card'}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                         />
//                         <label htmlFor="credit_card">Credit/Debit Card</label>
//                     </div>
//                     <div>
//                         <input
//                             type="radio"
//                             id="net_banking"
//                             name="paymentMethod"
//                             value="net_banking"
//                             checked={paymentMethod === 'net_banking'}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                         />
//                         <label htmlFor="net_banking">Net Banking</label>
//                     </div>
//                     <div>
//                         <input
//                             type="radio"
//                             id="upi"
//                             name="paymentMethod"
//                             value="upi"
//                             checked={paymentMethod === 'upi'}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                         />
//                         <label htmlFor="upi">UPI</label>
//                     </div>
//                 </div>
//                 {renderPaymentFields()}
//                 <button type="submit">Submit Payment</button>
//             </form>
//         </div>
//     );
// };

// export default PaymentForm;
