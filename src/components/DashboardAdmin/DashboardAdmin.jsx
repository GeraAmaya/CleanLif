import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './DashboardAdmin.module.css';

const DashboardAdmin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };

    fetchOrders();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: 'Approved' });
      setOrders(orders.map(order => order.id === id ? { ...order, status: 'Approved' } : order));
    } catch (error) {
      console.error('Error approving order: ', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: 'Rejected' });
      setOrders(orders.map(order => order.id === id ? { ...order, status: 'Rejected' } : order));
    } catch (error) {
      console.error('Error rejecting order: ', error);
    }
  };

  return (
    <div className="dashboard-admin">
      <h2>Dashboard del Administrador</h2>
      <table>
        <thead>
          <tr>
            <th>Localidad</th>
            <th>Objetivo</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha</th>
            <th>Insumos</th>
            <th>Nota</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.locality}</td>
              <td>{order.objective}</td>
              <td>{order.name}</td>
              <td>{order.surname}</td>
              <td>{order.date}</td>
              <td>{order.items}</td>
              <td>{order.note}</td>
              <td>{order.status || 'Pendiente'}</td>
              <td>
                <button onClick={() => handleApprove(order.id)}>Aprobar</button>
                <button onClick={() => handleReject(order.id)}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardAdmin;
