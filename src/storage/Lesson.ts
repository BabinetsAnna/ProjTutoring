// Lesson.ts
interface Lesson {
  id: number;
  clientId: number;
  date: string;
  time: string;
  price: number;
  paid: boolean;
  topic: string;
}

const LOCAL_STORAGE_KEY = 'lessons';

function readLessons(): Lesson[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading lessons from localStorage:', error);
    return [];
  }
}

function readLessonsWithDate(selectedDate: string ): Lesson[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    const allLessons = data ? JSON.parse(data) : [];

    const filteredLessons = allLessons.filter((lesson: Lesson) => lesson.date === selectedDate);
    return filteredLessons;
  } catch (error) {
    console.error('Error reading lessons from localStorage:', error);
    return [];
  }
}

function writeLessons(lessons: Lesson[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lessons));
  } catch (error) {
    console.error('Error writing lessons to localStorage:', error);
  }
}

function addLesson(newLesson: Omit<Lesson, 'id'>): void {
  const lessons = readLessons();
  const maxId = lessons.length > 0 ? Math.max(...lessons.map((lesson) => lesson.id)) : 0;
  const incrementedId = maxId + 1;

  const lessonWithId: Lesson = {
    id: incrementedId,
    ...newLesson,
  };

  lessons.push(lessonWithId);
  writeLessons(lessons);
}

function deleteLesson(lessonId: number): void {
  const lessons = readLessons();
  const updatedLessons = lessons.filter((lesson) => lesson.id !== lessonId);
  writeLessons(updatedLessons);
}

function updateLesson(updatedLesson: Lesson): void {
  const lessons = readLessons();
  const index = lessons.findIndex((lesson) => lesson.id === updatedLesson.id);

  if (index !== -1) {
    lessons[index] = updatedLesson;
    writeLessons(lessons);
  } else {
    console.error('Lesson not found for update:', updatedLesson);
  }
}

function toggleLessonPaidStatus(lessonId: number): void {
  const lessons = readLessons();
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);

  if (index !== -1) {
    lessons[index].paid = !lessons[index].paid;
    writeLessons(lessons);
  } else {
    console.error('Lesson not found for togglePaidStatus:', lessonId);
  }
}

export { readLessons,readLessonsWithDate, addLesson, deleteLesson, updateLesson, toggleLessonPaidStatus };

