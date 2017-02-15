class Train
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
    var trainHtml = '<div class="train"></div>';
    this.body = $(trainHtml).appendTo($('#playable-area'));
    updatePositionCSS(this);
  }
}//End of class

class RailSwitch
{
  constructor(x, y, state1, state2){
    this.x = x;
    this.y = y;
    this.state1 = state1;
    this.state2 = state2;
    this.currentState = state1;


    //Add to DOM
    var railSwitchHtml = '<div class="switch"></div>';
    this.body = $(railSwitchHtml).appendTo($('#playable-area'));
    updatePositionCSS(this);
  }


  toggleState (){
    if(this.currentState === this.state1){
      this.currentState = this.state2;

      console.log($('.pos'+ this.y + this.x));
      console.log(tile2class(this.currentState));

    }else{
      this.currentState = this.state1;

    }
    
    $(('.pos'+ this.y + this.x)).attr('class', 'tile pos'+ this.y + this.x);//   TEMP
    $(('.pos'+ this.y + this.x)).addClass( tile2class(this.currentState) ); //TEMP
  }

}//End of class

class House {
  constructor(color, x ,y) {
    this.x = x;
    this.y = y;
    this.color = color;

  }
}//End of class
function rotate(object, deg){
  object.rotation += deg;
  $(object.body).css('transform','rotate('+ object.rotation +'deg)');
}

function moveTrain (train){
  var currentLevel = level1;
  //Check tile for railroad
  switch (currentLevel[train.y][train.x]) {
    case "||":
      train.y += train.direction.y;
    break;
    case "==":
      train.x += train.direction.x;
    break;
    case "⎿":
      if(train.direction.x < 0 ){
        train.direction.y = -1;//go up
        train.direction.x = 0;
        train.y += train.direction.y;
        rotate(train, 90);
      }else{
        train.direction.y = 0;
        train.direction.x = 1;//go right
        train.x += train.direction.x;
        rotate(train, -90);
      }
    break;
    case "⏌":
      if(train.direction.x > 0 ){
        train.direction.y = -1; //go up
        train.direction.x = 0;
        train.y += train.direction.y;
        rotate(train, -90);
      }else{
        train.direction.y = 0;
        train.direction.x = -1;//go left
        train.x += train.direction.x;
        rotate(train, 90);
      }
    break;
    case '⎾':
    if(train.direction.x < 0 ){
      train.direction.y = 1; //go down
      train.direction.x = 0;
      train.y += train.direction.y;
      rotate(train, -90);
    }else{
      train.direction.y = 0;
      train.direction.x = 1;//go right
      train.x += train.direction.x;
      rotate(train, 90);
    }
    break;
    case '⏋':
    if(train.direction.x > 0 ){
      train.direction.y = 1; //go down
      train.direction.x = 0;
      train.y += train.direction.y;
      rotate(train, 90);
    }else{
      train.direction.y = 0;
      train.direction.x = -1;//go left
      train.x += train.direction.x;
      rotate(train, -90);
    }
    break;
    case 's>':
      train.direction.x = 1;//go right
      train.x += train.direction.x;
      rotate(train, 90);
    break;
    case '<s':
      train.direction.x = -1;//go right
      train.x += train.direction.x;
    break;
  }

  //Check if train reached house
  if(currentLevel[train.y][train.x].includes('h')){
    var houseNumber = parseInt(currentLevel[train.y][train.x][1]);
    train.finished = true;

    setTimeout(function(){
      score.total += 1;
      if(train.color === houseNumber){//Correct house
        score.correct += 1;
      }
      scoreUpdate();
      $(train.body).remove();
    },1000);

  }

  //Move image on DOM
  updatePositionCSS(train);
}

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
