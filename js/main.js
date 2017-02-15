
startMenu();

function startMenu(){
  $('#game').fadeOut(0);

  // $('#start-slide-text h1, #start-slide-text p, .btn-group').hide();
  // $('#start-slide-text h1').fadeIn(1000);
  // $('#start-slide-text p:nth-child(2)').fadeIn(2000,function(){
  //   $('#start-slide-text p:nth-child(3)').fadeIn(2000,function(){
  //     $('#start-slide-text p:nth-child(4)').fadeIn(2000,function(){
  //       $('#start-slide-text .btn-group').fadeIn(2000);
  //   });
  //   });
  // });

 $('#start-slide-text button').click(function(e){
   var id = $(e.currentTarget).attr('id');
   if( id === 'easy-btn'){
     currentLevel = level1;
   }else if( id === 'normal-btn'){
     currentLevel = level1;
   }else{
     currentLevel = level1;
   }

   $('#start-screen').slideUp(1000);
   $('#game').fadeIn(2000);
   init();
 });

}

//Test


railSwitches[0] = new RailSwitch(3,1,'==','⎾');
railSwitches[1] = new RailSwitch(6,4,'||','⎾');


//End Test


//Starting function
function init(){
  createGrid(level1);


  render(level1);//Initial rendering of level
  setInterval(update,750); //Update train movement every second
  setInterval(timerUpdate,1000); //Update timer

  //Add click events to all railRoad Switches:
  railSwitches.forEach(function (railSwitch){
    $(railSwitch.body).on('click',function(){
      railSwitch.toggleState();
      level1[railSwitch.y][railSwitch.x] = railSwitch.currentState;
      render(level1);
    });
  });

  initPortColors();
}

function initPortColors(){
  var colors = ['#d62d20','#008744','#FFA700'];
  houses.forEach(function(house,i){
    $(house.body).css('background-color',colors[i]);
  });
}


//************************************************************ ->  UPDATE
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



var funcCalledcounter = 3;//temp
function createTrains(colorsAmount){
  funcCalledcounter ++ ;
  if(funcCalledcounter % 4 !==0   ||   timer.time === 0){
    return;
  }

  var color = Math.floor(Math.random() * (colorsAmount + 1));
  var newTrain = new Train (start.x, start.y, color);
  $(newTrain.body).css('background-image', 'url("img/boat'+ color +'.png")');
  trains.push( newTrain );

}

//************************************************************ ->  RENDER GRID

function createGrid(level){
  var tileHtml = '';

  level.forEach(function(row, y){
    row.forEach(function(tile, x){
       tileHtml = '<div class="tile pos'+y+x+'"></div>';
       $(playableArea).append(tileHtml);
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
        var className = tile2class(tile);//Class name of current tile

        if(className === 'house'){  //Create House
          var newColor = parseInt(tile[1]);
          if(!houses[newColor]){  //Check if that house is alredy exists
            var newHouse = new House(newColor, x , y);
            newHouse.body = tileDOM; //Give house reference to its tile
            houses[newColor] = newHouse; // push into array
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

        // $(tileDOM).attr('class', 'tile pos'+ y + x);//Clear all classes
        // $(tileDOM).addClass( tile2class(tile) );
      }
    });
  });
}
