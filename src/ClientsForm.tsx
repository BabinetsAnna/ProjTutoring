import React from 'react';
import './styles/form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { addClient } from './storage/Client';

const ClientsForm: React.FC = () => {
  const saveClientData = () => {
  
    const clientName = document.getElementById('client-name') as HTMLInputElement;
    const clientPhone = document.getElementById('client-phone') as HTMLInputElement;
    const clientEmail = document.getElementById('client-email') as HTMLInputElement;


    const newClient = {
      name: clientName.value,
      phone: clientPhone.value,
      email: clientEmail.value,
    };

   
    addClient(newClient);

    console.log('Client data saved!');
    alert('Клієнта додано!');
  };

  return (
    <div>
      <div id='header-form'>
        <Link to="/clients" id="nav-link">
          <button id="nav-button"><FontAwesomeIcon icon={faChevronLeft} /></button>
        </Link>
        <p>Додати клієнта</p>
      </div>
      <form id="client-form">
        <label htmlFor="client-name">Ім'я:</label>
        <input type="text" id="client-name" name="client-name" required />

        <label htmlFor="client-phone">Номер телефону:</label>
        <input type="tel" id="client-phone" name="client-phone" required />

        <label htmlFor="client-email">Електронна пошта (необов'язково):</label>
        <input type="email" id="client-email" name="client-email" required />

        <button type="button" onClick={saveClientData}>
          Зберегти
        </button>
      </form>
    </div>
  );
};

export default ClientsForm;
