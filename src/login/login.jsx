import React from 'react';
import '../app.css';

export function Login() {
  return (
    <main className="container-fluid bg-light text-dark d-flex flex-column justify-content-center">
      <div>
      <h1>Welcome to LangLearn</h1>
      <form method="get" action="browse.html">
        <div className="input-group mb-3">
          <span className="input-group-text">Username: </span>
          <input type="text" className="form-control" placeholder="your@email.com" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Password: </span>
          <input type="password" className="form-control" placeholder="password" />
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="submit" className="btn btn-secondary">Create</button>
        </div>
      </form>
      </div>
            <img id="logo" src="logo.png" width="200" className="mx-auto d-block" alt="LangLearn Logo" />
    </main>
  );
}