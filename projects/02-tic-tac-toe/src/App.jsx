import { useState } from 'react'
import { Square } from './components/Square'
import { TURNS, WINNER_COMBOS } from './constants'
import confetti from 'canvas-confetti'
import './App.css'

function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // null no hay ganador, false empate.

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

  const checkEndGame = (newBoard) => {
    // Hay empate si no hay espacios null en el tablero
    return newBoard.every((square) => square !== null)
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
      confetti()
    } else if (checkEndGame(newBoard)) {
      return setWinner(false) // empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>reset juego</button>
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

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                    ? 'empate'
                    : 'Ganó'
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>empezar denuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
