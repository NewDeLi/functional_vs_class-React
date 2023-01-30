import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//child component of Board
const Square = ({ value, onClick }) => {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    )
}

//child component of Game
const Board = ({ squares, onClick }) => {
    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => onClick(i)} />
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}


//parent component
const Game = () => {

    //States
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
    }])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)

    //Event Handler
    const handleClick = (i) => {
        const beImmutableHistory = history.slice(0, stepNumber + 1)
        const current = beImmutableHistory[beImmutableHistory.length - 1]
        const beImmutableCurrentSquares = current.squares.slice()

        if (calculateWinner(beImmutableCurrentSquares) || beImmutableCurrentSquares[i]) {
            return;
        }
        beImmutableCurrentSquares[i] = xIsNext ? "X" : "O";
        setHistory(beImmutableHistory.concat([{
            squares: beImmutableCurrentSquares
        }]))
        setStepNumber(beImmutableHistory.length)
        setXIsNext(!xIsNext)
    }

    const jumpTo = (step) => {
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
    }


    //Variables
    const current = history[stepNumber]
    const winner = calculateWinner(current.squares)
    const moves = history.map((step, move) => {
        const desc = move ? `Go to move ${move}` : "Go to game start"
        return (
            <li>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })

    let status
    if (winner) {
        status = `Winner ${winner}`
    } else {
        status = `Next player: ${xIsNext ? "X" : "O"}`
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ==============================================================

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Game />)
