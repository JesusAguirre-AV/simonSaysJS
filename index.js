console.log("This will be simon says");

let order = [];//assigns the order of the colors for the player to match
let playerOrder = [];//the player's attempt
let flash;//amount of flashes in game
let turn;//current turn
let good;//has the player done a good job
let compTurn;//tracks computer or player's turn
let intervalId;//Used to track the timing of the lights flashing
let strict=false;//is strict mode on
let noise=true;//is noise mode on
let on=false;//is the game actually turned on
let win;// did the player win

const turnCounter = document.querySelector("#turn");//passes the html element turn, same for the others
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('change', (event) => { //toggles strict mode
    if (strictButton.checked == true){
        strict=true;
    }else{
        strict=false;
    }
});

onButton.addEventListener('click', (event) => { // Once the button is turned on, it sets the display and reads on. If off it resets things.
    if (onButton.checked==true){
        on=true;
        turnCounter.innerHTML = "-"; //Calls the turn counter and sets its HTML to just that line
    } else {
        on=false;
        turnCounter.innerHTML = "";
        clearColor(); //basically resets colors
        clearInterval(intervalId);//stops the flashing lights
    }
});

startButton.addEventListener('click', (event) => { //actually starts the game
    if(on || win){
        play(); //if the game is on or there is a win then the start button just starts the game
    }
});

function play(){
    // first we reset the game.
    win=false;
    order=[];
    playerOrder=[];
    flash=0;
    intervalId=0;
    turn=1;
    turnCounter.innerHTML=1;
    good=true;
    
    //not that the game is set, we need to start the order of colors (loop for 20 rounds)
    for(var i=0; i< 20; i++){
        order.push(Math.floor(Math.random()*4)+1);// including a new value to the order of colors. Floor makes it a whole number and the rest in the math is to make it 1-4
    }
    compTurn=true;

    intervalId = setInterval(gameTurn, 800); //set interval runs the game turn every 800 milseconds to get the flash timing
}

function gameTurn(){
    on=false;//to prevent the player from clicking the buttons

    if (flash == turn){//because the lights flash matching the turn#, it stops once it reaches that turn
        clearInterval(intervalId);//players turn, lights don't need to flash unless they are pressed, we also set the relevant information
        compTurn=false;
        clearColor();
        on=true;
    }

    if(compTurn){
        clearColor();
        setTimeout(() => {
            //during computer's turn, what colors should it flash based on the order?
            if(order[flash]==1) one();
            if(order[flash]==2) two();
            if(order[flash]==3) three();
            if(order[flash]==4) four();
            flash++;//ofcourse we go to the next itteration
        }, 200);//holds function for some milliseconds
    }
}

function one(){
    if(noise){//because we gave audio from the HTML
        let audio=document.getElementById("clip1");
        audio.play();
    }
    noise=true;
    topLeft.style.backgroundColor="lightgreen";//makes the topleft flash (from darkgreen to lightgreen)
}
function two(){
    if(noise){
        let audio=document.getElementById("clip2");
        audio.play();
    }
    noise=true;
    topRight.style.backgroundColor="tomato";
}function three(){
    if(noise){
        let audio=document.getElementById("clip3");
        audio.play();
    }
    noise=true;
    bottomLeft.style.backgroundColor="yellow";
}function four(){
    if(noise){
        let audio=document.getElementById("clip4");
        audio.play();
    }
    noise=true;
    bottomRight.style.backgroundColor="lightskyblue";
}

function clearColor(){//reinitializing colors
    topLeft.style.backgroundColor="darkgreen"
    topRight.style.backgroundColor="darkred"
    bottomLeft.style.backgroundColor="goldenrod"
    bottomRight.style.backgroundColor="darkblue"
}
function flashColor(){//reinitializing colors
    topLeft.style.backgroundColor="lightgreen"
    topRight.style.backgroundColor="tomato"
    bottomLeft.style.backgroundColor="yellow"
    bottomRight.style.backgroundColor="lightskyblue"
}

/// Player Event listeners
topLeft.addEventListener('click', (event) => {
    if(on){
        playerOrder.push(1);//adds this to the list of the players orders and checks for accuracy
        check();
        one();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
topRight.addEventListener('click', (event) => {
    if(on){
        playerOrder.push(2);
        check();
        two();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
bottomLeft.addEventListener('click', (event) => {
    if(on){
        playerOrder.push(3);
        check();
        three();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
bottomRight.addEventListener('click', (event) => {
    if(on){
        playerOrder.push(4);
        check();
        four();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

function check(){
    //we only really need to look at the last c=value that the player clicked since it is compared after every addition
    if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) good=false;//not same, bad play

    if(playerOrder.length == 20 && good){//this is the win condition
        winGame();
    }

    if(!good){//how we handle the players mistakes,can depend on strict mode
        flashColor();
        turnCounter.innerHTML="NO!";
        setTimeout(() => {
            turnCounter.innerHTML=turn;
            clearColor();

            if(strict){//resetting the game on strict
                play();
            }else{//otherwise we just reset the turn
                compTurn=true;
                flash=0;
                playerOrder=[];
                good=true;
                intervalId=setInterval(gameTurn, 800);
            }
        }, 800);

        noise=false;
    }
    //turn went well but the game isn't over then we make a new round
    if(turn==playerOrder.length && good && !win){
        turn++;
        playerOrder=[];
        compTurn=true;
        flash=0;
        turnCounter.innerHTML=turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame(){
    flashColor();
    turnCounter.innerHTML = "WIN!"
    on=false;
    win=true;
}