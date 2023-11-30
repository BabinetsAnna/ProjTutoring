import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles/form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { readLessons, updateLesson } from './storage/Lesson';

interface Lesson {
  id: number;
  clientId: number;
  date: string;
  time: string;
  price: number;
  paid: boolean;
  topic: string;
}

const LessonEditForm: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (lessonId) {
      const parsedLessonId = parseInt(lessonId, 10);
      const lessons = readLessons();
      const foundLesson = lessons.find((l) => l.id === parsedLessonId);

      if (foundLesson) {
        setLesson(foundLesson);
      }
    }
  }, [lessonId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
  
    setLesson((prevLesson) => ({
      ...prevLesson,
      [name]: inputValue === '' ? undefined : inputValue,
    }) as Lesson | null);
  };
  
  const updateLessonData = () => {
    if (lesson) {
      updateLesson(lesson);
      alert('Дані уроку змінено!');
    }
  };

  return (
    <div>
      <div id='header-form'>
        <Link to={`/LessonInfo/${lesson?.id}`} id='nav-link'>
          <button id='nav-button'>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </Link>
        <p>Редагувати урок</p>
      </div>
      <form id='lesson-form'>
        <label htmlFor='lesson-date'>Дата уроку:</label>
        <input
          type='date'
          id='lesson-date'
          name='date'
          value={lesson?.date || ''}
          onChange={handleInputChange}
          required
        />

        <label htmlFor='lesson-time'>Час уроку:</label>
        <input
          type='time'
          id='lesson-time'
          name='time'
          value={lesson?.time || ''}
          onChange={handleInputChange}
          required
        />

        <label htmlFor='lesson-price'>Ціна:</label>
        <input
          type='number'
          id='lesson-price'
          name='price'
          value={lesson?.price || 0}
          onChange={handleInputChange}
          required
        />

        <div id='one-row-cont'>
          <label htmlFor='lesson-paid'>Оплачено:</label>
          <input
            type='checkbox'
            id='lesson-paid'
            name='paid'
            checked={lesson?.paid || false}
            onChange={handleInputChange}
            className='custom-chkbx'
          />
        </div>

        <label htmlFor='lesson-topic'>Тема уроку (необов'язково):</label>
        <input
          type='text'
          id='lesson-topic'
          name='topic'
          value={lesson?.topic || ''}
          onChange={handleInputChange}
        />

        <button type='button' onClick={updateLessonData}>
          Зберегти
        </button>
      </form>
    </div>
  );
};

export default LessonEditForm;
