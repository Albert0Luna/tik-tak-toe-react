import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.JSX'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

function App () {
  console.log('render')
  const [board, setBoard] = useState(() => {
    console.log('Inicializar estado del board')
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => { // Este callback lo que hace es devolver una funcion con la que queremos actualizar el estado.
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X //
  })
  const [winner, setWinner] = useState(null) //* null = no hay ganador, false hay un empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null) //* null = no hay ganador, false hay un empate

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo se termina la ejecucion.
    if (board[index] || winner) return
    // --> Se tiene que usar un array nuevo porque se puede modificar el estado actual y causar problemas de renderisado y es importante que los datos siempre sean nuevos
    //* Actualizar el tablero de manera correcta
    const newBoard = [...board]
    //! Aprender sobre el spread y rest operator
    newBoard[index] = turn // x - o
    setBoard(newBoard)
    //* Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    //* Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    setTurn(newTurn)
    // todo/ Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner) // todo/ La actualización del estado en REACT no es sincrono y no espera a que se ejecute primero el setWinner(newWinner) sino que lo pasa y lanza el alert
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <section>
        <WinnerModal
          resetGame={resetGame}
          winner={winner}
        />
      </section>

    </main>
  )
}

export default App
