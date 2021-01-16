document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const score = document.querySelector('#result');
  var currentMyIndex = 202;
  var currentInvaderIndex = 0;
  var direction = 1;
  var invaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                  15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                  30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
  var deadInvaders = [];
  var result = 0;
  invaders.forEach(i => { squares[currentInvaderIndex+i].classList.add('invaders'); });
  squares[currentMyIndex].classList.add('me');

  function moveMe(e){
    squares[currentMyIndex].classList.remove('me');
    switch (e.keyCode) {
      case 37:
        if(currentMyIndex % 15 > 0){
          currentMyIndex--;
        }
        break;
      case 39:
        if(currentMyIndex % 15 !== 14){
          currentMyIndex++;
        }
        break;
    }
    squares[currentMyIndex].classList.add('me');
  }
  document.addEventListener('keydown', moveMe);

  function moveInvaders(){
    const leftIndex = invaders[0]%15===0;
    const rightIndex = invaders[invaders.length-1]%15===14;

    if((leftIndex&&direction===-1)||(rightIndex&&direction===1)){
        direction=15;
    }else if(direction===15){
      if(leftIndex){
        direction=1;
      }else{
        direction=-1;
      }
    }

    for(var i=0; i<invaders.length; i++){
      squares[invaders[i]].classList.remove('invaders');
    }
    for(var i=0; i<invaders.length; i++){
      invaders[i]+=direction;
    }
    for(var i=0; i<invaders.length; i++){
      if(!deadInvaders.includes(i)){
        squares[invaders[i]].classList.add('invaders');
      }
    }

    //졌을 때
    //1. 내가 invaders와 부딪혔을 때
    if(squares[currentMyIndex].classList.contains('invaders')){
      clearInterval(timer);
      squares[currentMyIndex].classList.add('boom');
      alert('You Lose ;)');
    }
    //2. 바닥과 invaders가 부딪혔을 때
    for(i=0; i<invaders.length-1; i++){
      if(invaders[i]>squares.length-14){
        clearInterval(timer);
        squares[currentMyIndex].classList.add('boom');
        alert('You Lose ;)');
      }
    }
    //이겼을 때-다 없앴을 때
    if(deadInvaders.length===30){
      clearInterval(timer);
      alert('You Win :)')
    }
  }
  var timer = setInterval(moveInvaders, 800);

  function shoot(){
    var laserId;
    var currentLaserIndex = currentMyIndex;

    function moveLaser(){
      //레이저 위로 이동
      if(squares[currentLaserIndex].classList.contains('laser')){
        squares[currentLaserIndex].classList.remove('laser');
      }
      currentLaserIndex-=15;
      squares[currentLaserIndex].classList.add('laser');
      //레이저가 invader에 맞았을 때
      if(squares[currentLaserIndex].classList.contains('invaders')){
        squares[currentLaserIndex].classList.remove('laser');
        squares[currentLaserIndex].classList.remove('invaders');
        squares[currentLaserIndex].classList.add('boom');
        setTimeout(()=>squares[currentLaserIndex].classList.remove('boom'), 250);
        clearInterval(laserId);

        var deadInvader = invaders.indexOf(currentLaserIndex);
        deadInvaders.push(deadInvader);
        result++;
        score.innerHTML = result;
      }
    }
    switch (event.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100);
        break;
    }
  }
  document.addEventListener('keydown', shoot);
});
