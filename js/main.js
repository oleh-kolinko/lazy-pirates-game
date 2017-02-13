var level1 = [
  // 0      1      2      3      4      5      6      7
  [ null , null , null , null , null , null , null , null ],//0
  [ null , '⎾' , '==' , '==' , '==' , '⏋' , null , null ],//1
  [ null , '||' , null , '||' , null , '||' , null , null ],//2
  [ null , '||' , null , '||' , null , '||' , null , null ],//3
  [ null , '||' , null , 'h1' , null , '⎿' , '==' , 'h0' ],//4
  [ null , '⎿' , '⏋' , null , null , '||' , null , null ],//5
  [ null , null , '||' , null , null , 'h2' , null , null ],//6
  [ null , null , '||' , null , null , null , null , null ],//7
];
//st - start
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


//Test
 trains[0] = new Train(2,7);
trains[0].direction.y = -1;



railSwitches[0] = new RailSwitch(3,1,'==','⏋');
railSwitches[1] = new RailSwitch(5,4,'⎿','||');

//End Test

init();



function update(){
  trains.forEach(function(train){
    moveTrain(train);
  });

}

//Starting function
function init(){
  render(level1);//Initial rendering of level
  setInterval(update,1000); //Update every second

  //Add click events to all railRoad Switches:
  railSwitches.forEach(function (railSwitch){
    $(railSwitch.body).click(function(){
      console.log('switch click');
      railSwitch.toggleState();
      level1[railSwitch.y][railSwitch.x] = railSwitch.currentState;
      render(level1);
    });
  });

}

//Render map from matrix:
function render(level){
var htmlTile;
  level.forEach(function(row,y){
    row.forEach(function(tile,x){
      tileDOM = $('.pos'+ y + x );
      if( tile !== null ){

        if(tile2class(tile) === 'house'){  //Create House
          var newColor = tile[1]; //STRING
          if(!houses[newColor]){  //Check if that house is alredy exists
            var newHouse = new House(newColor, x , y);
            newHouse.body = tileDOM; //Give house reference to its tile
            houses[newColor] = newHouse;
          }
        }

        $(tileDOM).attr('class', 'tile pos'+ y + x);//Clear all classes
        $(tileDOM).addClass( tile2class(tile) );
      }
    });
  });
}
