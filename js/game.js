class Boat
{
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.rotation = 0;
    this.finished = false; //Reached house
    //Direction:
    //x - horizontal    1 (right)  -1 (left)
    //y - vertical      1(down)    -1(up)
     this.direction = { x : 0 , y : 0};

    //Add to DOM
    var boatHtml = '<div class="boat"></div>';
    this.body = $(boatHtml).appendTo($('#playable-area'));
    updatePositionCSS(this);
  }
}//End of class

class Log
{
  constructor(x, y, state1, state2 , logAnchor){
    this.x = x;
    this.y = y;
    this.state1 = state1;
    this.state2 = state2;
    this.currentState = state1;
    this.logAnchor = logAnchor;

    //Add to DOM
    var railSwitchHtml = '<div class="switch"> </div>';

    this.body = $(railSwitchHtml).appendTo($('#playable-area'));//Insert switch to the game
    this.log =  $('<div class="log"></div>').appendTo(this.body);//Insert log to the game
    this.circle =$('<div class="circle"></div>').appendTo(this.body);

    updatePositionCSS(this);
    offsetLog(this);
  }


  toggleState (){
    ion.sound.play("tap");
    if(this.currentState === this.state1){
      this.currentState = this.state2;

    }else{
      this.currentState = this.state1;
    }
    rotateLog(this);
    offsetLog(this);

    // $(('.pos'+ this.y + this.x)).attr('class', 'tile pos'+ this.y + this.x);//   TEMP
    // $(('.pos'+ this.y + this.x)).addClass( tile2class(this.currentState) ); //TEMP
  }

}//End of class

//HOUSE AKA PORT
class House
{
  constructor(color, x ,y) {
    this.x = x;
    this.y = y;
    this.color = color;

  }
}//End of class


/////////////////////////////////////////////////////////      BOAT MOVEMENT
function moveBoat (boat){
  //Check tile for railroad
  switch (currentLevel[boat.y][boat.x]) {
    case "||":
      boat.y += boat.direction.y;
    break;
    case "==":
      boat.x += boat.direction.x;
    break;
    case "⎿":
      if(boat.direction.x < 0 ){
        boat.direction.y = -1;//go up
        boat.direction.x = 0;
        boat.y += boat.direction.y;
        rotate(boat, 90);
      }else{
        boat.direction.y = 0;
        boat.direction.x = 1;//go right
        boat.x += boat.direction.x;
        rotate(boat, -90);
      }
    break;
    case "⏌":
      if(boat.direction.x > 0 ){
        boat.direction.y = -1; //go up
        boat.direction.x = 0;
        boat.y += boat.direction.y;
        rotate(boat, -90);
      }else{
        boat.direction.y = 0;
        boat.direction.x = -1;//go left
        boat.x += boat.direction.x;
        rotate(boat, 90);
      }
    break;
    case '⎾':
    if(boat.direction.x < 0 ){
      boat.direction.y = 1; //go down
      boat.direction.x = 0;
      boat.y += boat.direction.y;
      rotate(boat, -90);
    }else{
      boat.direction.y = 0;
      boat.direction.x = 1;//go right
      boat.x += boat.direction.x;
      rotate(boat, 90);
    }
    break;
    case '⏋':
    if(boat.direction.x > 0 ){
      boat.direction.y = 1; //go down
      boat.direction.x = 0;
      boat.y += boat.direction.y;
      rotate(boat, 90);
    }else{
      boat.direction.y = 0;
      boat.direction.x = -1;//go left
      boat.x += boat.direction.x;
      rotate(boat, -90);
    }
    break;
    case 's>':
      boat.direction.x = 1;//go right
      boat.x += boat.direction.x;
      // rotate(boat, 90);
    break;
    case '<s':
      boat.direction.x = -1;//go right
      boat.x += boat.direction.x;
    break;
  }

  //Check if boat reached house

  if(currentLevel[boat.y][boat.x].includes('h')){
    var houseNumber = parseInt(currentLevel[boat.y][boat.x][1]);
    boat.finished = true;

    setTimeout(function(){
      score.total += 1;
      if(boat.color === houseNumber){//Correct house
        score.correct += 1;
        ion.sound.play('bell');
      }
      scoreUpdate();
      $(boat.body).remove();
    },speedUpdate);

  }
  createWaterTrail(boat);


  updatePositionCSS(boat);//Move image on DOM
}
/////////////////////////////////////////////////////////////////////////     END OF BOAT MOVEMENT


