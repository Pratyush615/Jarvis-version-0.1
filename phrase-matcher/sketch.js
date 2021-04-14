//////////////////////////Speech Recognition Variables
var hr;
var mn;
var M;
var fillIn;
var fillIn2;
var JARVIS;
var date = '4-3';
var currentTime;
var speechStorage = [];
//////////////////////////Speech vocalization variables
var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];
////////////////////////////////
function preload(){
jarvisImage = loadImage("images/jarvis.gif");
}
function setup(){
createCanvas(windowWidth,windowHeight);
//JARVIS = createSprite(335,200,20,20);
//JARVIS.addImage(jarvisImage);
//jarvisImage.position(200,200);

}
function draw(){
background("black");
 hr = hour();
 mn = minute();
 sc = second();
 if(hr%12 < 1){
    M = "AM"
  }
  else{
    M = "PM"
  }
  if(mn > 9){
    fillIn = ''
  }
  else{
    fillIn = 0;
  }  

 
 // getDate();

  async function getDate() {
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/New_york");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var date = datetime.slice(0,9);

    fill("white")
    textSize(18);
    text(date,10,150);


}


  
fill("white")
textSize(18);
//text(date,10,150);



if(hr%12 <= 1){
   fillIn2 = 12;

}
else{
  fillIn2 = ' ';
}
    fill("white");
    textSize(18);
    currentTime = hr%12+":"+fillIn+mn+" "+M;
    text(currentTime,10,50);


    if(mouseIsPressed){
      console.log(mouseX)
      console.log(mouseY)
    }
  drawSprites();
}