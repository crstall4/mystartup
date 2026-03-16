import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import '../app.css';

export function Study({user, setScore, decks}) {
  const { studyTarget } = useParams();
  const isRandomMode = studyTarget === 'random';
  const activeDeck = !isRandomMode ? decks.find(deck => `${deck.id}` === `${studyTarget}`) : null;

  const [isFlipped, setIsFlipped] = React.useState(false);
  const [card, setCard] = React.useState({question: Math.random().toString(36).substring(7), answer: Math.random().toString(36).substring(7)});
  const [cardIndex, setCardIndex] = React.useState(0);
  const [studyStartTime, setStudyStartTime] = React.useState('Loading...');

  React.useEffect(() => {
    setIsFlipped(false);
    setCardIndex(0);
  }, [studyTarget]);

  // this is the part that calls a 3rd party api! 

  React.useEffect(() => {
    async function loadStudyStartTime() {
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
        if (!response.ok) {
          setStudyStartTime('Time API request failed');
          return;
        }

        const data = await response.json();
        const formattedTime = new Date(data.utc_datetime).toLocaleString();
        setStudyStartTime(formattedTime);
      } catch {
        setStudyStartTime(new Date().toLocaleString());
      }
    }

    setStudyStartTime('Loading...');
    loadStudyStartTime();
  }, [studyTarget]);


  const currentCard = isRandomMode ? card : activeDeck.cards[cardIndex];

  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  function nextCard(points) {
    const newEntry = {word: currentCard.question, answer: currentCard.answer, points: points, date: new Date().toISOString(), user: user};
    setScore(newEntry);
    setIsFlipped(false);

    if (isRandomMode) {
      setCard({question: Math.random().toString(36).substring(7), answer: Math.random().toString(36).substring(7)});
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
        {isRandomMode ? <h2>Random</h2> : <h2>{activeDeck.name}</h2>}
        {!isRandomMode && <h2>Card # {cardIndex + 1} / {activeDeck.cards.length}</h2>}
        <div className="study-card">
          {isFlipped ? <div>ANSWER:<br />{currentCard.answer}</div> : <div>QUESTION:<br />{currentCard.question}</div>}
        </div>
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
            <p style={{ marginTop: '20px' }}>You started studying this deck at: {studyStartTime}</p>
        </div>
      
    </main>
  );
}