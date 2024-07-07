// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import OrderForm from '../OrderForm/OrderForm';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'orders'), where('status', '!=', 'Deleted'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, []);

  const handleOrderPlaced = () => {
    setShowForm(false);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>Panel de Administración</h1>
      <button onClick={() => setShowForm(!showForm)} className={styles.toggleFormButton}>
        {showForm ? 'Ocultar Formulario' : 'Realizar Pedido'}
      </button>
      {showForm && <OrderForm onOrderPlaced={handleOrderPlaced} />}
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
            <th>Acciones</th>
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
              <td>
                <button onClick={() => updateOrderStatus(order.id, 'Approved')}>Aprobar</button>
                <button onClick={() => updateOrderStatus(order.id, 'Rejected')}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
