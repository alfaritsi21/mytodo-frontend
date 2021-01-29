import React from 'react'

function Login(props) {

  const { username, setUsername, password, setPassword, handleLogin, handleRegister, hasAccount, setHasAccount, usernameError, passwordError } = props
  return (
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
        <p className="errorMsg">{usernameError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
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
  )
}

export default Login
