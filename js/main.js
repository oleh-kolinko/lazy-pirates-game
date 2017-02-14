var level1 = [
  // 0      1      2      3      4      5      6      7
  [ null , null , null , null , null , null , null , null ],//0
  [ null , '⎾' , '==' , '==' , '==' , '⏋' , null , null ],//1
  [ null , '||' , null , '||' , null , '||' , null , null ],//2
  [ null , '||' , null , '||' , null , '||' , null , null ],//3
  [ null , '||' , null , 'h1' , null , '⎿' , '==' , 'h0' ],//4
  [ null , '⎿' , '⏋' , null , null , '||' , null , null ],//5
  [ null , null , '||' , null , null , 'h2' , null , null ],//6
  [ 's>' , '==' , '⏌' , null , null , null , null , null ],//7
];
//s>,<s - start
//h#  - house#
//vertical      ||
//horizontal    ==
//top-right     ⎿
//top-left      ⏌
//bottom-right ⎾
//bottom-left   ⏋

//GLOBAL VARIABLES:
var playableArea = $('#playable-area');
var tileSize = 64;
var trains = []; // All trains
var railSwitches = []; //All switches
var houses = []; //All houses
var start = {}; //Starting point

var timer = {
  time : 61,
  html : $('#timer-value')
};
var score = {
  correct : 0 ,
  total : 0,
  html : $('#score-value')
};

//Test
// trains[0] = new Train(0,7);
// trains[0].direction.x = 1;



railSwitches[0] = new RailSwitch(3,1,'==','⏋');
railSwitches[1] = new RailSwitch(5,4,'⎿','||');

//End Test

init();



function update(){

  //Delete trains:
  trains = trains.filter(function(train){
    return !(train.finished);
  });


  //Move all trains:
  trains.forEach(function(train){
        moveTrain(train);
  });

  createTrains(2);//Create New trains
}

function timerUpdate(){
  if(timer.time > 0){
    timer.time --; //Decrese time
    $(timer.html).html(convertSeconds2Minutes(timer.time));//Update time on DOM
  }
}
function scoreUpdate(){
  $(score.html).html(score.correct + " of " + score.total);//Update Score on DOM

}

//Starting function
function init(){
  render(level1);//Initial rendering of level
  setInterval(update,650); //Update train movement every second
  setInterval(timerUpdate,1000); //Update timer

  //Add click events to all railRoad Switches:
  railSwitches.forEach(function (railSwitch){
    $(railSwitch.body).on('click tap',function(){
      railSwitch.toggleState();
      level1[railSwitch.y][railSwitch.x] = railSwitch.currentState;
      render(level1);
    });
  });

}

var funcCalledcounter = 3;//temp
function createTrains(colorsAmount){
  funcCalledcounter ++ ;
  if(funcCalledcounter % 4 !==0   ||   timer.time === 0){
    return;
  }

  var color = Math.floor(Math.random() * (colorsAmount + 1));
  trains.push( new Train (start.x, start.y, color));

}

//Render map from matrix:
function render(level){
var htmlTile;
  level.forEach(function(row,y){
    row.forEach(function(tile,x){
      tileDOM = $('.pos'+ y + x );
      if( tile !== null ){
        var className = tile2class(tile);//Class name of current tile

        if(className === 'house'){  //Create House
          var newColor = parseInt(tile[1]);
          if(!houses[newColor]){  //Check if that house is alredy exists
            var newHouse = new House(newColor, x , y);
            newHouse.body = tileDOM; //Give house reference to its tile
            $(newHouse.body).html(newColor);
            houses[newColor] = newHouse;
          }
        }

        if(className === 'start'){
          start.x = x;
          start.y = y;
          start.body = tileDOM;
          // if(tile === 's>'){
          //   start.direction = 1;//Start to the right
          // } else{
          //   start.direction = -1;//Start to the left
          // }
        }

        $(tileDOM).attr('class', 'tile pos'+ y + x);//Clear all classes
        $(tileDOM).addClass( tile2class(tile) );
      }
    });
  });
}
