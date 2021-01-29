import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Login from './Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";


function Auth() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)

  let history = useHistory();

  const clearError = () => {
    setUsernameError('')
    setPasswordError('')
  }


  const handleLogin = async () => {
    clearError()
    let body = {
      username: username,
      password: password
    }

    try {
      const res = await axios.post('http://localhost:3001/users/login/', body)
      console.log(res);
      localStorage.setItem("token", `Bearer ${res.data.data.token}`)
      localStorage.setItem("role", res.data.data.role)
      history.push("/todolist")
    } catch (e) {
      console.log(e.response.data);
      setUsernameError(e.response.data.msg)
      setPasswordError(e.response.data.msg)
    }
  }

  const handleRegister = async () => {
    clearError()

    let body = {
      username: username,
      password: password
    }

    try {
      await axios.post('http://localhost:3001/users/register/', body)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e);
      setUsernameError(e.response.data.msg)
      setPasswordError(e.response.data.msg)
    }
  }

  return (
    <div className="App">
      <section className="login">
        <div className="loginContainer">
          <label>Username</label>
          <input
            type="text"
            autoFocus
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="errorMsg">{usernameError || passwordError}</p>

          <div className="btnContainer">
            {hasAccount ? (
              <>
                <button className="buttonAuth" onClick={handleLogin}>Sign In</button>
                <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
              </>
            ) : (
                <>
                  <button className="buttonAuth" onClick={handleRegister}>Sign Up</button>
                  <p>Have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
                </>
              )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Auth
