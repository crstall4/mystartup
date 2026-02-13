import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Study } from './study/study';
import { Friends } from './friends/friends';
import { Browse } from './browse/browse';

export default function App() {
  return (
  <BrowserRouter>
  <div class="body">
    <header class="container-fluid">
      <nav class="navbar fixed-top navbar-dark">
      
        <menu class="navbar-nav">
          <h1 class="navbar-brand">LangLearn</h1>
          <li class="nav-item"><NavLink className='nav-link' to=''>Login</NavLink></li>
          <li class="nav-item"><NavLink className='nav-link' to='friends'>Friends</NavLink></li>
          <li class="nav-item"><NavLink className='nav-link' to='browse'>Browse Decks</NavLink></li>
          <li class="nav-item"><NavLink className='nav-link' to='study'>Study</NavLink></li>
        </menu>
      </nav>
    </header>

    <Routes>
      <Route path='/' element={<Login />} exact />
      <Route path='/study' element={<Study />} />
      <Route path='/friends' element={<Friends />} />
      <Route path='/browse' element={<Browse />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

    <footer class="d-flex justify-content-between align-items-center p-3">
      <span class="text-reset">Clayton Stallings</span>
      <a href="https://github.com/crstall4/mystartup" class="nav-link">GitHub</a>
    </footer>
  </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-light text-dark d-flex flex-column justify-content-center align-items-center">404: Return to sender. Address unknown.</main>;
}