export function Browse() {
  return (
    <main className="container-fluid bg-light text-center text-dark d-flex flex-column justify-content-center">
      <div>
      <h1>Decks</h1>
      <h3><NavLink to="study" className="deck">Spaced Review</NavLink></h3>
        <h3><NavLink to="study" className="deck">Deck 1</NavLink></h3>
        <h3><NavLink to="study" className="deck">Deck 2</NavLink></h3>
        <h3><NavLink to="study" className="deck">Deck 3</NavLink></h3>
      </div>
    </main>
  );
}