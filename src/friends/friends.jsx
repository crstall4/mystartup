import React from 'react';
import '../app.css';

export function Friends() {
  return (
    <main className="container-fluid bg-light text-center text-dark d-flex flex-column justify-content-center">
        {/* Webhook placeholder!!!! */}
      <div>
        <h1>Friends</h1>
        <h2>Welcome, User!</h2>

        <ul className="friends">
          <li className="player-name">Friend 1: On Login Page</li>
          <li className="player-name">Friend 2: Last online 3 minutes ago</li>
          <li className="player-name">Friend 3: Reviewing Deck 1</li>
        </ul>
      </div>
    </main>
  );
}