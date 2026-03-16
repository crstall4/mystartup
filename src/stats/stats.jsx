import React from 'react';
import '../app.css';

export function Stats({user}) {
  const [score, setScore] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/scores', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) {
          return [];
        }
        return res.json();
      })
      .then((data) => setScore(Array.isArray(data) ? data : []))
      .catch(() => setScore([]));
  }, []);

  return (
    <main className="container-fluid bg-light text-center text-dark d-flex flex-column justify-content-center">
      <h1>Stats</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Word</th>
            <th>Answer</th>
            <th>Points</th>
            <th>Date</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {score.map((entry, index) => (
            <tr key={index}>
              <td>{entry.word}</td>
              <td>{entry.answer}</td>
              <td>{entry.points}</td>
              <td>{entry.date}</td>
              <td>{entry.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}