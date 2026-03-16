import React, { useState } from 'react';
import '../app.css';
import { NavLink, useNavigate } from 'react-router-dom';

export function Login({setUsername, username, refreshDecksFromBackend}) {
  const navigate = useNavigate();
  const [localUsername, setLocalUsername] = useState(username || '');
  const [localPassword, setLocalPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  async function loginUser(e) {
    e.preventDefault();

    setLoginError('');
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: localUsername, password: localPassword }),
      credentials: 'include',
    });

    if (response.ok) {
      setUsername(localUsername);
      await refreshDecksFromBackend();
      setLocalPassword('');
      navigate('/study/random');
      return;
    }

    const body = await response.json();
    setLoginError(body.msg || 'Login failed');
  }

  async function createUser(e) {
    e.preventDefault();

    setLoginError('');
    const response = await fetch('/api/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: localUsername, password: localPassword }),
      credentials: 'include',
    });

    if (response.ok) {
      setUsername(localUsername);
      await refreshDecksFromBackend();
      setLocalPassword('');
      navigate('/study/random');
      return;
    }

    const body = await response.json();
    setLoginError(body.msg || 'Registration failed');
  }

  return (
    <main className="container-fluid bg-light text-dark d-flex flex-column justify-content-center">
      <div>
      <h1>Welcome to LangLearn</h1>
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text">Username: </span>
          <input type="text" className="form-control" placeholder="username" value={localUsername} onChange={(e) => setLocalUsername(e.target.value)} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Password: </span>
          <input type="password" className="form-control" placeholder="password" value={localPassword} onChange={(e) => setLocalPassword(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button type="submit" onClick={loginUser} className="btn btn-primary">Login</button>
          <button type="button" onClick={createUser} className="btn btn-secondary">Create</button>
        </div>
        {loginError && <p className="text-danger mt-3">{loginError}</p>}
      </form>
      </div>
            <img id="logo" src="logo.png" width="200" className="mx-auto d-block" alt="LangLearn Logo" />
    </main>
  );
}