///////////////////////////////////////////////////////LOG ANIMATION
function rotateLog(object){
  if(object.logAnchor === 'up-left' || object.logAnchor === 'bottom-right' ){
    if(object.currentState === object.state1){
      $(object.log).css('transform', 'rotate(0deg)');
    }else{
      $(object.log).css('transform', 'rotate(90deg)');
    }
  }
  if(object.logAnchor === 'up-right' || object.logAnchor === 'bottom-left' ){
    if(object.currentState === object.state1){
      $(object.log).css('transform', 'rotate(0deg)');
    }else{
      $(object.log).css('transform', 'rotate(-90deg)');
    }
  }
}

//Offset Log based on its rotation
function offsetLog(object){
  if(object.logAnchor === 'up-right'){
    if(object.currentState === object.state2){
      $(object.log).css('left', '32px');
      $(object.log).css('top', '0px');
    }else{
      $(object.log).css('left', '0px');
      $(object.log).css('top', '-32px');
    }
  }

  if(object.logAnchor === 'up-left'){
    if(object.currentState === object.state2){
      $(object.log).css('left', '-32px');
      $(object.log).css('top', '0px');
    }else{
      $(object.log).css('left', '0px');
      $(object.log).css('top', '-32px');
    }
  }

  if(object.logAnchor === 'bottom-right'){
    if(object.currentState === object.state2){
      $(object.log).css('left', '32px');
      $(object.log).css('top', '0px');
    }else{
      $(object.log).css('left', '0px');
      $(object.log).css('top', '32px');
    }
  }

  if(object.logAnchor === 'bottom-left'){
    if(object.currentState === object.state2){
      $(object.log).css('left', '-32px');
      $(object.log).css('top', '0px');
    }else{
      $(object.log).css('left', '0px');
      $(object.log).css('top', '32px');
    }
  }
}

/////////////////////////////////////////////////// HELPING FUNCTIONS
//Convert tile value to Class Name:
function tile2class(string){

  //Check if tile is a house:
  if(string.includes('h')){
    return 'house';
  }

  //Check if tile is a railroad:
  switch (string) {
    case "||":
    return 'vertical';
    case "==":
      return 'horizontal';
    case '⎿':
      return 'top-right';
    case '⏌':
      return 'top-left';
      case '⎾':
      return 'bottom-right';
    case '⏋':
      return 'bottom-left';
    case '<s','s>':
      return 'start';
    default:
      console.error('wrong map string ->' + string);
  }
}

//Update position on DOM:
function updatePositionCSS(object){
  $(object.body).css('top', tileSize * object.y);
  $(object.body).css('left', tileSize * object.x);
}

function convertSeconds2Minutes(sec){
  var s = sec%60;
    if( s < 10){
      s = '0' + s;
    }
  var m = parseInt(sec/60);
  return m + ':' +s;
}

function rotate(object, deg){
  object.rotation += deg;
  $(object.body).css('transform','rotate('+ object.rotation +'deg)');
}

//Create rounded bubbles after all boats
function createWaterTrail(object){
  var waterTail = '<span class="waterTail"></span>';
  waterTail = $(waterTail).appendTo(playableArea);
  $(waterTail).css('top', parseInt($(object.body).css('top'))+ 27);
  $(waterTail).css('left', parseInt($(object.body).css('left'))+ 27 );
  setTimeout(function(){ $(waterTail).remove() ;},2000);

  setTimeout(function(){
    var waterTail = '<span class="waterTail"></span>';
    waterTail = $(waterTail).appendTo(playableArea);
    $(waterTail).css('top', parseInt($(object.body).css('top'))+ 27);
    $(waterTail).css('left', parseInt($(object.body).css('left'))+ 27 );
    setTimeout(function(){ $(waterTail).remove() ;},2000);
  },speedUpdate/2);



}
