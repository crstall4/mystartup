import React from 'react';
import '../app.css';

export function Study({user}) {

  const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 0);

  function countClick() {
    setCount(count+1);
    localStorage.setItem('count',count+1);
  }

  return (
    <main className="container-fluid bg-light text-center text-dark d-flex flex-column justify-content-center">
        <div className="study-card">
            <svg width="150" height="100" viewBox="0 0 300 200" style={{border: "1px solid #000"}}>
                <text x="150" y="100" fontSize="30" textAnchor="middle" dominantBaseline="middle">CARD</text>
            </svg>
        </div>
        
        <div
          className="study-buttons"
          style={{ border: "1px solid #000", padding: "10px", display: "inline-block" }}
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
            <p>Current time: 1:52pm</p>
        </div>

        <div>
          <button onClick={ countClick }>Click</button>
          <div>{count}</div>
        </div>
      
    </main>
  );
}