import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/list.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { readClients, deleteClient } from './storage/Client';
import { readLessons } from './storage/Lesson';

const ClientList: React.FC = () => {

  const initialClients = readClients();
  const [clients, setClients] = useState(initialClients);

  const handleDeleteClient = (clientId: number) => {
    deleteClient(clientId);
  
    const updatedClients = readClients();
    setClients(updatedClients);
  };

  const getTotalDebt = (clientId: number): number => {
    const lessons = readLessons();
    const clientLessons = lessons.filter((lesson) => lesson.clientId === clientId && !lesson.paid);
    return clientLessons.reduce((total, lesson) => total + lesson.price, 0);
  };

  return (
    <div id="main-cont">
      <div id='header-list'>
        <Link to="/Calendar" id="nav-link"><button id="nav-button"><FontAwesomeIcon icon={faChevronLeft} /></button></Link>
        <p>Список</p>
        <Link to="/ClientsForm" id="nav-link"><button id="nav-button"><FontAwesomeIcon icon={faAdd} /></button></Link>
      </div>
      <div id='list-container'>
        <ul>
          {clients.map((client) => (
            <Link to={`/ClientInfo/${client.id}`} id="nav-link" key={client.id}>
              <li className="client-item">
                <div id="client-item-desc">
                {client.name} 
                <p id="debt"> - {getTotalDebt(client.id)} грн</p></div>
                <button id="trash-button" onClick={() => handleDeleteClient(client.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientList;
