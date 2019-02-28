 /*
 * Create a list that holds all of your cards
 */
//const cards = [...document.querySelectorAll('.deck li')];
const cards = document.querySelectorAll('.deck li');


//Varibles
let clicksPlayed = 0;
let cardsPlayed = [];
let cardsMatch = [];


//const deck = document.querySelector(".deck");
const gameMoves = document.querySelectorAll('.moves');

const star = document.querySelector('.stars');
const firstStar = star.children;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
const deck = document.querySelector(".deck");

function initGame() {
    //Reset cards flip back over
    for (i in cardsMatch) {
            cardsMatch[i].classList.remove('open', 'show', 'match');
    }
    cardsMatch = [];
    for (i in cardsPlayed) {
        cardsPlayed[i].classList.remove('open', 'show');
    }
    cardsPlayed = [];
    //restore Starsback to three
    firstStar[0].style.visibility = "visible";
    firstStar[1].style.visibility = "visible";

    //shuffle deck
    const shuffleCards = shuffle(cards);
    for (let i = 0; i < shuffleCards.length; i++) {
        [].forEach.call(shuffleCards, function(item){
            deck.appendChild(item);
            clicksPlayed = 0;
            gameMoves[0].textContent = clicksPlayed;
    });
}
    //Reset timers back to 0
    let sec = 0, min = 0, hr = 0;
    gameTime[0].innerHTML = "0:0:0";
    //Stop timer
    clearInterval(stClock);
    //cards.addEventListener('click', flipCard);
    cards.forEach(card => card.addEventListener('click', flipCard));
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function flipCard(card) {
    console.log(this);
    //setCounter();
    this.classList.add('open', 'show');
    cardsPlayed.push(this);
    cardPlay(card);
}

function cardPlay () {
    if (cardsPlayed.length < 2) {
        console.log('Pick another');
        setCounter();
    } else {
        //cards.removeEventListener('click', flipCard);
        cards.forEach(card => card.removeEventListener('click', flipCard));
        setTimeout(compareCards, 500);
    }
}

function setCounter() {
    clockStart();
    clicksPlayed ++;
    gameMoves[0].textContent = clicksPlayed;
    starRating();
};

// Clock Timer Code
let stClock;
let sec = 0, min = 0, hr = 0;
const gameTime = document.querySelectorAll('.time');
function clockStart() {
        if (clicksPlayed === 1){
        stClock = setInterval(function(){
        gameTime[0].innerHTML = hr+":"+min+":"+sec+"";
        sec++;
            if(sec == 60){
                min++;
                sec = 0;
            };
            if(min == 60){
                hr++;
                min = 0;
            };
        },1000);
    };
}

//Compare flipped cards
function compareCards() {
    if (cardsPlayed[0].firstElementChild.className === cardsPlayed[1].firstElementChild.className) {
        console.log('Match');
        for (i in cardsPlayed) {
            cardsPlayed[i].classList.add('match');
            cardsMatch.push(cardsPlayed[i]);
        };
        cardsPlayed = [];
        if (cardsMatch.length === 16) {
            console.log(stClock);
            clearInterval(stClock);
            toggleModal();
        }
    } else {
        window.setTimeout(window.alaert, 3000, 'Try again');
        for (i in cardsPlayed) {
            cardsPlayed[i].classList.remove('open', 'show');
        }
        cardsPlayed = [];
    };
    //cards.addEventListener('click', flipCard);
    cards.forEach(card => card.addEventListener('click', flipCard));
}

//Star rating
function starRating() {
    //const star = document.querySelector('.stars');
    //const firstStar = star.children;
    if (clicksPlayed === 10) {
        console.log(star);
        firstStar[0].style.visibility = "collapse";
        //star.removeChild(firstStar);
    } else if (clicksPlayed === 16){
        console.log('Horrible');
        firstStar[1].style.visibility = "collapse";
    };
}

//On page load run initGame();
windowOnLoad = initGame();

// Code for modal
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    //cards.remove.EventListener('click', flipCard);
    cards.forEach(card => card.removeEventListener('click', flipCard));
    gameMoves[1].textContent = clicksPlayed;
    gameTime[1].innerHTML = hr+":"+min+":"+sec+"";;
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

modal.addEventListener("click", toggleModal);
//closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


