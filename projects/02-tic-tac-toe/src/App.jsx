import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'X',
  O: 'O'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  // verticales
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // horizzontales
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonales
  [0, 4, 8],
  [6, 4, 2]
]

function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // null no hay ganador, false empate.
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      // chequear que las posiciones tengan el mismo valor
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c] // (a === c) o (b === c)
      ) {
        return boardToCheck[a] // x u o
      }
    }
    // si no hay ganador
    return null
  }

  const updateBoard = (index) => {
    // no se actualiza si ya se escogió esa posición
    if (board[index] || winner) return

    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard) // la actualización de un estado en React es asíncrono

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      window.alert(`Winner is ${newWinner}`)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((cell, index) => (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {cell}
            </Square>
          ))
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App
