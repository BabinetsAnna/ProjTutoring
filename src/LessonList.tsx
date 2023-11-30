// LessonList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/list.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteLesson, readLessonsWithDate, toggleLessonPaidStatus } from './storage/Lesson';
import { findClientById } from './storage/Client';

interface Lesson {
  id: number;
  clientId: number;
  date: string;
  time: string;
  price: number;
  paid: boolean;
  topic: string;
}

const LessonList: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { selectedDate } = useParams<{ selectedDate: string }>();

  useEffect(() => {
    // Отримати уроки з локального сховища при завантаженні компонента
    if(selectedDate){
    const lessonData = readLessonsWithDate(selectedDate);
    setLessons(lessonData);
    }
  }, [selectedDate]);

  const handleDeleteLesson = (lessonId: number) => {
    deleteLesson(lessonId);
    // Оновити список уроків після видалення
    if(selectedDate){
    const updatedLessons = readLessonsWithDate(selectedDate);
    setLessons(updatedLessons);
    }
  };

  const handleTogglePaidStatus = (lessonId: number) => {
    toggleLessonPaidStatus(lessonId);
    // Оновити список уроків після зміни статусу оплати
    if(selectedDate){
    const updatedLessons = readLessonsWithDate(selectedDate);
    setLessons(updatedLessons);
    }
  };

  const findClientName = (clientId: number) => {
    const client = findClientById(clientId);
    return client ? client.name : 'Невідомий клієнт';
  };

  return (
    <div id="main-cont">
      <div id='header-list'>
        <Link to="/Calendar" id="nav-link">
          <button id="nav-button">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </Link>
        <p>Уроки : {selectedDate}</p>
        <Link to={`/LessonsForm/${selectedDate}`} id="nav-link">
          <button id="nav-button">
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </Link>
      </div>

      <div id='list-container'>
        <ul>

          {lessons.map((lesson) => (
            // Додана перевірка на дату
            lesson.date === selectedDate && (
              <Link to={`/LessonInfo/${lesson.id}`}  id="nav-link">
              <li key={lesson.id} className="list-item">
                
                <div id="list-item-left">
                <p>{findClientName(lesson.clientId)}</p> 
                </div>
                <div id="list-item-right">
                <p> {lesson.time}</p>
                <input
                  type="checkbox"
                  checked={lesson.paid}
                  onChange={() => handleTogglePaidStatus(lesson.id)}
                />
                
                <button id="trash-button" onClick={() => handleDeleteLesson(lesson.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                </div>
              </li>
              </Link>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonList;
