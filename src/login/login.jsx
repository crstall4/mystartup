import React, { useState } from 'react';
import '../app.css';
import { NavLink, useNavigate } from 'react-router-dom';

export function Login({setUsername, setPassword, username, password}) {
  const navigate = useNavigate();
  const [localUsername, setLocalUsername] = useState(username || '');
  const [localPassword, setLocalPassword] = useState(password || '');

  function loginUser(e) {
    e.preventDefault();
    setUsername(localUsername);
    setPassword(localPassword);
    navigate('/study');
  }

  return (
    <main className="container-fluid bg-light text-dark d-flex flex-column justify-content-center">
      <div>
      <h1>Welcome to LangLearn</h1>
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text">Username: </span>
          <input type="text" className="form-control" placeholder="your@email.com" value={localUsername} onChange={(e) => setLocalUsername(e.target.value)} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Password: </span>
          <input type="password" className="form-control" placeholder="password" value={localPassword} onChange={(e) => setLocalPassword(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button type="submit" onClick={loginUser} className="btn btn-primary">Login</button>
          <button type="button" onClick={loginUser} className="btn btn-secondary">Create</button>
        </div>
      </form>
      </div>
            <img id="logo" src="logo.png" width="200" className="mx-auto d-block" alt="LangLearn Logo" />
    </main>
  );
}