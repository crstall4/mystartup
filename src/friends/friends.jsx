import React from 'react';
import '../app.css';

export function Friends({user, password, friends}) {
  const statusesOptions = ["Offline", "On Friends Page", "On Login Page", "On Study Page", "On Browse Page"];
  const [statuses, setStatuses] = React.useState({});

  React.useEffect(() => {
    const initialStatuses = {};
    friends.forEach(friend => {
      initialStatuses[friend] = "Offline";
    });
    setStatuses(initialStatuses);

    const interval = setInterval(() => {
      setStatuses(prevStatuses => {
        const newStatuses = { ...prevStatuses };
        const randomFriend = friends[Math.floor(Math.random() * friends.length)];
        const randomStatus = statusesOptions[Math.floor(Math.random() * statusesOptions.length)];
        newStatuses[randomFriend] = randomStatus;
        return newStatuses;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [friends]);

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
    </main>
  );
}