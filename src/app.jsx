import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Study } from './study/study';
import { Friends } from './friends/friends';
import { Browse } from './browse/browse';
import { Stats } from './stats/stats';

export default function App() {
  const [username, setUsername] = React.useState(localStorage.getItem('user') || '');
  const [score, setScore] = React.useState(JSON.parse(localStorage.getItem('score') || '[]'));
  const [friends, setFriends] = React.useState(JSON.parse(localStorage.getItem('friends') || '["Andrew", "Michael", "Carter", "Jeffery", "Jacob", "Clayton"]'));
  const [decks, setDecks] = React.useState(JSON.parse(localStorage.getItem('decks') || '[]'));

  async function refreshDecksFromBackend() {
    const response = await fetch('/api/decks', {
      credentials: 'include',
    });

    if (!response.ok) {
      setDecks([]);
      localStorage.removeItem('decks');
      return;
    }

    const backendDecks = await response.json();
    setDecks(backendDecks);
    localStorage.setItem('decks', JSON.stringify(backendDecks));
  }

  function handleSetUsername(value) {
    setUsername(value);
    localStorage.setItem('user', value);
  }

  function handleSetScore(newEntry) {
    let scoreList = [...score];
    scoreList.push(newEntry);
    setScore(scoreList);
    localStorage.setItem('score', JSON.stringify(scoreList));
  }
  function handleAddFriend(friend) {
    let friendsList = [...friends];
    if (!friendsList.includes(friend)) {
      friendsList.push(friend);
      setFriends(friendsList);
      localStorage.setItem('friends', JSON.stringify(friendsList));
    }
  }

  function handleRemoveFriend(friend) {
    let friendsList = [...friends];
    friendsList = friendsList.filter(f => f !== friend);
    setFriends(friendsList);
    localStorage.setItem('friends', JSON.stringify(friendsList));
  }

  function handleLogout() {
    setUsername('');
    localStorage.removeItem('user');
    setDecks([]);
    localStorage.removeItem('decks');
    fetch('/api/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });
    window.location.assign('/');
  }

  return (
  <BrowserRouter>
  <div className="body">
    <header className="container-fluid">
      {username && <div className="p-3 align-self-start">Welcome: {username}</div>}
      <nav className="navbar fixed-top navbar-dark">
        
        <menu className="navbar-nav">
          <h1 className="navbar-brand">LangLearn</h1>
          <li className="nav-item"><NavLink className='nav-link' to=''>Login</NavLink></li>
          {username && (<li className="nav-item"><NavLink className='nav-link' to='friends'>Friends</NavLink></li>)}
          {username && (<li className="nav-item"><NavLink className='nav-link' to='browse'>Browse Decks</NavLink></li>)}
          {username && (<li className="nav-item"><NavLink className='nav-link' to='study/random'>Study</NavLink></li>)}
          {username && (<li className="nav-item"><NavLink className='nav-link' to='stats'>Stats</NavLink></li>)}
          {username && (<li className="nav-item"><button type="button" className="nav-link" onClick={handleLogout}>Logout</button></li>)}

        </menu>   
      </nav>
    </header>
    <Routes>
      <Route path='/' element={<Login setUsername={handleSetUsername} username={username} refreshDecksFromBackend={refreshDecksFromBackend} />} exact />
      <Route path='/study/:studyTarget' element={<Study user={username} score={score} setScore={handleSetScore} decks={decks} />} />
      <Route path='/friends' element={<Friends user={username} friends={friends} addFriend={handleAddFriend} removeFriend={handleRemoveFriend}/>} />
      <Route path='/browse' element={<Browse user={username} decks={decks} setDecks={setDecks} refreshDecksFromBackend={refreshDecksFromBackend} />} />
      <Route path='/stats' element={<Stats user={username} score={score}/>} />
      <Route path='*' element={<NotFound />} />
    </Routes>

    <footer className="d-flex justify-content-between align-items-center p-3">
      <span className="text-reset">Clayton Stallings</span>
      <a href="https://github.com/crstall4/mystartup" className="nav-link">GitHub</a>
    </footer>
  </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-light text-dark d-flex flex-column justify-content-center align-items-center">404: Return to sender. Address unknown.</main>;
}