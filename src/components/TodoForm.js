import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [labels, setLabels] = useState([]);


  useEffect(() => {
    getLabel()
  }, [])

  const getLabel = async () => {
    let labels = await axios.get('http://localhost:3001/labels/')
    setLabels(labels.data.data);
    console.log(labels.data.data)
  }

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
          <>
            <select className='todo-select edit' onChange={(e) => { console.log(e.target.value); props.setLabel(e.target.value) }}>
              {
                labels.map((item) => {
                  return <option value={item.id} key={item.id}>{item.label.toUpperCase()}</option>
                })
              }
            </select>
            <input
              placeholder='Add a todo'
              value={input}
              onChange={handleChange}
              name='text'
              className='todo-input'
              ref={inputRef}
            />
            <button onClick={handleSubmit} className='todo-button'>
              Add todo
          </button>
            <button className='manage-button'>
              Manage User
          </button>
            <button className='manage-button'>
              Manage Label
          </button>
          </>
        )}
    </form>
  );
}

export default TodoForm;
