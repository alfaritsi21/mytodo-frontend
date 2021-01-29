import React, { useState } from 'react';
import LabelForm from './LabelForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const ManageUser = ({ labels, updateLabel, removeLabel, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <LabelForm edit={edit} onSubmit={submitUpdate} />;
  }

  return labels.map((labels, index) => (
    <div
      className={labels.completed ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={index}>
        {labels.label.toUpperCase()}
      </div>
      <div key={index}>
        {labels.desc}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeLabel(labels.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => updateLabel(labels)}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default ManageUser;
