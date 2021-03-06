// import logo from "./logo.svg";
import { React } from "react";
import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import Board from "./components/Board";
import Profiles from "./components/Profiles";
import Leaderboard from "./components/Database";
// import Modal from "./components/Modal";
import "./components/Board.css";
const cardImages = [
  { src: "/img/amg2.png", matched: false },
  { src: "/img/audi.png", matched: false },
  { src: "/img/coupe.png", matched: false },
  { src: "/img/cover.png", matched: false },
  { src: "/img/ferrari.png", matched: false },
  { src: "/img/gclass.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // const [showModal, setShowModal] = useState(true);
  // const [showModal, setShowModal] = useState(true);

  //function that shuffle the cards

  function shuffleCards() {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  //handle a choice

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((previousCards) => {
          return previousCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        // console.log("those cards match");
        resetTurn();
      } else {
        // console.log("those cards do not match");
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  //start the game automatically when the player fist lands on the website
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <br />
      <br />
      <Board />
      {/* <Modal /> */}
    </div>
  );
}

export default App;
