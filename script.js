var scores, roundScore, activePlayer, gamePlaying;
gamePlaying = true;
init();

// Create the deck
const deck = ["2C", "2S", "2H", "2D", "3C", "3S", "3H", "3D", "4C", "4S", "4H", "4D", "5C", "5S", "5H", "5D", "6C", "6S", "6H", "6D", "7C", "7S", "7H", "7D", "8C", "8S", "8H", "8D", "9C", "9S", "9H", "9D", "10C", "10S", "10H", "10D", "JC", "JS", "JH", "JD", "QC", "QS", "QH", "QD", "KC", "KS", "KH", "KD", "AC", "AS", "AH", "AD"];
// const deck = ["two-club", "two-spade", "two-heart", "two-dia", "three-club", "three-spade", "three-heart", "three-dia"];
// Shuffle the deck
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray(deck);

// Draw cards
function drawCard() {
  if(gamePlaying) {
    // 1. Draw from the deck and remove with shift()
    var card = deck.shift();

    // 2. Display the card
    var cardDOM = document.querySelector('.card');
    cardDOM.style.display = 'block'; // card becomes visible
    cardDOM.src = 'img/' + card + '.png'; // determines card drawn

    // 3. Determine card value
    if (card == "2C" || card == "2S" || card == "2H" || card == "2D") {
      card = 2;
    } else if (card == "3C" || card == "3S" || card == "3H" || card == "3D") {
      card = 3;
    } else if (card == "4C" || card == "4S" || card == "4H" || card == "4D") {
      card = 4;
    } else if (card == "5C" || card == "5S" || card == "5H" || card == "5D") {
      card = 5;
    } else if (card == "6C" || card == "6S" || card == "6H" || card == "6D") {
      card = 6;
    } else if (card == "7C" || card == "7S" || card == "7H" || card == "7D") {
      card = 7;
    } else if (card == "8C" || card == "8S" || card == "8H" || card == "8D") {
      card = 8;
    } else if (card == "9C" || card == "9C" || card == "9H" || card == "9D") {
      card = 9;
    } else {
      card = 10;
    }

    // 4. Update the round score IF the card drawn was NOT a 4 or a 9
    if (card !== 2 && card !== 5 && card !== 9) {
      // add score
      roundScore += card;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // next player
      nextPlayer();
    }

    // if (card === 5) {
    //   // add score
    //   setTimeout(nextPlayer, 2000);
    // }
    //
    // if (card === 9) {
    //   // add score
    //   setTimeout(nextPlayer, 2000);
    // }

    // 5. If deck array runs out, replace all cards in deck ///MAYBE CHANGE THIS SO GAME ENDS AND PLAYER WITH HIGHEST DECK WINS
    if (deck.length === 0) {
      deck.push("2C", "2S", "2H", "2D", "3C", "3S", "3H", "3D", "4C", "4S", "4H", "4D", "5C", "5S", "5H", "5D", "6C", "6S", "6H", "6D", "7C", "7S", "7H", "7D", "8C", "8S", "8H", "8D", "9C", "9S", "9H", "9D", "10C", "10S", "10H", "10D", "JC", "JS", "JH", "JD", "QC", "QS", "QH", "QD", "KC", "KS", "KH", "KD", "AC", "AS", "AH", "AD");
      // deck.push("two-club", "two-spade", "two-heart", "two-dia", "three-club", "three-spade", "three-heart", "three-dia");
      shuffleArray(deck);
    }
  }
}

document.querySelector('.btn-draw').addEventListener('click', function(){
  drawCard();
});


function endTurn() {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // Check if player won the game
    if (scores[activePlayer] >= 200) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.card').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
}


document.querySelector('.btn-endturn').addEventListener('click', function() {
  endTurn();
});


function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.card').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.card').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}


// Bottom
