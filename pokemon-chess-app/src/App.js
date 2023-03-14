import React, { useState } from "react";
import lebronJames from "./img/KJ.png";
import './App.css';
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'

function App() {
  const [chess] = useState(new Chess())
  const [fen, setFen] = useState(chess.fen());
  const [pokePositions, setPokemon] = useState(
    {
      r1:{type:null, square:'a1'}, n1:{type:null, square:'b1'}, b1:{type:null, square:'c1'}, q:{type:null, square:'d1'}, k:{type:null, square:'e1'}, b2:{type:null, square:'f1'}, n2:{type:null, square:'g1'}, r2:{type:null, square:'h1'},
      p1:{type:null, square:'a2'}, p2:{type:null, square:'b2'}, p3:{type:null, square:'c2'}, p4:{type:null, square:'d2'}, p5:{type:null, square:'e2'}, p6:{type:null, square:'f2'}, p7:{type:null, square:'g2'}, p8:{type:null, square:'h2'},
      P1:{type:null, square:'a7'}, P2:{type:null, square:'b7'}, P3:{type:null, square:'c7'}, P4:{type:null, square:'d7'}, P5:{type:null, square:'e7'}, P6:{type:null, square:'f7'}, P7:{type:null, square:'g7'}, P8:{type:null, square:'h7'},
      R1:{type:null, square:'a8'}, N1:{type:null, square:'b8'}, B1:{type:null, square:'c8'}, Q:{type:null, square:'d8'}, K:{type:null, square:'e8'}, B2:{type:null, square:'f8'}, N2:{type:null, square:'g8'}, R2:{type:null, square:'h8'},
    }
  )
  console.log(pokePositions.p1.square)

  const test = () => {
    const styles = {}
    styles[pokePositions.p1.square] = {backgroundImage: `url(${lebronJames})`, backgroundSize: "100%"}
    return styles
  }
  
  console.log(chess)
  // console.log('poke BEFORE', pokePositions)
  const handleMove = (move) => {
    let moves = chess.moves({square: move.from, verbose: true});
    moves = moves.reduce((acc, curr)=>{
      return acc.concat(curr.to)
    }, [])
    
    console.log('MOVE ATTEMPT', move)
    if(!moves.includes(move.to)) {
      return
    }

    let newState = structuredClone(pokePositions);
    console.log('MOVE', move)
    newState.p1.square = move.to
    setPokemon(newState)

    chess.move(move)
    setFen(chess.fen());
    const nextPlayerMoves = chess.moves({verbose: true})
    if (nextPlayerMoves.length === 0) console.log('CHECK MATE')
  };
  return (
    <Chessboard 
      position={fen}
      onPieceDrop={(sourceSquare, targetSquare, piece) => {
        return handleMove({
          from: sourceSquare,
          to: targetSquare,
          piece: piece,
          promotion: "q",
        })
      }}
      customSquareStyles={test()}
      // customPieces={{
      //   wP: ({ squareWidth }) => {
      //     return ( 
      //       <img
      //         style={{
      //           width: squareWidth,
      //           height: squareWidth
      //         }}
      //         src={lebronJames}
      //       />)
      //   },
      // }}
      boardWidth={400}
    />
  );
}

export default App;
