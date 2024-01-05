import { useState } from 'react';
import './style.scss'
import Board from './components/Board'
import StatusMessage from './components/StatusMessage'
import History from './components/History';
import { calculateWinner } from './winner';

const New_Game = [{squares: Array(9).fill(null), isXNext: false}]
function App() {
  const [history, setHistory] = useState(New_Game);
  const [currentMove, setCurrentMove] = useState(0);
  
  const gamingBoard = history[currentMove];
  
  //const [squares, setSquares] = useState(Array(9).fill(null));
  //const [isXNext, XisNext] = useState(false);
  
  const {winner, winningsquares} = calculateWinner(gamingBoard.squares);
  
  const handleSquareClick = (position) =>{

        if(gamingBoard.squares[position] != null || winner){
            return;
        }

        setHistory((currentHistory) => {
            const isTraversing = currentMove+1 != currentHistory.length
            const lastGamingState = isTraversing ? currentHistory[currentMove] : history[history.length-1];

            const nextSquareState =  lastGamingState.squares.map((squareValue, pos) => {
                if (position == pos){ 
                    return lastGamingState.isXNext ? 'X' : 'O';
                }
                else{
                    return squareValue;
                }
            });
            const base = isTraversing ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState)+1) : currentHistory;
            return base.concat({squares: nextSquareState, isXNext: !lastGamingState.isXNext,})
        });
       setCurrentMove( move=> move+1);

    }
    
    const moveTo = (move) => {
        setCurrentMove(move);
    }
    const onNewGameStart = () => {
            setHistory(New_Game);
            setCurrentMove(0);
    }
 
  return (
    <div className='app'> 
    <StatusMessage winner={winner} gamingBoard={gamingBoard}  />
     <Board squares={gamingBoard.squares} handleSquareClick={handleSquareClick} winningsquares={winningsquares}/>
     <button type='button' onClick={onNewGameStart} className={
        `btn-reset ${winner ? 'active' : ''}`
     }>
        Start New Game</button>
     <h2>Current Game History</h2>
     <History history={history} moveTo={moveTo}/>
     </div>
     

  );
    
  
}
 
export default App
