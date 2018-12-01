/*
Game function:
-player must guess a number between a min and max
-player gets a certain number of guesses
-notify player of guesses remaining
-notify the player of the they lose
-let player choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});
//Listen for guess
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    //Check if won
    if(guess === winningNum){
        //Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    }else{
        //Wrong number
        guessesLeft -= 1;
        if(guessesLeft === 0){
            //Game over lost
            gameOver(false, `${winningNum} is correct, YOU WIN!`);
        }else{
            
            //Game Continues - answer wrong
            //Change border color
            guessInput.style.borderColor = 'red';
            //clear input
            guessInput.value = '';
            //Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');
        }
    }
});
//Game over
function gameOver(won,msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disable Input
    guessInput.disabled = true;
    //Change border color
    guessInput.style.borderColor = color;
    //set text color
    message.style.color = color;
    //Set message
    setMessage(msg);
    //Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}
//Get winning num
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max-min + 1) + min);
}
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}