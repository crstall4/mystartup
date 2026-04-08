import React from 'react';
import '../app.css';

export function Friends({user, friends, addFriend, removeFriend, statuses}) {
  const [friendName, setFriendName] = React.useState('');

  return (
    <main className="container-fluid bg-light text-center text-dark d-flex flex-column justify-content-center">
        {/* Webhook placeholder!!!! */}
      <div>
        <h1>Friends</h1>
        <h2>Welcome, {user}!</h2>

        <ul className="friends">
          {friends.map((friend, index) => (
            <li key={index} className="player-name">{friend}: {statuses[friend] || "offline"}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter friend name"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        <br />
        <button onClick={() => addFriend(friendName)}>Add</button>
        <button onClick={() => removeFriend(friendName)}>Remove</button>
      </div>
    </main>
  );
}