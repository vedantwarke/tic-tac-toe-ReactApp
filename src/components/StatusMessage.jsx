const StatusMessage = ({winner, gamingBoard}) => {
    const {squares, isXNext} =gamingBoard;
    const msg = isXNext ? "X" : "O";
    const noMovesLeft = squares.every(squareValue => squareValue != null); 
    console.log(winner)
    const message = winner ? `Winner is ${winner}` : `Next Player is ${msg}`;
    return (
        <div className="status-message"> 
            {winner && <div>Winner is {winner}</div>}
            {!winner && noMovesLeft && <div> <span className="text-green">X</span> and <span className="text-orange">O</span> Tied the Game </div>}
            {!winner && !noMovesLeft && <div>Next Player is <span className={isXNext ? 'text-green' : 'text-orange'}>{msg}</span> </div>}


        </div>
    )
}
export default StatusMessage; 