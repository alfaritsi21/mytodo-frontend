import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';

import LabelForm from './LabelForm';

import Todo from './Todo';
import ManageUser from './ManageUser';
import ManageLabels from './ManageLabels';


import axios from 'axios';

function TodoList() {

  const [todos, setTodos] = useState([]);
  const [labeId, setlabeId] = useState(1);

  const [users, setUsers] = useState([]);
  const [labels, setLabels] = useState([]);

  const [editLabel, setEditLabel] = useState(null);
  const [role, setRole] = useState(2);

  useEffect(() => {
    getTodo()
    getUsers()
    getLabels()
  }, [])

  const getTodo = async (id) => {
    let token = localStorage.getItem("token")
    let header = {
      Authorization: token
    }
    console.log("header " + token);
    let todos = await axios.get('http://localhost:3001/todos/', { headers: header })
    console.log(todos);
    setTodos(todos.data.data)
    setRole(localStorage.getItem("role"))
  }

  // ----------------- user
  const getUsers = async () => {
    let users = await axios.get('http://localhost:3001/users/')
    // console.log(users);
    setUsers(users.data.data)
  }
  // -----------------

  // ----------------- labels
  const getLabels = async () => {
    let labels = await axios.get('http://localhost:3001/labels/')
    console.log(labels);
    setLabels(labels.data.data)
  }
  // -----------------

  const createTodo = async (task) => {
    let body = {
      label_id: labeId,
      task: task
    }
    let token = localStorage.getItem("token")
    let header = {
      Authorization: token
    }
    try {
      await axios.post('http://localhost:3001/todos/', body, { headers: header })
      getTodo()
    } catch (e) {
      console.log(e);
    }
  }

  // ---------------------- label
  const createLabel = async (label, desc) => {
    let body = {
      label: label,
      desc: desc
    }
    try {
      if (editLabel) {
        await axios.patch(`http://localhost:3001/labels/${editLabel.id}`, body)
        setEditLabel(null)
      } else {
        await axios.post('http://localhost:3001/labels/', body)
      }
      getLabels()
    } catch (e) {
      console.log(e);
    }
  }
  // ----------------------

  const updateTodo = async (id) => {
    await axios.patch(`http://localhost:3001/todos/${id}`)
    getTodo()
  }

  const deleteTodo = async (id) => {
    let header = {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJpcXJvIiwicm9sZSI6MiwiaWF0IjoxNjExODc0NjI2LCJleHAiOjE2MTE5NjEwMjZ9.vQl8FvaytVYR_gxB6hMQeQvDkuErh9AhTdK6LoN747M"
    }

    await axios.delete(`http://localhost:3001/todos/${id}`, { headers: header })
    getTodo()
  }

  // ---------------------- user
  const updateUsers = async (id) => {
    let body = {
      confirmed: 1
    }

    await axios.patch(`http://localhost:3001/users/${id}`, body)
    getUsers()
  }

  const deleteUsers = async (id) => {
    // let header = {
    //   Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJpcXJvIiwicm9sZSI6MiwiaWF0IjoxNjExODc0NjI2LCJleHAiOjE2MTE5NjEwMjZ9.vQl8FvaytVYR_gxB6hMQeQvDkuErh9AhTdK6LoN747M"
    // }

    await axios.delete(`http://localhost:3001/users/${id}`)
    console.log(id);
    getUsers()
  }
  // ----------------------

  // ---------------------- label
  const updateLabels = async (id) => {
    let body = {
      label: 'Sleep',
      desc: 'description sleep'
    }

    await axios.patch(`http://localhost:3001/labels/${id}`, body)
    getLabels()
  }

  const deleteLabels = async (id) => {
    // let header = {
    //   Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJpcXJvIiwicm9sZSI6MiwiaWF0IjoxNjExODc0NjI2LCJleHAiOjE2MTE5NjEwMjZ9.vQl8FvaytVYR_gxB6hMQeQvDkuErh9AhTdK6LoN747M"
    // }

    await axios.delete(`http://localhost:3001/labels/${id}`)
    getLabels()
  }
  // ----------------------

  const addTodo = todo => {
    if (!todo || /^\s*$/.test(todo)) {
      return;
    }

    createTodo(todo)
  };

  // --------------------- label
  const addLabel = (label, desc) => {
    createLabel(label, desc)
  };
  // ---------------------

  const removeTodo = id => {
    deleteTodo(id)
  };

  const completeTodo = id => {
    updateTodo(id)
  };

  // -------------------- user
  const removeUser = id => {
    deleteUsers(id)
  };

  const confirmUser = id => {
    updateUsers(id)
  };
  // --------------------

  // -------------------- label
  const removeLabel = id => {
    deleteLabels(id)
  };

  const updateLabel = label => {
    // updateLabels(id)
    setEditLabel(label)
  };
  // --------------------

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} setLabel={setlabeId} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      {
        role == 1 && <div>
          <div className="line" />
          <h1>MANAGE USER</h1>
          <ManageUser
            users={users}
            confirmUser={confirmUser}
            removeUser={removeUser}
          />
          <div className="line" />
          <h1>MANAGE LABELS</h1>
          <LabelForm onSubmit={addLabel} edit={editLabel} />
          <ManageLabels
            labels={labels}
            updateLabel={updateLabel}
            removeLabel={removeLabel}
          />
        </div>
      }

    </>
  );
}

export default TodoList;
