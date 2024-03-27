//Model
const rulesBtn = document.querySelector('.rules-btn');
const rulesContainer = document.querySelector('.rules-container');
const cancelBtn = document.querySelector('.cancel-btn');
const moves = document.querySelectorAll('.move');
const computerMoves = ['rock', 'paper', 'scissors'];

//View
function pickMove(move){
    //Setting the new styles for the game container
    const movesContainer = document.querySelector('.moves-container');
    movesContainer.classList.add('game-result');
    movesContainer.style.backgroundImage = 'none';
    //The markup of the result of the game
    movesContainer.innerHTML = `
        <div class="your-pick">
            <h3>YOU PICKED</h3>
            <div class="${move.classList[0]} move">
                <img src="./images/icon-${move.classList[0]}.svg" alt="${move.classList[0]} move">
            </div>
        </div>
        <div class="result-container">
            
        </div>
        <div class="computer-pick">
            
        </div>
    `;
    //Generating a random number to pick the computer move
    const iterateComputerMoves = setInterval(()=>{
        const computerPick = document.querySelector('.computer-pick');
        const randomNumber = Math.floor(Math.random()*computerMoves.length);
        computerPick.innerHTML = `
            <h3>THE HOUSE PICKED</h3>
            <div class="${computerMoves[randomNumber]} move">
                <img class="computer-move" src="./images/icon-${computerMoves[randomNumber]}.svg" alt="${computerMoves[randomNumber]} move">
            </div>
        `;
    },10);
    //Pick up the move 
    setTimeout(()=>{
        clearInterval(iterateComputerMoves);
        //Get the player's move and the computer's move
        const yourMove = document.querySelector('.your-pick').lastElementChild.classList[0];
        const computerMove = document.querySelector('.computer-pick').lastElementChild.classList[0];
        //Decide the winner
        const resultContainer = document.querySelector('.result-container');
        decideWinner(yourMove,computerMove,resultContainer);

        //Replay the game
        const replayBtn = document.querySelector('.play-again');
        replayBtn.addEventListener('pointerup', ()=>{
            window.location.reload();
        });
    },1000);
}

function decideWinner(yourMove, computerMove, resultContainer){
    const player = document.querySelector('.your-pick').lastElementChild;
    const computer = document.querySelector('.computer-pick').lastElementChild;
    let scoreElement = document.getElementById('score');
    let scoreNumbered = Number(scoreElement.textContent);
    //When you pick rock
    if(yourMove === 'rock' && computerMove === 'rock'){
        resultContainer.innerHTML = `
            <h3 class="result">DRAW</h3>
            <button class="play-again">PLAY AGAIN</button>
        `;
    } if(yourMove === 'rock' && computerMove === 'paper'){
        resultContainer.innerHTML = `
            <h3 class="result">YOU LOSE</h3>
            <button class="play-again">PLAY AGAIN</button>
        `;
        computer.classList.add('winner');
    } if(yourMove === 'rock' && computerMove === 'scissors'){
        resultContainer.innerHTML = `
            <h3 class="result">YOU WIN</h3>
            <button class="play-again">PLAY AGAIN</button>
        `;
        scoreNumbered++
        scoreElement.textContent = scoreNumbered;
        saveScore();
        player.classList.add('winner');
    } if(yourMove === 'paper' && computerMove === 'rock'){ /*When you pick paper*/
        resultContainer.innerHTML = `
            <h3 class="result">YOU WIN</h3>
            <button class="play-again">PLAY AGAIN</button>
        `;
        scoreNumbered++
        scoreElement.textContent = scoreNumbered;
        saveScore();
        player.classList.add('winner');
    } if(yourMove === 'paper' && computerMove === 'paper'){
        resultContainer.innerHTML = `
            <h3 class="result">DRAW</h3>
            <button class="play-again">PLAY AGAIN</button>
        `;
    } if(yourMove === 'paper' && computerMove === 'scissors'){
        resultContainer.innerHTML = `
            <h3 class="result">YOU LOSE</h3>
            <button class="play-again">PLAY AGAIN</button>
        `;
        computer.classList.add('winner');
    }  if(yourMove === 'scissors' && computerMove === 'rock'){ /*When you pick scissors*/
    resultContainer.innerHTML = `
        <h3 class="result">YOU LOSE</h3>
        <button class="play-again">PLAY AGAIN</button>
    `;
    computer.classList.add('winner');
} if(yourMove === 'scissors' && computerMove === 'paper'){
    resultContainer.innerHTML = `
        <h3 class="result">YOU WIN</h3>
        <button class="play-again">PLAY AGAIN</button>
    `;
    scoreNumbered++
    scoreElement.textContent = scoreNumbered;
    saveScore();
    player.classList.add('winner');
} if(yourMove === 'scissors' && computerMove === 'scissors'){
    resultContainer.innerHTML = `
        <h3 class="result">DRAW</h3>
        <button class="play-again">PLAY AGAIN</button>
    `;
} 
}

function saveScore(){
    const score = document.getElementById('score');
    localStorage.setItem('score', score.textContent);
}
//Controller
rulesBtn.addEventListener('pointerup', ()=>{
    rulesContainer.classList.add('show-rules');
});

cancelBtn.addEventListener('pointerup', ()=>{
    rulesContainer.classList.remove('show-rules');
});

moves.forEach(move=>{
    move.addEventListener('pointerup', pickMove.bind(null, move));
});

//Set score 
document.getElementById('score').textContent = localStorage.getItem('score');