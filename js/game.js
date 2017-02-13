class Train
{
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
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
    }else{
      this.currentState = this.state1;
    }
  }

}//End of class

class House {
  constructor(color, x ,y) {
    this.x = x;
    this.y = y;
    this.color = color;

  }
}//End of class


function moveTrain (train){

  //Check tile for railroad
  switch (level1[train.y][train.x]) {
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
      }else{
        train.direction.y = 0;
        train.direction.x = 1;//go right
        train.x += train.direction.x;
      }
    break;
    case "⏌":
      if(train.direction.x > 0 ){
        train.direction.y = -1; //go up
        train.direction.x = 0;
        train.y += train.direction.y;
      }else{
        train.direction.y = 0;
        train.direction.x = -1;//go left
        train.x += train.direction.x;
      }
    break;
    case '⎾':
    if(train.direction.x < 0 ){
      train.direction.y = 1; //go down
      train.direction.x = 0;
      train.y += train.direction.y;
    }else{
      train.direction.y = 0;
      train.direction.x = 1;//go right
      train.x += train.direction.x;
    }
    break;
    case '⏋':
    if(train.direction.x > 0 ){
      train.direction.y = 1; //go down
      train.direction.x = 0;
      train.y += train.direction.y;
    }else{
      train.direction.y = 0;
      train.direction.x = -1;//go left
      train.x += train.direction.x;
    }
    break;
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
    default:
      console.error('wrong map string ->' + string);
  }
}

//Update position on DOM:
function updatePositionCSS(object){
  $(object.body).css('top', tileSize * object.y);
  $(object.body).css('left', tileSize * object.x);
}
