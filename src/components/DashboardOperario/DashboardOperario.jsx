// src/components/DashboardOperario/DashboardOperario.jsx
import React, { useState } from 'react';
import OrderForm from '../OrderForm/OrderForm';
import OrderHistory from '../OrderHistory/OrderHistory';
import styles from './DashboardOperario.module.css';
import { useAuth } from '../contexts/AuthContext';

const DashboardOperario = () => {
  const [showForm, setShowForm] = useState(false);
  const { currentUser } = useAuth();

  return (
    <div className={styles.dashboardContainer}>
      <h1>Panel del Operario</h1>
      <button onClick={() => setShowForm(!showForm)} className={styles.toggleFormButton}>
        {showForm ? 'Ocultar Formulario' : 'Realizar Pedido'}
      </button>
      {showForm && <OrderForm onOrderPlaced={() => setShowForm(false)} />}
      <OrderHistory currentUser={currentUser} />
    </div>
  );
};

export default DashboardOperario;
