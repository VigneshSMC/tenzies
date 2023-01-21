import './App.css'
import Dice from './Dice.js'
import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  function newDice(){
    const newDiceArray = []

    for(let i = 0; i < 10; i++) {
      newDiceArray.push(singleNewDice())
    }

    return newDiceArray;
  }

  function singleNewDice() {
    const num = Math.ceil(Math.random() * 6)
    return {
          value: num, 
          isHeld: false,
          id: nanoid()
    }
  }

  function onChange(id) {
    setDice(die => die.map(dat => dat.id === id ? {...dat, isHeld: !dat.isHeld} : dat))
  }

  const [dice, setDice] = React.useState(newDice());
  const [tenzies, setTenzies] = React.useState(false)

  const diceValue = dice.map(dat => <Dice key={dat.id} click={() => onChange(dat.id)} isHeld={dat.isHeld} value={dat.value}/>)

  function onRoll() {
    if(tenzies) {
      setDice(newDice())
      setTenzies(false)
    }
    else {
      setDice(dice => dice.map(die => die.isHeld ? die : singleNewDice()))
    }
  }

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const sameVal = dice.every(die => die.value)

    if(allHeld && sameVal) {
      setTenzies(true)
      console.log("You won")
    }

  }, [dice])

  return(
    <main>
      {tenzies && <Confetti />}
      <div className="inner__box">
        <h1>TENZIES</h1>
        <div className="dice__box-container">
          {diceValue}
        </div>
        <button onClick={onRoll}><h3>{tenzies ? "New Game" : "Roll"}</h3></button>
      </div>
    </main>
  )
}
