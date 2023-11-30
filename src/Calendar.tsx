import React, { useEffect, useState } from 'react';
import './styles/Calendar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {readLessonsWithDate} from './storage/Lesson';
import { Link } from 'react-router-dom';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  useEffect(() => {
    showCalendar();
  }, [currentMonth, currentYear]);

  const showCalendar = () => {
    updateCalendar();
  };
  const updateCalendar = () => {
    const calendarBody = document.getElementById('calendar-body') as HTMLTableSectionElement;
    const monthYearHeader = document.getElementById('month-year') as HTMLHeadingElement;

    if (!calendarBody || !monthYearHeader) {
      console.error("Елементи календаря не знайдені");
      return;
    }

    const firstDay: Date = new Date(currentYear, currentMonth, 1);
    const lastDay: Date = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth: number = lastDay.getDate();
    const startDay: number = firstDay.getDay();

    monthYearHeader.textContent = new Intl.DateTimeFormat('uk-UA', { month: 'long', year: 'numeric' }).format(firstDay);

    let day: number = 1;
    let html: string = '';

    for (let i = 0; i < 6; i++) {
      html += '<tr>';
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          html += '<td></td>';
        } else if (day > daysInMonth) {
          break;
        } else {
          const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const lessonsForDate = readLessonsWithDate(date);

          const isToday = isCurrentDate(day);

          if (lessonsForDate.length > 0 && isToday) {
            html += `<td class="highlighted-day-today" data-day="${day}">${day}</td>`;
          } else if (lessonsForDate.length > 0 && !isToday) {
            html += `<td class="highlighted-day" data-day="${day}">${day}</td>`;
          } else if (lessonsForDate.length <= 0 && isToday) {
            html += `<td class="today" data-day="${day}">${day}</td>`;
          }
          else {
            html += `<td data-day="${day}">${day}</td>`;
          }

          day++;
        }
      }
      html += '</tr>';
    }

    calendarBody.innerHTML = html;
  };
const isCurrentDate = (day: number): boolean => {
  const currentDate = new Date();
  return (
    currentDate.getFullYear() === currentYear &&
    currentDate.getMonth() === currentMonth &&
    day === currentDate.getDate()
  );
};

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  const handleDateClick = (event: React.MouseEvent) => {
    const selectedDay: string | undefined = (event.target as HTMLElement).dataset.day;
    if (selectedDay) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const date = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
  
      setSelectedDate(date);
      console.log(date);
    
    }
  };

  return (
    <div id="calendar-container">
      <div id="header">
        <button onClick={prevMonth} id="nav-b"><FontAwesomeIcon icon={faChevronLeft} /></button>
        <h2 id="month-year"></h2>
        <button onClick={nextMonth} id="nav-b"><FontAwesomeIcon icon={faChevronRight} /></button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Нд</th>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
          </tr>
        </thead>
        <tbody id="calendar-body" onClick={handleDateClick}></tbody>
      </table>
      
      {selectedDate && (
  <Link to={`/LessonList/${selectedDate}`} id="nav-link">
   
  <p id="link-date">Обрана дата: {selectedDate} </p> 
  </Link>
)}
    </div>
  );
};

export default Calendar;
