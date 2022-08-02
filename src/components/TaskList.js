import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const [filterStatus, setFilterStatus] = useState('all');


  const API_URL = "http://127.0.0.1:8000/tasks/";

  const addTask = task => {
    if (!task.descripcion || /^\s*$/.test(task.descripcion)) {
      return;
    }
    
    axios.post(API_URL, {
      descripcion: task.descripcion,
      esfinalizado: task.esfinalizado
    })
    .then( (res) => {
      setTasks([res.data, ...tasks]);
    })
    .catch(err => console.log(err));
  };

  const updateTask = (taskId, newValue) => {
    if (!newValue.descripcion || /^\s*$/.test(newValue.descripcion)) {
      return;
    }
    
    axios.patch(API_URL+taskId+"/", {
      descripcion: newValue.descripcion
    })
    .then((res)=> {
      newValue.id = res.data.id;
      setTasks(prev => prev.map(item => (item.id === taskId ? newValue : item)));
    })
    .catch((err) => console.log(err));
  };

  const removeTask = id => {
    
    axios.delete(API_URL+id+"/")
    .then((res)=> {
      console.log(res);
      const removedArr = [...tasks].filter(task => task.id !== id);
      setTasks(removedArr)
    })
    .catch((err) => console.log(err));
  };

  const completeTask = task => {
    
    axios.patch(API_URL+task.id+"/", {
      esfinalizado: !task.esfinalizado
    })
    .then((res)=> {
      console.log(res.data)
      let updatedTasks = tasks.map(item => {
        if (item.id === task.id) {
          item.esfinalizado = !item.esfinalizado;
        }
        return item;
      });
      setTasks(updatedTasks);
    })
    .catch((err) => console.log(err));
  };

  useEffect(() =>{
    axios.get(API_URL)
    .then(res => {
      setTasks(res.data)
    })
    .catch(err => console.log(err))
  },[]
  );

  const updateFilter = e => {
    setFilterStatus(e.target.value);
  }

  return (
    <>
      <h1>Todo List APP</h1>
      <TaskForm onSubmit={addTask} />
      <select className="task-filter" onChange={updateFilter}>
        <option value="all">Todas</option>
        <option value="complete">Completadas</option>
        <option value="todo">Por hacer</option>
      </select>
      <Task
        tasks={tasks}
        filterStatus = {filterStatus}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </>
  );
}

export default TaskList;