import React from 'react';
import { NavLink } from 'react-router-dom';
import '../app.css';

export function Browse({user, password, decks, setDecks}) {
  const [uploadStatus, setUploadStatus] = React.useState('');

  async function handleDeckUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const deckData = JSON.parse(text);

      if (!deckData.name || !Array.isArray(deckData.cards) || deckData.cards.length === 0) {
        setUploadStatus('Deck must have a name and at least one card.');
        event.target.value = '';
        return;
      }

      for (let i = 0; i < deckData.cards.length; i++) {
        const card = deckData.cards[i];
        if (!card || !card.question || !card.answer) {
          setUploadStatus('All cards must include both question and answer.');
          event.target.value = '';
          return;
        }
      }

      const deckId = `${Date.now()}`;
      const newDeck = {
        id: deckId,
        name: deckData.name,
        owner: user,
        cards: deckData.cards.map((card, index) => ({
          id: `${index + 1}`,
          question: String(card.question),
          answer: String(card.answer),
        })),
      };

      const updatedDecks = [...decks, newDeck];
      setDecks(updatedDecks);
      localStorage.setItem('decks', JSON.stringify(updatedDecks));
      setUploadStatus(`Uploaded "${newDeck.name}"`);
    } catch {
      setUploadStatus('Could not upload, make sure its JSON and has good format.');
    }

    event.target.value = '';
  }

  return (
    <main className="container-fluid bg-light text-center text-dark d-flex flex-column justify-content-center">
      <div>
      <h1>Decks</h1>
      <h3><NavLink to="/study/random" className="deck">Spaced Review</NavLink></h3>
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
