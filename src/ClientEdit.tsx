import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles/form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { findClientById, editClient } from './storage/Client';

const EditClientForm: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();

  const [client, setClient] = useState({ id: 0, name: '', phone: '', email: '' });

  useEffect(() => {
    if (clientId) {
      const parsedClientId = parseInt(clientId, 10);
      const foundClient = findClientById(parsedClientId);

      if (foundClient) {
        setClient(foundClient);
      }
    }
  }, [clientId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const updateClientData = () => {
    
    if (clientId) {
      const parsedClientId = parseInt(clientId, 10);
      editClient(parsedClientId, client);
      alert('Дані клієнта змінено!');
    }
  };

  return (
    <div>
      <div id='header-form'>
        <Link to={`/ClientInfo/${client.id}`} id='nav-link'>
          <button id='nav-button'>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </Link>
        <p>Редагувати клієнта</p>
      </div>
      <form id='client-form'>
        <label htmlFor='client-name'>Ім'я:</label>
        <input
          type='text'
          id='client-name'
          name='name'
          value={client.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor='client-phone'>Номер телефону:</label>
        <input
          type='tel'
          id='client-phone'
          name='phone'
          value={client.phone}
          onChange={handleInputChange}
          required
        />

        <label htmlFor='client-email'>Електронна пошта (необов'язково):</label>
        <input
          type='email'
          id='client-email'
          name='email'
          value={client.email}
          onChange={handleInputChange}
          required
        />

        <button type='button' onClick={updateClientData}>
          Зберегти
        </button>
      </form>
    </div>
  );
};

export default EditClientForm;
