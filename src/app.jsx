import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div class="body">
    <header class="container-fluid">
      <nav class="navbar fixed-top navbar-dark">
      
        <menu class="navbar-nav">
          <h1 class="navbar-brand">LangLearn</h1>
          <li class="nav-item"><a class="nav-link active" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="friends.html">Friends</a></li>
          <li class="nav-item"><a class="nav-link" href="browse.html">Browse Decks</a></li>
          <li class="nav-item"><a class="nav-link" href="study.html">Study</a></li>
        </menu>
      </nav>
    </header>

      <main>App components go here</main>

    <footer class="d-flex justify-content-between align-items-center p-3">
      <span class="text-reset">Clayton Stallings</span>
      <a href="https://github.com/crstall4/mystartup" class="nav-link">GitHub</a>
    </footer>
    </div>
  );
}
