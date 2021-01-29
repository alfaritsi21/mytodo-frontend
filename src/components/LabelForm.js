import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function LabelForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.label : '');
  const [inputDesc, setInputDesc] = useState(props.edit ? props.edit.desc : '');

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleChangeDesc = e => {
    setInputDesc(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit(input, inputDesc);
    setInput('');
    setInputDesc('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Edit Label'
            value={input}
            defaultValue={props.edit.label}
            onChange={handleChange}
            name='text'
            className='todo-input-label'
          />
          <input
            placeholder='Add Description'
            value={inputDesc}
            defaultValue={props.edit.desc}
            onChange={handleChangeDesc}
            name='text'
            className='todo-input-label'
          />
          <button onClick={handleSubmit} className='todo-button-update'>
            Update Label
          </button>
        </>
      ) : (
          <>
            <input
              placeholder='Add New Label'
              value={input}
              onChange={handleChange}
              name='text'
              className='todo-input-label'
            />
            <input
              placeholder='Add Description'
              value={inputDesc}
              onChange={handleChangeDesc}
              name='text'
              className='todo-input-label'
            />
            <button onClick={handleSubmit} className='todo-button'>
              Add Label
          </button>
          </>
        )}
    </form>
  );
}

export default LabelForm;
