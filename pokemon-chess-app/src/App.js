import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import Chessboard from 'chessboardjsx'
import { Chess } from 'chess.js'


function App() {
  const [chess] = useState(
    new Chess()
  )
  const [fen, setFen] = useState(chess.fen());
  const [pokePositions, setPokemon] = useState(
    {
      a8:  null, b8:  null, c8:  null, d8:  null, e8:  null, f8:  null, g8:  null, h8:  null,
      a7:  null, b7:  null, c7:  null, d7:  null, e7:  null, f7:  null, g7:  null, h7:  null,
      a6:  null, b6:  null, c6:  null, d6:  null, e6:  null, f6:  null, g6:  null, h6:  null,
      a5:  null, b5:  null, c5:  null, d5:  null, e5:  null, f5:  null, g5:  null, h5:  null,
      a4:  null, b4:  null, c4:  null, d4:  null, e4:  null, f4:  null, g4:  null, h4:  null,
      a3:  null, b3:  null, c3:  null, d3:  null, e3:  null, f3:  null, g3:  null, h3:  null,
      a2:  null, b2:  null, c2:  null, d2:  null, e2:  null, f2:  null, g2:  null, h2:  null,
      a1:  null, b1:  null, c1:  null, d1:  null, e1:  null, f1:  null, g1:  null, h1:  null
    }
  )
  console.log(chess)
  console.log('poke BEFORE', pokePositions)
  const handleMove = (move: ShortMove) => {
    let newState = structuredClone(pokePositions);
    console.log('NEWSTATE', newState)
    let test = 'a7'
    newState[test] = 'fire'
    setPokemon(newState)

    let moves = chess.moves({square: move.from, verbose: true});
    moves = moves.reduce((acc, curr)=>{
      return acc.concat(curr.to)
    }, [])
    
    console.log('MOVE ATTEMPT', move)
    if(!moves.includes(move.to)) {
      return
    }
    chess.move(move)
    setFen(chess.fen());
    const nextPlayerMoves = chess.moves({verbose: true})
    if (nextPlayerMoves.length === 0) console.log('CHECK MATE')
  };
  return (
    <Chessboard 
      position={fen}
      onDrop={(move) =>
        handleMove({
          from: move.sourceSquare,
          to: move.targetSquare,
          promotion: "q",
        })
      }
    />
  );
}

export default App;
