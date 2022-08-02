import React, { useState, useEffect, useRef } from 'react';
import { MdAddBox,MdCheckCircle } from 'react-icons/md';

function TaskForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      descripcion: input,
      esfinalizado: false,
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='task-form'>
      {props.edit ? (
        <div className='task-edit'>
          <input
            placeholder='Actualiza la tarea'
            value={input}
            onChange={handleChange}
            name='descripcion'
            ref={inputRef}
            className='task-input edit'
          />
          <MdCheckCircle onClick={handleSubmit} className='task-button edit'/>
        </div>
      ) : (
        <div className='task-new'>
          <input
            placeholder='Agrega una tarea'
            value={input}
            onChange={handleChange}
            name='descripcion'
            className='task-input'
            ref={inputRef}
          />
          <MdAddBox onClick={handleSubmit} className='task-button'/>
          
          
        </div>
      )}
    </form>
  );
}

export default TaskForm;