
//Variables
var playerCounter = 0;
var dealerCounter = 0;
var playerArr = [];
var dealerArr = [];

const $playerCounter = $("#playerCounter");
const $dealerCounter = $("#dealerCounter");
const $result = $("#message");
const $hit = $("#hit");
const $stand = $("#stand");
const $start = $("#start");
const $restart = $("#restart");

const dealerCards = document.getElementById('dealerCards');
const playerCards = document.getElementById('playerCards');

var stackNumber = 0;

//Card Array of Objects
const cardArrObj = [
  {name: 'C2',
   value: 2 },
  {name : 'D2',
   value: 2},
   {name : 'H2',
   value: 2},
   {name : 'S2',
   value: 2},
   {name : 'C3',
   value: 3},
   {name : 'D3',
   value: 3},
   {name : 'H3',
   value: 3},
   {name : 'S3',
   value: 3},
   {name : 'C4',
   value: 4},
   {name : 'D4',
   value: 4},
   {name : 'H4',
   value: 4},
   {name : 'S4',
   value: 4},
   {name : 'C5',
   value: 5},
   {name : 'D5',
   value: 5},
   {name : 'H5',
   value: 5},
   {name : 'S5',
   value: 5},
   {name : 'C6',
   value: 6},
   {name : 'D6',
   value: 6},
   {name : 'H6',
   value: 6},
   {name : 'S6',
   value: 6},
    {name : 'C7',
   value: 7},
   {name : 'D7',
   value: 7},
   {name : 'H7',
   value: 7},
    {name : 'S7',
   value: 7},
   {name : 'C8',
   value: 8},
   {name : 'D8',
   value: 8},
    {name : 'H8',
   value: 8},
   {name : 'S8',
   value: 8},
   {name : 'C9',
   value: 9},
    {name : 'D9',
   value: 9},
   {name : 'H9',
   value: 9},
   {name : 'S9',
   value: 9},
    {name : 'C10',
   value: 10},
   {name : 'D10',
   value: 10},
   {name : 'H10',
   value: 10},
    {name : 'S10',
   value: 10},
   {name : 'JC',
   value: 10},
   {name : 'JD',
   value: 10},
    {name : 'JH',
   value: 10},
   {name : 'JS',
   value: 10},
   {name : 'QC',
   value: 10},
   {name : 'QD',
   value: 10},
   {name : 'QH',
   value: 10},
   {name : 'QS',
   value: 10},
    {name : 'KC',
   value: 10},
   {name : 'KD',
   value: 10},
   {name : 'KH',
   value: 10},
   {name : 'KS',
   value: 10},
   {name : 'AC',
   value: 11},
    {name : 'AD',
   value: 11},
   {name : 'AH',
   value: 11},
   {name : 'AS',
   value: 11},
 ]

//FUNCTIONS

/*Function that assigns the desired value to stackNumber based on input in dropdown menu.*/
function getSelectedValue() {
  stackNumber = document.getElementById('stackNum').value;
}

/*Function that recalculates counter of both player and dealer when called.*/
function counterCalculate (){
  playerCounter = 0;
  for(var i = 0; i < playerArr.length; i++){
    playerCounter += playerArr[i].value;
  }

  dealerCounter = 0;
  for(var y = 0; y < dealerArr.length; y++){
    dealerCounter += dealerArr[y].value;
  }
}

/*Function that checks if there are As in the game and changes their value from
11 to 1 depending on the general counter.*/
function checkAs (){
  for (var x = 0; x < playerArr.length; x++){
      if(playerArr[x].value == 11 && playerCounter > 21){
        playerArr[x].value = 1;
        counterCalculate();
    }
  }
  for (var z = 0; z < dealerArr.length; z++){
       if(dealerArr[z].value == 11 && dealerCounter > 21){
         dealerArr[z].value = 1;
         counterCalculate();
    }
  }
}

/*Function that gets a random card and checks if it can be played based on the
number of stacks in the game.*/
function getRandomCard (){
 var randomCard = cardArrObj[Math.floor(Math.random() * 52)];
 var cardTimesInBothArr = 0;

 for (var x = 0; x < playerArr.length; x++){
     if(playerArr[x].name == randomCard.name){
      cardTimesInBothArr++;
      if(cardTimesInBothArr >= stackNumber){
        getRandomCard();
      }
   }
 }

 for (var z = 0; z < dealerArr.length; z++){
      if(dealerArr[z].name == randomCard.name){
        cardTimesInBothArr++;
         if(cardTimesInBothArr >= stackNumber){
           getRandomCard();
      }
    }
  }

 return randomCard;
}

