import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { readClients } from './storage/Client';
import {addLesson } from './storage/Lesson';

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const AddLessonForm: React.FC = () => {
  const { selectedDate } = useParams<{ selectedDate: string }>();
  const [clients, setClients] = useState<Client[]>([]);
  

  useEffect(() => {
    const clientData = readClients();
    setClients(clientData);
  }, []);

  useEffect(() => {

    if (selectedDate) {
      try {
        const lessonDateInput = document.getElementById(
          'lesson-date'
        ) as HTMLInputElement;
        lessonDateInput.value = selectedDate;
      } catch (error) {
        console.error('Error setting date:', error);
      }
    }
  }, []);


  const saveLessonData = () => {
    const clientSelect = document.getElementById('client-select') as HTMLSelectElement;
    const selectedClientId = parseInt(clientSelect.value, 10);

    const newLesson  = {
      clientId: selectedClientId,
      date: (document.getElementById('lesson-date') as HTMLInputElement).value,
      time: (document.getElementById('lesson-time') as HTMLInputElement).value,
      price: parseInt((document.getElementById('lesson-price') as HTMLInputElement).value, 10),
      paid: (document.getElementById('lesson-paid') as HTMLInputElement).checked,
      topic: (document.getElementById('lesson-topic') as HTMLInputElement).value,
    };

    // Збережіть урок
    addLesson(newLesson);
    
    console.log('Lesson data saved!');

    alert('Урок додано!');
  }


  return (
    <div>
      <div id='header-form'>
        <Link to={`/LessonList/${selectedDate}`} id="nav-link">
          <button id="nav-button">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </Link>
        <p>Додати урок</p>
      </div>
      <form id="lesson-form">
        <div id="one-row-cont">
          <label htmlFor="client-select">Обрати клієнта:</label>
          <select id="client-select" name="client-select" required>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        {/* Решта вашого коду залиште без змін */}
        <label htmlFor="lesson-date">Дата уроку:</label>
        <input type="date" id="lesson-date" name="lesson-date" required />

        <label htmlFor="lesson-time">Час уроку:</label>
        <input type="time" id="lesson-time" name="lesson-time" required />

        <label htmlFor="lesson-price">Ціна:</label>
        <input type="number" id="lesson-price" name="lesson-price" required />
        <div id="one-row-cont">
          <label htmlFor="lesson-paid">Оплачено:</label>
          <input
            type="checkbox"
            id="lesson-paid"
            name="lesson-paid"
            className="custom-chkbx"
          />
        </div>
        <label htmlFor="lesson-topic">Тема уроку (необов'язково):</label>
        <input type="text" id="lesson-topic" name="lesson-topic" />

        <button type="button" onClick={saveLessonData}>
          Зберегти
        </button>
      </form>
    </div>
  );
};

export default AddLessonForm;
