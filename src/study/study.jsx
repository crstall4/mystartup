import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import '../app.css';

export function Study({user, setScore, decks}) {
  const { studyTarget } = useParams();
  const isRandomMode = studyTarget === 'random';
  const isReviewMode = studyTarget === 'review';
  const activeDeck = !isRandomMode && !isReviewMode ? decks.find(deck => `${deck.id}` === `${studyTarget}`) : null;

  const [isFlipped, setIsFlipped] = React.useState(false);
  const [card, setCard] = React.useState({question: Math.random().toString(36).substring(7), answer: Math.random().toString(36).substring(7)});
  const [cardIndex, setCardIndex] = React.useState(0);
  const [provoTemp, setProvoTemp] = React.useState('Loading...');
  const [reviewCards, setReviewCards] = React.useState([]);


  // most copmlicated function, calculates what the spaced review cards should show. this is not a final product, and i am open to tweaking this. I just implemented a very simple algorithm to begin with
  // what it does is it finds all unique cards, (cards that have the same front and back) from within the users score history. Then, it takes the most recent score entry for each card, and sorts them by points (lowest to highest) and then by date (oldest to newest). This way you see the cards you are worst at first, sorted by how long ago you last saw them.
  async function loadReviewCards() {
    try {
      const response = await fetch('/api/scores', { credentials: 'include' });
      if (!response.ok) {
        setReviewCards([]);
        return;
      }

      const data = await response.json();
      const scoreEntries = Array.isArray(data) ? data : [];

      const latestByCard = new Map();
      scoreEntries.forEach((entry) => {
        if (!entry || !entry.word) {
          return;
        }

        const question = String(entry.word);
        const answer = String(entry.answer || '');
        const key = `${question}|||${answer}`;
        const timestamp = Date.parse(entry.date || 0) || 0;
        const existing = latestByCard.get(key);

        if (!existing || timestamp > existing.timestamp) {
          latestByCard.set(key, {
            question,
            answer,
            points: Number(entry.points) || 0,
            date: entry.date || new Date(0).toISOString(),
            timestamp,
          });
        }
      });

      const cards = Array.from(latestByCard.values()).sort((a, b) => {
        if (a.points !== b.points) {
          return a.points - b.points;
        }
        return a.timestamp - b.timestamp;
      });

      setReviewCards(cards);
      setCardIndex(0);
    } catch {
      setReviewCards([]);
    }
  }

  React.useEffect(() => {
    setIsFlipped(false);
    setCardIndex(0);
  }, [studyTarget]);

  React.useEffect(() => {
    if (!isReviewMode) {
      return;
    }

    loadReviewCards();
  }, [isReviewMode]);

  // this is the part that calls a 3rd party api! 

  React.useEffect(() => {
    async function loadprovoTemp() {
      try {
        const response = await fetch('/api/current-weather');
        if (!response.ok) {
          setProvoTemp('Weather API request failed');
          return;
        }

        const data = await response.json();
        setProvoTemp(data.temperature);
      } catch {
        setProvoTemp("Error fetching weather");
      }
    }

    setProvoTemp('Loading...');
    loadprovoTemp();
  }, [studyTarget]);


  const currentCard = isRandomMode
    ? card
    : isReviewMode
      ? reviewCards[cardIndex] || null
      : (activeDeck?.cards?.[cardIndex] || null);

  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  async function nextCard(points) {
    if (!currentCard) {
      return;
    }

    const newEntry = {word: currentCard.question, answer: currentCard.answer, points: points, date: new Date().toISOString(), user: user};
    await setScore(newEntry);
    setIsFlipped(false);

    if (isRandomMode) {
      setCard({question: Math.random().toString(36).substring(7), answer: Math.random().toString(36).substring(7)});
      return;
    }

    if (isReviewMode) {
      if(cardIndex + 1 >= reviewCards.length) {
        await loadReviewCards();
      } else {
        setCardIndex(cardIndex + 1);
      }
      return;
    }

    setCardIndex((cardIndex + 1));
    if(cardIndex + 1 >= activeDeck.cards.length) {
      setCardIndex(0);
      return;
    }

  }

  return (
    <main className="container-fluid bg-light text-center text-dark d-flex flex-column justify-content-center">
        {isRandomMode ? <h2>Random</h2> : isReviewMode ? <h2>Review</h2> : <h2>{activeDeck?.name}</h2>}
        {isReviewMode && <h2>Card # {Math.min(cardIndex + 1, Math.max(reviewCards.length, 1))} / {reviewCards.length}</h2>}
        {!isRandomMode && !isReviewMode && <h2>Card # {cardIndex + 1} / {activeDeck?.cards?.length || 0}</h2>}
        {!currentCard && <div>No cards available for this mode yet.</div>}
        {currentCard && (
        <div className="study-card">
          {isFlipped ? <div>ANSWER:<br />{currentCard.answer}</div> : <div>QUESTION:<br />{currentCard.question}</div>}
        </div>
        )}
        <button className="deck" onClick={flipCard}>FLIP</button>
        
        <div
          className="study-buttons"
          style={{ border: "1px solid #000", padding: "10px", display: "inline-block", visibility: isFlipped ? 'visible' : 'hidden'}}
        >
            <p>How well did you know this card?</p>
            <div>
          <button onClick={() => nextCard(1)}>1</button>
          <button onClick={() => nextCard(2)}>2</button>
          <button onClick={() => nextCard(3)}>3</button>
          <button onClick={() => nextCard(4)}>4</button>
          <button onClick={() => nextCard(5)}>5</button>
            </div>
        </div>

        <div>
            <p style={{ marginTop: '20px' }}>It is currently {provoTemp}°F in Provo, Utah</p>
        </div>
      
    </main>
  );
}