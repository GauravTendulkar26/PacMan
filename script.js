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
  let ghostIntervals = [] ;
  // start game 
  const startGame = () => {
    gameActive =  true ;
    score = 0 ;
    scoreDisplay.textContent = score ;
    gameArea.innerHTML = '<div id ="pacman" style = "left: 0; top: 0; "></div>'
    startButton.style.display = 'none';
    endButton.style.display = 'inline-block';
    document.addEventListener('keydown', movepacman);
    ghostIntervals = [] ;
    spawItem();
    spawItem();
    spawItem();
    spawGhost();
    spawGhost();
  };

    // end button and show score 
  const endGame = () => {
    ghostIntervals = [] ;
    gameActive =  false ;
    gameArea.innerHTML = '';
    startButton.style.display = 'inline-block';
    endButton.style.display = 'none';
    alert('Game Over, Your Score was '+ score);
    document.removeEventListener('keydown');

  };


  const wrapAround = (pacman, pacmanpos) => {

    let gameAreapos = gameArea.getBoundingClientRect();

    if(pacmanpos.left < 0){
      pacmanpos.left = gameAreapos.width - pacman.offsetWidth ;
    }
    else if (pacmanpos.left + pacman.offsetWidth > gameAreapos.width){
      pacmanpos.left = 0;
    }

    if (pacmanpos.top < 0) {
      pacmanpos.top = gameAreapos.height - pacman.offsetHeight;
    }
    else if (pacmanpos.top + pacman.offsetHeight > gameAreapos.height){
        pacmanpos.top = 0;
    }

    pacman.style.left = pacmanpos.left + 'px';
    pacman.style.top = pacmanpos.top + 'px' ;
  };


  // moving pacman up , down , left , right 
  const movepacman = (e) => {
    if (!gameActive) return;
    const pacman = document.getElementById('pacman');
    if(!pacman) return ;

    let stepSize = 20 ;

    let pacmanpos = {
      left: parseInt(pacman.style.left, 10),
      top: parseInt(pacman.style.top , 10)
    };

    console.log("game active", gameActive, pacman, e)
    switch (e.key) {
        case 'w':
        pacmanpos.top -= stepSize;
        break;

        case 's':
        pacmanpos.top += stepSize ;
        break;

        case 'a':
        pacmanpos.left -= stepSize;
        break;

        case 'd':
          pacmanpos.left += stepSize;
        break;
    
    }

    wrapAround(pacman , pacmanpos);
    checkItemCollsion();
    checkghostCollision();
  };


  const moveGhost = (ghost) => {
    let movehorizontal = Math.random() < 0.5 ;
    const ghostInterval = setInterval(() => {

      if(!gameActive) return ;

      let pos = ghost.getBoundingClientRect();
      let gameAreapos = gameArea.getBoundingClientRect();

      if(movehorizontal){
        ghost.style.left = (parseInt(ghost.style.left) + 2) % gameAreapos.width + 'px' ;
      }
      else {
        ghost.style.top = (parseInt(ghost.style.top) + 2) % gameAreapos.height + 'px' ;
      }

      if (pos.bottom > gameAreapos.bottom){
          ghost.style.top = '-20px' ;
      }
    } , 60);
    ghostIntervals.push(ghostInterval)
  };

  const checkItemCollsion = () => {
    const pacman = document.getElementById('pacman');
    const item = document.querySelectorAll('.item');
    
    item.forEach((item) => {
      
      if(isColliding(pacman , item)){
        item.remove();
        spawItem();
        score += 1 ;
        if (score % 4 === 0) {
          spawGhost();
        }
        scoreDisplay.textContent = score ;

      }
    });
  };

  const checkghostCollision = () => {
    const pacman = document.getElementById('pacman');
    const ghosts = document.querySelectorAll('.ghost');

    ghosts.forEach((ghost) => {
        if(isColliding(pacman , ghost)){
          endGame();
        }
    });
  };

const  isColliding = (a, b) => {
  let aReact = a.getBoundingClientRect();
  let bReact = b.getBoundingClientRect();

  return !(
    aReact.bottom < bReact.top || 
    aReact.top > bReact.bottom || 
    aReact.right < bReact.left ||
    aReact.left > bReact.right 
  );
};

    // randomly spaw eatting item and ghost 
  const spawItem = () => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.style.left = Math.random() * (gameArea.offsetWidth - 10) + 'px' ;
    item.style.top = Math.random() * (gameArea.offsetHeight - 10) + 'px' ;
    gameArea.appendChild(item);
  };

  const spawGhost = () => {
    const ghost = document.createElement('div');
    ghost.classList.add('ghost');
    ghost.style.left = Math.random() * (gameArea.offsetWidth - 20) + 'px' ;
    ghost.style.top = Math.random() * (gameArea.offsetHeight - 20) + 'px' ;
    gameArea.appendChild(ghost);
    moveGhost(ghost);
  };





  startButton.addEventListener('click', startGame);
  endButton.addEventListener('click', endGame);

});