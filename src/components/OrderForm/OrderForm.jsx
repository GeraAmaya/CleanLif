// src/components/OrderForm/OrderForm.jsx
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import styles from './OrderForm.module.css';

const OrderForm = ({ onOrderPlaced }) => {
  const [locality, setLocality] = useState('');
  const [target, setTarget] = useState('');
  const [fullName, setFullName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderDetails, setOrderDetails] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'orders'), {
        locality,
        target,
        fullName,
        orderDate,
        orderDetails,
        note,
        status: 'Pending',
        createdAt: new Date(),
      });
      onOrderPlaced();
    } catch (err) {
      console.error('Error placing order: ', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.orderForm}>
      <h2>Realizar Pedido de Insumos</h2>
      <label>
        Localidad:
        <input type="text" value={locality} onChange={(e) => setLocality(e.target.value)} required />
      </label>
      <label>
        Objetivo:
        <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} required />
      </label>
      <label>
        Nombre y Apellido:
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </label>
      <label>
        Fecha del Pedido:
        <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
      </label>
      <label>
        Pedido:
        <textarea value={orderDetails} onChange={(e) => setOrderDetails(e.target.value)} required />
      </label>
      <label>
        Nota:
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      <button type="submit">Enviar Pedido</button>
    </form>
  );
};

export default OrderForm;
