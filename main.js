const cards = document.querySelectorAll('.memory-card');
const score = document.querySelector('.score-board');
const restart = document.querySelector('.restart-game');


let cardTouched = false;
let lockBoard = false;
let firstTouched, secondTouched;
let counter = 0;


shuffle()

function flipCard(){
    // console.log(secondTouched.dataset.icon);
    if(lockBoard) return;
    if(this === firstTouched) return;

    this.classList.add('flip');
    
    if(!cardTouched){
        //first click
        cardTouched = true;
        firstTouched = this;

        return;
    }
    //second click
    cardTouched = false;
    secondTouched = this;

    check();
    
    counter++;
    score.textContent = counter;
    }
    
    function check(){
        if (firstTouched.dataset.icon === secondTouched.dataset.icon){
            offCards();
        } else{
            flipBack();
        }
    }

    function offCards(){
        firstTouched.removeEventListener('click', flipCard);
        secondTouched.removeEventListener('click', flipCard);
    }

    function flipBack(){
        lockBoard = true;

        setTimeout(() => {
            firstTouched.classList.remove('flip');
            secondTouched.classList.remove('flip');
            resetBoard();
        }, 500);
    }

    function resetBoard(){
        [cardTouched, lockBoard] = [false, false];
        [firstTouched, secondTouched] = [null, null];
    }

    function shuffle(){
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12)
            card.style.order = randomPos;
        })
    }

    function restart_game(){
        resetBoard();

        cards.forEach(card =>{
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });

        setTimeout(() => {
            shuffle();
        }, 300);

        counter = 0;
        score.textContent = 0;
    }

    
cards.forEach(card => card.addEventListener('click', flipCard));
restart.addEventListener('click', restart_game);
