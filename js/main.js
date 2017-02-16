
startMenu();

function startMenu(){
  $('#game').hide();
  $('#end-screen').hide();
  $('#start-screen').hide();
  $('#start-screen').fadeIn(1000);


  // $('#start-slide-text h1, #start-slide-text p, .btn-group').hide();
  // $('#start-slide-text h1').fadeIn(1000);
  // $('#start-slide-text p:nth-child(2)').fadeIn(2000,function(){
  //   $('#start-slide-text p:nth-child(3)').fadeIn(2000,function(){
  //     $('#start-slide-text p:nth-child(4)').fadeIn(2000,function(){
  //       $('#start-slide-text .btn-group').fadeIn(2000);
  //   });
  //   });
  // });

  //Difficulty buttons
  $('#start-slide-text button').click(function(e){
   var id = $(e.currentTarget).attr('id');
   if( id === 'easy-btn'){
     currentLevel = level1;
   }else if( id === 'normal-btn'){
     currentLevel = level1;
   }else{
     currentLevel = level1;
   }

   //Restart button
   $('#end-screen button').click(function(){
     $('#end-screen').fadeOut(800);
     $('#game').slideUp(1000);
     setTimeout(function(){location.reload();},1000);

   });

   //Start Game
   $('#start-screen').slideUp(1000);
   $('#game').fadeIn(2000);
   init();
 });

}

//Test


railSwitches[0] = new RailSwitch(3,1,'==','⎾', 'bottom-left');
railSwitches[1] = new RailSwitch(6,4,'⎾','||', 'up-right');


//End Test


//Starting function
function init(){

  createGrid(level1);


  render(level1);//Initial rendering of level
  setInterval(update, speedUpdate); //Update train movement every second
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
        moveBoat(train);
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
  if( timer.time === 0 &&  trains.length === 0 ){
    checkForWin();
  }
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
//***************************************************************   -> GAME Ending

var win = false;
function checkForWin(){
  if(!win){
    win = true;
    console.log('checkForWin');
    $('#end-screen').fadeIn(1000);//Show win popup

    score.perc = Math.floor(score.correct/score.total * 100) ;
    var winText = 'Your Score is: ' + score.correct + ' of ' + score.total + '<br> ( ' + score.perc + '% )';
    $('#end-screen h2').html(winText);

    if (score.perc === 100){
      setTimeout(function(){$('#end-screen p').html('PERFECT! You play like a GOD!');},3000);
      addStars(3);
    }else if(score.perc >= 90){
      setTimeout(function(){$('#end-screen p').html('You are MASTER!');},3000);
      addStars(3);
    }else if(score.perc >= 65){
      setTimeout(function(){$('#end-screen p').html('Good Job!');},3000);
      addStars(2);

    }else if(score.perc >= 50){
      setTimeout(function(){$('#end-screen p').html('Not bad, but you should try harder!');},3000);
      addStars(1);

    }else{
      $('#end-screen p').html('Are you still playing?');
    }
  }

}

function addStars(count){
 if(count > 0){
   setTimeout(function(){$('#end-screen .glyphicon:nth-child('+ 2 +')').addClass('star-active');},1000);
 }
 if(count > 1){
   setTimeout(function(){$('#end-screen .glyphicon:nth-child('+ 3 +')').addClass('star-active');},2000);
 }
 if(count > 2){
   setTimeout(function(){$('#end-screen .glyphicon:nth-child('+ 4 +')').addClass('star-active');},3000);
 }
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