/*Actions to do when start button is pressed, added to the ones already inside of
the jQuery event caller in main(); .*/
function start (){
   getSelectedValue();

   playerArr.push(getRandomCard());
   playerArr.push(getRandomCard());
   dealerArr.push(getRandomCard());
   counterCalculate(); //possible change of value over 21 with As
   checkAs();          //possible bug with changing value to 1 with As
   counterCalculate();
   playerCards.innerHTML = `<img src = "cards/${playerArr[0].name}.png" width = 100px/>
                            <img src = "cards/${playerArr[1].name}.png" width = 100px/>`;
   dealerCards.innerHTML = `<img src = "cards/${dealerArr[0].name}.png" width = 100px/>`;
}

function restart (){
  playerCounter = 0;
  dealerCounter = 0;
  playerArr = [];
  dealerArr = [];
  playerCards.innerHTML = '';
  dealerCards.innerHTML = '' ;
}

function hit (){
  playerArr.push(getRandomCard());
  counterCalculate();
  checkAs();
  counterCalculate();
  playerCards.innerHTML += `<img src = "cards/${playerArr[playerArr.length - 1].name}.png" width = 100px/>`;
}

function stand (){

   while(dealerCounter < 17){
     dealerArr.push(getRandomCard());
     counterCalculate();
     checkAs();
     counterCalculate();
     dealerCards.innerHTML += `<img src = "cards/${dealerArr[dealerArr.length - 1].name}.png" width = 100px/>`;
   }

   $playerCounter.html(playerCounter);
   $dealerCounter.html(dealerCounter);

   if(playerCounter == 21 && playerArr.length == 2 && dealerCounter < 21){
         $result.html('Blackjack! You win! Restart game.');
         $restart.css('background-color', 'green');

   }else if(dealerCounter == 21 && playerCounter == 21){
    //Check for Blackjack
     if(dealerArr.length = 2){
        if(playerArr.length = 2){
          $result.html('Blackjack tie!');
          $restart.css('background-color', 'green');

        }else if(playerArr.length > 2){
          $result.html('Blackjack! Dealer wins. Restart game.');
          $restart.css('background-color', 'green');

        }else{
          $result.html('Tie with 21!');
          $restart.css('background-color', 'green');
      }
    }
   }else if(dealerCounter > 21){
     $result.html('You win!! Restart game.');
     $restart.css('background-color', 'green');

   }else if(playerCounter == 21 && playerArr.length !== 2 && dealerCounter < 21){
     $result.html('You win!! Restart game.');
     $restart.css('background-color', 'green');

   }

   if(playerCounter < 21 && dealerCounter <= 21){
     if(playerCounter == dealerCounter){
       $result.html('Tie. Restart the game.');
       $restart.css('background-color', 'green');

     }else if(playerCounter < dealerCounter){
       $result.html('You lose. Restart game!');
       $restart.css('background-color', 'green');

     }else if(playerCounter > dealerCounter){
       $result.html('You win!! Restart game.');
       $restart.css('background-color', 'green');
     }
   }
}


function main (){
  $start.css('background-color', 'green');

  $start.on('click', function () {
    start();
    $playerCounter.html(playerCounter);
    $dealerCounter.html(dealerCounter);

     if(playerCounter == 21){
       $result.html('Blackjack!');
         stand();

    }else if(playerCounter < 21){
       $result.html('Hit or Stand');
    }
})

  $restart.on('click', function () {
    restart();
    $playerCounter.html(playerCounter);
    $dealerCounter.html(dealerCounter);
    $result.html('Wanna play again?');
    $start.css('background-color', 'green');
})


  $hit.on('click', function () {

    hit();
    $playerCounter.html(playerCounter);
    $dealerCounter.html(dealerCounter);
    if(playerCounter == 21){
      $result.html('Stand and let dealer play.');
    }
    if(playerCounter > 21){
      $result.html('You lose. Restart game!');
      $restart.css('background-color', 'green');
    }
    if(playerCounter < 21){
      $result.html('Hit or Stand');
    }
  })

  $stand.on('click', function () {
     stand();
    })

//Responsive buttons.
  $start.hover(
    function (){
    $(this).css('background-color', 'gold');
  },
    function(){
      $(this).css('background-color', 'black');
    })

  $restart.hover(
    function (){
      $(this).css('background-color', 'gold');
    },
    function(){
      $(this).css('background-color', 'black');
    })

  $hit.hover(
    function (){
      $(this).css('background-color', 'green');
    },
    function(){
      $(this).css('background-color', 'black');
    })

  $stand.hover(
    function (){
      $(this).css('background-color', 'green');
    },
    function(){
      $(this).css('background-color', 'black');
    })
}

main();
