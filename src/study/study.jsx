import React from 'react';
import '../app.css';

export function Study({user, password}) {

  const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 0);
  const [isFlipped, setIsFlipped] = React.useState(false);

  function countClick() {
    setCount(count+1);
    localStorage.setItem('count',count+1);
  }

  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  return (
    <main className="container-fluid bg-light text-center text-dark d-flex flex-column justify-content-center">
        <div className="study-card">
          {isFlipped ? "ANSWER" : "QUESTION"}
        </div>
        <button className="deck" onClick={flipCard}>FLIP</button>
        
        <div
          className="study-buttons"
          style={{ border: "1px solid #000", padding: "10px", display: "inline-block", visibility: isFlipped ? 'visible' : 'hidden'}}
        >
            <p>How well did you know this card?</p>
            <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
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