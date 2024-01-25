import React, { useState, useEffect } from 'react';
import dbConnect from '../dbConnect';
import TaskModel from '../models/TaskModel';
import { useDispatch } from 'react-redux';
import { wrapper } from '../store/store';
import { setTasks } from '../store/store';
import Modal from '../src/components/Modal/Modal';
import AddEventButton from '../src/components/AddEventButton/AddEventButton';
import Calendar from '../src/components/Calendar/Calendar';


// Функция, выполняемая на серверной стороне для инициализации пропсов страницы
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { req } = context;
    // Использование куки для проверки необходимости загрузки задач
    const loadTasks = req.cookies.loadTasks;

    // Подключение к базе данных и загрузка задач, если это необходимо
    // if (loadTasks === 'true') {
      await dbConnect();
      const tasks = await TaskModel.find({});
      const tasksForProps = tasks.map(doc => {
        const task = doc.toObject();
        task._id = task._id.toString(); // Преобразование _id из ObjectId в строку
        return task;
      });

      // Добавление задач в Redux store
      store.dispatch(setTasks(tasksForProps));
      return { props: { initialTasks: tasksForProps } };
    //}

    // Возврат пустых пропсов, если загрузка задач не требуется
    return { props: {} };
  }
);

// Основной компонент страницы
export default function Home({ initialTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления видимостью модального окна
  const dispatch = useDispatch(); // Подключение функции dispatch для отправки 

  // Эффект для инициализации состояния из localStorage или начальных пропсов
  useEffect(() => {
    // Установка куки в зависимости от наличия задач в localStorage
    // if (!localStorage.getItem('tasks')) {
    //   console.log("loadTasks=true; path=/");
    //   document.cookie = "loadTasks=true; path=/";
    // } else {
    //   console.log("loadTasks=false; path=/");
    //   document.cookie = "loadTasks=false; path=/";
    // }

    // Загрузка задач из localStorage или из начальных пропсов
    const localTasks = localStorage.getItem('tasks');
    if (localTasks) {
      const tasksFromStorage = JSON.parse(localTasks);
      dispatch(setTasks(tasksFromStorage));
    } else if (initialTasks) {
      dispatch(setTasks(initialTasks));
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
  }, [dispatch, initialTasks]);

  // Обработчики для открытия и закрытия модального окна
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Рендеринг страницы с календарем, кнопкой добавления события и модальным окном
  return (
    <div style={{ display: 'flex' }}>
      <Calendar />
      <AddEventButton onClick={openModal}>add event</AddEventButton>
      <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
    </div>
  );
}
