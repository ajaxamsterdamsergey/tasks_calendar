import React from 'react';
import { deleteTask } from '../../../store/store';
import { useDispatch } from 'react-redux';
import styles from './CalendarEvent.module.css';

const CalendarEvent = ({ event }) => {
  // Расчет позиции, высоты и ширины события на основе его времени начала и продолжительности
  const topPosition = event.start * 2;
  const height = event.duration * 2;
  const width = event.overlap ? '100px' : '200px'; // Уменьшение ширины, если события перекрываются

  const dispatch = useDispatch(); // Инициализация функции dispatch

  // Обработчик для удаления события
  const handleClose = () => {
    dispatch(deleteTask(event._id)); // Отправка действия удаления задачи в Redux store
  };

  // Рендеринг события календаря
  return (
    <div
      className={styles.event} // Применение стилей для события
      style={{
        top: `${topPosition}px`, // Установка позиции сверху на основе времени начала события
        height: `${height}px`, // Установка высоты события
        left: `${event.left}px`, // Позиционирование слева (используется для учета перекрытия событий)
        width: width, // Установка ширины события
      }}
    >
      <span className={styles.closeButton} onClick={handleClose}>
        &#10006; {/* Кнопка закрытия (удаления) события */}
      </span>
      {event.title} 
    </div>
  );
};

export default CalendarEvent;

