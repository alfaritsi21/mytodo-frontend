import React from 'react';
import './App.css';
import Auth from './components/Auth';
import TodoList from './components/TodoList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className='todo-app'>

      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route path="/todolist">
              <TodoList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
