import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readLessons } from './storage/Lesson';
import './styles/info.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Lesson {
  id: number;
  clientId: number;
  date: string;
  time: string;
  price: number;
  paid: boolean;
  topic: string;
}

interface LessonInfoProps {}

const LessonInfo: React.FC<LessonInfoProps> = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    // Завантажте інформацію про урок при завантаженні компонента
    if (lessonId) {
      const parsedLessonId = parseInt(lessonId, 10);
      const lessons = readLessons();
      const foundLesson = lessons.find((l) => l.id === parsedLessonId);

      if (foundLesson) {
        setLesson(foundLesson);
      }
    }
  }, [lessonId]);

  return (
    <div id="info-cont">
      <div id="header-info">
        <Link to={`/LessonList/${lesson?.date}`} id="back-link">
        <button id='nav-button'>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </Link>
        <h2>Інформація про урок</h2>
        {lesson && (
          <Link to={`/LessonEdit/${lesson.id}`}>
            <button id='nav-button'>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          </Link>
        )}
      </div>
      {lesson ? (
        <>
          <p>Дата: {lesson.date}</p>
          <p>Час: {lesson.time}</p>
          <p>Ціна: {lesson.price}</p>
          <p>Статус оплати: {lesson.paid ? 'Оплачено' : 'Не оплачено'}</p>
          <p>Тема уроку: {lesson.topic}</p>
        </>
      ) : (
        <p>Урок не знайдено</p>
      )}
    </div>
  );
};

export default LessonInfo;

