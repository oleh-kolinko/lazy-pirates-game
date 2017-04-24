//Inital funciton to start the game -> launches a starting menu
startMenu();


function startMenu(){
  loadSounds();
  ion.sound.play("pirate");
  $('#game').hide();
  $('#end-screen').hide();
  $('#start-screen').hide();
  $('#start-screen').fadeIn(3000);

  //chosing a level
  var gameStarted = false;
  $('#start-slide-text button').click(function(e){
    ion.sound.play("tap");
   var id = $(e.currentTarget).attr('id');
   if( id === 'easy-btn'){
     currentLevel = level1;
     $('#map').css('background-image','url("img/level1.png")');
     currentLevelColors = 2;
   }else if( id === 'normal-btn'){
     currentLevel = level2;
     $('#map').css('background-image','url("img/level2.png")');
     currentLevelColors = 3;
   }else{
     currentLevel = level2;
     $('#map').css('background-image','url("img/level2.png")');
      currentLevelColors = 3;
   }

   //chosing a difficulty
   var radioVal = $('#start-screen input:radio:checked').val();
   difficulty = radioVal;

   if(!gameStarted){
     gameStarted = true;
     //Start Game
     $('#start-screen').slideUp(1000);
     $('#game').fadeIn(2000);
     init();
     ion.sound.stop('pirate');

     setTimeout(function(){ion.sound.play('seasong');},10000);
     ion.sound.play("riverFull");
     ion.sound.stop('pirate');
   }
 });


   //Restart button
   $('#end-screen button').click(function(){
     ion.sound.play("tap");
     $('body').fadeOut(800);
     $('#game').slideUp(1000);
     setTimeout(function(){location.reload();},1000);

   });

}
//laod all sounds
function loadSounds () {
  ion.sound({
    sounds: [{name: "pirate", volume: 0.5},
    {name: "riverFull"},
    {name: "seasong"},
    {name: "tap"},
    {name: "bell", volume: 1.4}  ],

    path: "ionsound/sounds/",
    preload: true,
    volume: 1.0
  });
}


function createSwitches(){
  if(currentLevel === level1 ){
    logs[0] = new Log(3,1,'==','⎾', 'bottom-left');
    logs[1] = new Log(6,4,'⎾','||', 'up-right');
  }else if(currentLevel === level2 ){
    logs[0] = new Log(5,4,'==','⏋', 'bottom-right');
    logs[1] = new Log(5,8,'⏌','||', 'bottom-left');
    logs[2] = new Log(10,4,'==','⏋', 'bottom-right');

  }else if (currentLevel === level3){
    logs[0] = new Log(5,4,'==','⏋', 'bottom-right');
    logs[1] = new Log(5,8,'⏌','||', 'bottom-left');
    logs[2] = new Log(10,4,'==','⏋', 'bottom-right');

  }
}


//Starting function
function init(){

  createGrid(currentLevel);
  createSwitches();

  render(currentLevel);//Initial rendering of level

  //INIT UPDATES
  setInterval(update, speedUpdate); //Update boat movement every second
  setInterval(timerUpdate,1000); //Update timer

  //Add click events to all logs:
  logs.forEach(function (log){
    $(log.body).on('click',function(){

      log.toggleState();
      currentLevel[log.y][log.x] = log.currentState;
      render(currentLevel);
    });
  });

  initPortColors();//initialize ports with colors
}

function initPortColors(){
  var colors = ['#d62d20','#008744','#FFA700','#0057e7'];
  houses.forEach(function(house,i){
    $(house.body).css('background-image','url("img/port'+ i +'.png")');
    $(house.body).addClass('house');
  });
}


//************************************************************ ->  UPDATE

function update(){
  //Delete boats that are reached their destination:
  boats = boats.filter(function(boat){
    return !(boat.finished);
  });

  //Move all boats:
  boats.forEach(function(boat){
        moveBoat(boat);
  });

  //Generate new boats
  createBoats(currentLevelColors);//Create New Boats


}

//Update the timer
function timerUpdate(){
  if(timer.time > 0){
    timer.time --; //Decrese time
    $(timer.html).html(convertSeconds2Minutes(timer.time));//Update time on DOM
  }
}

//Update the score
function scoreUpdate(){
  $(score.html).html(score.correct + " of " + score.total);//Update Score on DOM
  if( timer.time === 0 &&  boats.length === 0 ){
    checkForWin();
  }
}



var funcCalledcounter = 2;//temp counter for spawning boats

//Generate boats
function createBoats(colorsAmount){
  funcCalledcounter ++ ; //Counter to keep track how many times function was called
  if(funcCalledcounter % (5 - difficulty) !==0   ||   timer.time === 0){
    return;
  }//Define generaiton intensity based on chosen difficulty

  var color = Math.floor(Math.random() * (colorsAmount + 1)); //Random color
  var newBoat = new Boat (start.x, start.y, color); //Create a new boat

  rotate(newBoat, 90);//TEMP(s> right start only, ~late move this into moveBoat func)
  $(newBoat.body).css('background-image', 'url("img/boat'+ color +'.png")');//assign image of boat based on color
  boats.push( newBoat );//push to global boats array

}
//***************************************************************   -> GAME Ending

var win = false;
function checkForWin(){
  if(!win){
    win = true;
    console.log('checkForWin');
    $('#end-screen').fadeIn(1000);//Show winer popup

    score.perc = Math.floor(score.correct/score.total * 100) ;//calculate score in percenateges
    var winText = 'Your Score is: ' + score.correct + ' of ' + score.total + '<br> ( ' + score.perc + '% )';
    $('#end-screen h2').html(winText); // Add a score heding to winner popup

    //Show a resulting message based on your score
    if (score.perc === 100){
      setTimeout(function(){$('#end-screen p').html('PERFECT! You play like a GOD!');},3000);
      addStars(3);
    }else if(score.perc >= 90){
      setTimeout(function(){$('#end-screen p').html('You are TRUE CAPTAIN!');},3000);
      addStars(3);
    }else if(score.perc >= 65){
      setTimeout(function(){$('#end-screen p').html('Good Job!');},3000);
      addStars(2);

    }else if(score.perc >= 50){
      setTimeout(function(){$('#end-screen p').html('Not bad, but you should try harder!');},3000);
      addStars(1);

    }else{
      $('#end-screen p').html('My grandma can do better than you');
    }
  }

}

//Final results show how many stars you earned:
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
//Creating a grid:
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
        }
      }
    });
  });
}
