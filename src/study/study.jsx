import React from 'react';
import '../app.css';

export function Study({user, password, score, setScore}) {

  const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 0);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [card, setCard] = React.useState({question: "苹果", answer: "apple"});

  function countClick() {
    setCount(count+1);
    localStorage.setItem('count',count+1);
  }

  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  function nextCard(points) {
    const newEntry = {word: card.question, points: points, date: new Date().toISOString(), user: user};
    setScore(newEntry);
    flipCard();
    setCard({question: Math.random().toString(36).substring(7), answer: Math.random().toString(36).substring(7)});
  }

  return (
    <main className="container-fluid bg-light text-center text-dark d-flex flex-column justify-content-center">
        <div className="study-card">
          {isFlipped ? <div>ANSWER:<br />{card.answer}</div> : <div>QUESTION:<br />{card.question}</div>}
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
            <p style={{ marginTop: '20px' }}>Current time: 1:52pm</p>
        </div>

        <div>
          <button onClick={ countClick }>Click</button>
          <div>{count}</div>
        </div>
      
    </main>
  );
}