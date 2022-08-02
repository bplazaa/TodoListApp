import React, { useState } from 'react';
import TaskForm from './TaskForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Task = ({ tasks, filterStatus,completeTask, removeTask, updateTask }) => {
  const [edit, setEdit] = useState({
    id: null,
    descripcion: '',
    esfinalizado: false,
  });

  const submitUpdate = value => {
    updateTask(edit.id, value);
    setEdit({
      id: null,
      descripcion: '',
      esfinalizado: false,
    });
  };

  if (edit.id) {
    return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }

  
  switch (filterStatus) {
    case "complete":
      tasks = [...tasks].filter(task => task.esfinalizado);
      break;
    case "todo":
      tasks = [...tasks].filter(task => !task.esfinalizado);
      break;
    default:
      break;
  }

  
  return tasks.map((task, index) => (
    <div
      className={task.esfinalizado ? 'task-row complete' : 'task-row'}
      key={index}
    >
      <div key={task.id} onClick={() => completeTask(task)}>
        {task.descripcion}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTask(task.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: task.id, value: task.descripcion })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Task;