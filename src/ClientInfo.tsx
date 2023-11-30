import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { findClientById } from './storage/Client';
import './styles/info.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEdit } from '@fortawesome/free-solid-svg-icons';


interface ClientInfoProps {
}

const ClientInfo: React.FC<ClientInfoProps> = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState({ id: 0, name: '', phone: '', email: '' });

  useEffect(() => {
    // Завантажте інформацію про клієнта при завантаженні компонента
    if (clientId) {
      const parsedClientId = parseInt(clientId, 10);
      const foundClient = findClientById(parsedClientId);

      if (foundClient) {
        setClient(foundClient);
      }
    }
  }, [clientId]);

  return (
    <div id="info-cont">
      <div id="header-info">
      <Link to={`/clients`} id="back-link">
        <button id='nav-button'>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </Link>
      <h2>Інформація про клієнта</h2>
      <Link to={`/ClientEdit/${client.id}`}>
         <button id='nav-button'>
            <FontAwesomeIcon icon={faEdit} />
          </button>
      </Link>
      </div>
      <p>Ім'я: {client.name}</p>
      <p>Телефон: {client.phone}</p>
      <p>Email: {client.email}</p>
      
    </div>
  );
};

export default ClientInfo;
