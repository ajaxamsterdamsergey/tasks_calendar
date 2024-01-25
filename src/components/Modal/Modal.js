import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../store/store';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './Modal.module.css';

//options продолжительности задачи
const durationOptions = [
    { value: 5, label: '5 min' },
    { value: 15, label: '15 min' },
    { value: 30, label: '30 min' },
    { value: 45, label: '45 min' },
    { value: 60, label: '1 hour' },
    { value: 75, label: '1 hour 15 min' },
    { value: 90, label: '1 hour 30 min' }
  ];

  //options времени начала задачи
const timeOptions = [
    { value: 0, label: '8:00' },
    { value: 15, label: '8:15' },
    { value: 30, label: '8:30' },
    { value: 45, label: '8:45' },
    { value: 60, label: '9:00' },
    { value: 75, label: '9:15' },
    { value: 90, label: '9:30' },
    { value: 105, label: '9:45' },
    { value: 120, label: '10:00' },
    { value: 135, label: '10:15' },
    { value: 150, label: '10:30' },
    { value: 165, label: '10:45' },
    { value: 180, label: '11:00' },
    { value: 195, label: '11:15' },
    { value: 210, label: '11:30' },
    { value: 225, label: '11:45' },
    { value: 240, label: '12:00' },
    { value: 255, label: '12:15' },
    { value: 270, label: '12:30' },
    { value: 285, label: '12:45' },
    { value: 300, label: '13:00' },
    { value: 315, label: '13:15' },
    { value: 330, label: '13:30' },
    { value: 345, label: '13:45' },
    { value: 360, label: '14:00' },
    { value: 375, label: '14:15' },
    { value: 390, label: '14:30' },
    { value: 405, label: '14:45' },
    { value: 420, label: '15:00' },
    { value: 435, label: '15:15' },
    { value: 450, label: '15:30' },
    { value: 465, label: '15:45' },
    { value: 480, label: '16:00' },
    { value: 495, label: '16:15' },
    { value: 510, label: '16:30' },
    { value: 525, label: '16:45' },
  ];

const Modal = ({ isOpen, onClose, children }) => {
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState(timeOptions[0].value);
    const [duration, setDuration] = useState(durationOptions[0].value);
    const dispatch = useDispatch();

    // Создание и удаление корневого элемента для портала модального окна
  useEffect(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    return () => {
      document.body.removeChild(modalRoot);
    };
  }, []);

  // Обработка нажатия клавиши Escape для закрытия модального окна
  useEffect(() => {
    const handleEscapeKey = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  // Обработчики изменения полей формы
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
};

const handleDurationChange = (e) => {
    setDuration(e.target.value);
};

// Обработчик сохранения новой задачи
const handleSave = (e) => {
  e.preventDefault();
  if (title.trim() === '') {
    console.log('Title is required');
    return;
  }
  const _id = uuidv4();
  dispatch(addTask({ _id, start: parseInt(startTime), duration: parseInt(duration), title }));
  setTitle('');// Очистка поля заголовка после сохранения
  onClose();// Закрытие модального окна
};

// null, если модальное окно не открыто
  if (!isOpen) return null;
  //Использование createPortal для рендеринга модального окна вне текущего DOM-дерева
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.todoFormContainer}>
          <form className={styles.todoFormMain}>
          <div className={styles['input-field']}>
          <input
                type="text"
                id="todo-name"
                className={styles.input}
                required
                value={title}
                onChange={handleTitleChange}
              />
      <label htmlFor="todo-name" className={styles.label}>Title</label>
    </div>
    <div className={styles['input-field']}>
    <select id="start" className={styles.input} required value={startTime} onChange={handleStartTimeChange}>
      {timeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor="start" className={styles.label}>start</label>
    </div>
    <div className={styles['input-field']}>
    <select id="todo-priority" className={styles.input} required value={duration} onChange={handleDurationChange}>
      {durationOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor="todo-priority" className={styles.label}>Duration</label>
    </div>
    <button
  type="button"
  className={styles.addTodoButton}
  onClick={handleSave}
  disabled={!title.trim()}
>
  Save
</button>

          </form>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;