import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const ManageUser = ({ users, confirmUser, removeUser }) => {
  // const [edit, setEdit] = useState({
  //   id: null,
  //   value: ''
  // });

  // const submitUpdate = value => {
  //   updateTodo(edit.id, value);
  //   setEdit({
  //     id: null,
  //     value: ''
  //   });
  // };

  // if (edit.id) {
  //   return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  // }

  return users.map((users, index) => (
    <div
      className={users.completed ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={index}>
        {users.username.toUpperCase()}
      </div>
      <div key={index}>
        {users.role === 1 ? 'Admin' : 'User'}
      </div>
      <div key={index}>
        {users.confirmed ? 'Confirmed' : 'Not Confirmed'}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeUser(users.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => confirmUser(users.id)}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default ManageUser;
