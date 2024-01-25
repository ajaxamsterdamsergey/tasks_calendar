import React from 'react';
import CalendarEvent from '../CalendarEvent/CalendarEvent';
import { useSelector } from 'react-redux';
import styles from './Calendar.module.css';
import { calculatePositions } from '../../utils/calculatePositions';
import { useMemo } from 'react';

const Calendar = () => {
  // Получение списка задач из Redux хранилища
  const tasks = useSelector(state => state.tasks.tasks);

  // Вычисление позиций для задач с использованием useMemo для предотвращения ненужных пересчетов
  const tasksWithCalculatedLeft = useMemo(() => {
    return calculatePositions(tasks);
  }, [tasks]);

  // Создание массива временных слотов для календаря
  const times = [];
  for (let hour = 8; hour <= 17; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12; // Преобразование 24-часового формата в 12-часовой

    times.push({ time: `${hourFormatted}:00`, isFullHour: true });
    if (hour < 17) { // Добавление половины часа, если не последний час
      times.push({ time: `${hourFormatted}:30`, isFullHour: false });
    }
  }

  return (
    <div className={styles.calendar}>
      {times.map(({ time, isFullHour }) => (
        <div key={time} className={`${styles.timeSlot} ${isFullHour ? styles.fullHour : ''}`}>
          {isFullHour && <div className={styles.line}></div>}
          <span className={`${styles.time} ${isFullHour ? styles.timeLarge : styles.timeSmall}`}>
            {time}
          </span>
        </div>
      ))}
      {tasksWithCalculatedLeft.map((event, index) => (
        <CalendarEvent key={event._id || index} event={event} /> // Рендеринг событий календаря
      ))}
    </div>
  );
};

export default Calendar;

