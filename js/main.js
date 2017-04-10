
startMenu();

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


function startMenu(){
  loadSounds();
  ion.sound.play("pirate");
  $('#game').hide();
  $('#end-screen').hide();
  $('#start-screen').hide();
  $('#start-screen').fadeIn(3000);


  // $('#start-slide-text h1, #start-slide-text p, .btn-group').hide();
  // $('#start-slide-text h1').fadeIn(1000);
  // $('#start-slide-text p:nth-child(2)').fadeIn(2000,function(){
  //   $('#start-slide-text p:nth-child(3)').fadeIn(2000,function(){
  //     $('#start-slide-text p:nth-child(4)').fadeIn(2000,function(){
  //       $('#start-slide-text .btn-group').fadeIn(2000);
  //   });
  //   });
  // });


  //Level choose

  //Difficulty buttons
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
  setInterval(update, speedUpdate); //Update boat movement every second
  setInterval(timerUpdate,1000); //Update timer

  //Add click events to all railRoad Switches:
  logs.forEach(function (railSwitch){
    $(railSwitch.body).on('click',function(){

      railSwitch.toggleState();
      currentLevel[railSwitch.y][railSwitch.x] = railSwitch.currentState;
      render(currentLevel);
    });
  });

  initPortColors();
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

  //Delete boats:
  boats = boats.filter(function(boat){
    return !(boat.finished);
  });


  //Move all boats:
  boats.forEach(function(boat){
        moveBoat(boat);
  });

  createBoats(currentLevelColors);//Create New Boats


}

function timerUpdate(){
  if(timer.time > 0){
    timer.time --; //Decrese time
    $(timer.html).html(convertSeconds2Minutes(timer.time));//Update time on DOM
  }
}

function scoreUpdate(){
  $(score.html).html(score.correct + " of " + score.total);//Update Score on DOM
  if( timer.time === 0 &&  boats.length === 0 ){
    checkForWin();
  }
}



var funcCalledcounter = 2;//temp counter for spawning boats

function createBoats(colorsAmount){
  funcCalledcounter ++ ;
  if(funcCalledcounter % (5 - difficulty) !==0   ||   timer.time === 0){
    return;
  }

  var color = Math.floor(Math.random() * (colorsAmount + 1));
  var newBoat = new Boat (start.x, start.y, color);

  rotate(newBoat, 90);//TEMPRORY (s> right start only, have to move this into moveBoat
  $(newBoat.body).css('background-image', 'url("img/boat'+ color +'.png")');
  boats.push( newBoat );

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
