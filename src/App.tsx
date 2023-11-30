// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import CalendarPage from './Calendar';
import ClientsPage from './ClientList';
import ClientsForm from './ClientsForm';
import LessonsForm from './LessonsForm';
import LessonList from './LessonList';
import ClientInfo from './ClientInfo';
import ClientEdit from './ClientEdit';
import LessonInfo from './LessonInfo';
import LessonEdit from './LessonEdit';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header className="app-header">
          <nav className="buttons-container">
            <Link to="/calendar" className="nav-link">
              <button className="nav-button">
                <FontAwesomeIcon icon={faCalendar} id="icon-b" />
                Календар
              </button>
            </Link>
            <Link to="/clients" className="nav-link">
              <button className="nav-button">
                <FontAwesomeIcon icon={faUser} id="icon-b"/>
                Клієнти
              </button>
            </Link>
          </nav>
        </header>
        <main className="content-container">
           
          <Routes>
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/ClientsForm"  element={<ClientsForm />}/>
            <Route path="/LessonsForm/:selectedDate"  element={<LessonsForm />}/>
            <Route path="/LessonList/:selectedDate" element={<LessonList />} />
            <Route path="/ClientInfo/:clientId" element={<ClientInfo />} />
            <Route path="/ClientEdit/:clientId" element={<ClientEdit />} />
            <Route path="/LessonInfo/:lessonId" element={<LessonInfo />} />
            <Route path="/LessonEdit/:lessonId" element={<LessonEdit />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
