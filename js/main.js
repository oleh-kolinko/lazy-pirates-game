var level1 = [
  // 0      1      2      3      4      5      6      7
  [ null , null , null , null , null , null , null , null ],//0
  [ null , '⎾' , '==' , '==' , '==' , '⏋' , null , null ],//1
  [ null , '||' , null , '||' , null , '||' , null , null ],//2
  [ null , '||' , null , '||' , null , '||' , null , null ],//3
  [ null , '||' , null , null , null , '⎿' , '==' , null ],//4
  [ null , '⎿' , '⏋' , null , null , null , null , null ],//5
  [ null , null , '||' , null , null , null , null , null ],//6
  [ null , null , '||' , null , null , null , null , null ],//7
];
//st - start
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


//Test
 trains[1] = new Train();
trains[1].x = 2;
trains[1].y = 7;
updatePositionCSS(trains[1]);
trains[1].direction.y = -1;



railSwitches[0] = new RailSwitch(1,3,'==','⏋');
updatePositionCSS(railSwitches[0]);

//End Test

init();



function update(){
  trains.forEach(function(train){
    moveTrain(train);
  });

}

function init(){
  render(level1);//Initial rendering of level
  setInterval(update,1000); //Update every second

  railSwitches.forEach(function (railSwitch){
    $(railSwitch.body).click(function(){
      console.log('switch click');
      railSwitch.toggleState();
      level1[railSwitch.y][railSwitch.x] = railSwitch.currentState;
      render(level1);
    });
  });

}

function render(level){ //Render map from matrix
var htmlTile;
  level.forEach(function(row,y){
    row.forEach(function(tile,x){
      tileDOM = $('.pos'+ y + x );
      if( tile2class(tile) ){
        $(tileDOM).attr('class', 'tile pos'+ y + x);//Clear all classes
        $(tileDOM).addClass( tile2class(tile) );
      }
    });
  });
}
