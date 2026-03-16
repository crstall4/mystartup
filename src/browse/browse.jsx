import React from 'react';
import { NavLink } from 'react-router-dom';
import '../app.css';

export function Browse({user, decks, setDecks, refreshDecksFromBackend}) {
  const [uploadStatus, setUploadStatus] = React.useState('');

  async function handleDeckUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const deckData = JSON.parse(text);

      const response = await fetch('/api/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: deckData.name,
          cards: deckData.cards,
        }),
      });

      if (!response.ok) {
        const body = await response.json();
        setUploadStatus(body.msg || 'Deck upload failed.');
        event.target.value = '';
        return;
      }

      const newDeck = await response.json();
      await refreshDecksFromBackend();
      setUploadStatus(`Uploaded "${newDeck.name}"`);
    } catch {
      setUploadStatus('Could not upload, make sure its JSON and has good format.');
    }

    event.target.value = '';
  }

  return (
    <main className="container-fluid bg-light text-center text-dark d-flex flex-column justify-content-center">
      
      <h1>Decks</h1>

      <div>
      <h3><NavLink to="/study/random" className="deck">Random Cards</NavLink></h3>
      </div>

      <div>
      <h3><NavLink to="/study/review" className="deck">Spaced Review</NavLink></h3>
      </div>

      <div>
        {decks.map((deck, index) => (
          <h4 key={deck.id || index}>
            <NavLink to={`/study/${deck.id}`} className="deck">{deck.name} ({deck.cards ? deck.cards.length : 0} cards)</NavLink>
          </h4>
        ))}
      </div>


      <div>
        <h3>Upload a deck (.json)</h3>
        <input type="file" accept=".json,application/json" onChange={handleDeckUpload} />
        <p>{uploadStatus}</p>
      </div>

    </main>
  );
}
