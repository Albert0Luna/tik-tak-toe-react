import {WINNER_COMBOS} from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      //* revisamos todas las combinacisones ganadoras
      //* para ver si x o u ganó
      const [a, b, c] = combo;
      if (boardToCheck[a] && //* Aqui solo veo si hay un x - o
      boardToCheck[a] === boardToCheck[b] && //* 0 y 3
      boardToCheck[b] === boardToCheck[c] ) {
        return boardToCheck[a] //* x u o
      }
    }
    //* Si no hay ganador
    return null
  }

export const checkEndGame= (newBoard) => {
    return newBoard.every((square) => square !== null)
  }