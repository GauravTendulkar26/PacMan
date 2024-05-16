document.addEventListener('DOMContentLoaded', () => {
  // variable initilization

  const gameArea = document.getElementById('gameArea');
  const scoreDisplay = document.getElementById('scoreValue');
  const startButton = document.getElementById('startButton');
  const endButton = document.getElementById('endButton');

  // initial value 
  let score =  0 ;

  // Game state flag 
  let gameActive = false ;

  const startGame = () => {
    gameActive =  true ;
    score = 0 ;
    scoreDisplay.textContent = score ;
    gameArea.innerHTML = '<div id ="pacman" style = "left: 0; top: 0; "></div>'
    startButton.style.display = 'none';
    endButton.style.display = 'inline-block';
  };

  const endGame = () => {

    gameActive =  false ;
    gameArea.innerHTML = '';
    startButton.style.display = 'inline-block';
    endButton.style.display = 'none';
    alert('Game Over, Your Score was '+ score);

  };



  startButton.addEventListener('click', startGame);
  endButton.addEventListener('click', endGame);

});