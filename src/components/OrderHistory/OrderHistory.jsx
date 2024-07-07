// src/components/OrderHistory/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import styles from './OrderHistory.module.css';

const OrderHistory = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'orders'),
      where('fullName', '==', currentUser.displayName),
      where('status', '!=', 'Deleted')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className={styles.orderHistoryContainer}>
      <h2>Historial de Pedidos</h2>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>Localidad</th>
            <th>Objetivo</th>
            <th>Nombre y Apellido</th>
            <th>Fecha del Pedido</th>
            <th>Pedido</th>
            <th>Nota</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.locality}</td>
              <td>{order.target}</td>
              <td>{order.fullName}</td>
              <td>{order.orderDate}</td>
              <td>{order.orderDetails}</td>
              <td>{order.note}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
