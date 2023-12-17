export default function GameOver({winner, restartClick}){

    let winnerContent = <p>It's a draw</p>
    if(winner){
        winnerContent = <p>{winner} won's</p>
    }
    return <div id="game-over">
        <h2>Game Over!</h2>
        {winnerContent}
        <p><button onClick={restartClick}>Rematch</button></p>
    </div>
}