console.log("This will be simon says");

let order = [];//assigns the order of the colors for the player to match
let playerOrder = [];//the player's attempt
let flash;//amount of flashes in game
let turn;//current turn
let good;//has the player done a good job
let compTurn;//tracks computer or player's turn
let intervalId;
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