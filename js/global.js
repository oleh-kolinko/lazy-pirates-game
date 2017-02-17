//s>,<s - start
//h#  - house#
//vertical      ||
//horizontal    ==
//top-right     ⎿
//top-left      ⏌
//bottom-right ⎾
//bottom-left   ⏋

var level1 = [
  // 0      1      2      3      4      5      6      7      8     9     10    11    12
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//0
  [ null , 'h1' , '==' , '==' , '==' , '==' , '⏋' , null , null , null ,null , null , null],//1
  [ null , null , null , '||' , null , null , '||' , null , null , null ,null , null , null],//2
  [ null , null , null , '||' , null , null , '||' , null , null , null ,null , null , null],//3
  [ null , null , null , 'h2' , null , null , '⎾' , '==' , '==' , '==' ,'⏋' , null , null],//4
  [ null , null , null , null , null , null , '||' , null , null , null ,'||' , null , null],//5
  [ null , null , null , null , null , null , '||' , null , null , null ,'||' , null , null],//6
  [ 's>' , '==' , '==' , '==' , '==' , '==' , "⏌" , null , null , null ,'||' , null , null],//7
  [ null , null , null , null , null , null , null , null , null , null ,'||' , null , null],//8
  [ null , null , null , null , null , null , null , null , null , null ,'h0' , null , null],//9

];
var level2 = [
  // 0      1      2      3      4      5      6      7      8     9     10    11    12
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//0
  [ 's>' , '==' , '==' , '⏋' , null , null , null , null , null , null ,null , null , null],//1
  [ null , null , null , '||' , null , null , null , null , null , null ,'h2' , '⏋' , null],//2
  [ null , null , null , '||' , null , null , null , null , null , null ,null , '||' , null],//3
  [ null , null , null , '⎿' , '==' , '==' , '==' , '==' , '==' , '==' ,'==' , '⏌' , null],//4
  [ null , null , null , null , null , '||' , null , null , null , null ,'||' , null , null],//5
  [ null , 'h0' , null , null , null , '||' , null , null , null , null ,'||' , null , null],//6
  [ null , '||' , null , null , null , '||' , null , 'h1' , null , null ,'||' , null , null],//7
  [ null , '⎿' , '==' , '==' , '==' , '⏌' , null , '||' , null , null ,'||' , null , null],//8
  [ null , null , null , null , null , '⎿' , '==' , '⏌' , null , null ,'h3' , null , null],//9
];
var level3 = [
  // 0      1      2      3      4      5      6      7      8     9     10    11    12
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//0
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//1
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//2
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//3
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//4
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//5
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//6
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//7
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//8
  [ null , null , null , null , null , null , null , null , null , null ,null , null , null],//9

];


//GLOBAL VARIABLES:
var playableArea = $('#playable-area');
var tileSize = 64;
var trains = []; // All trains
var railSwitches = []; //All switches
var houses = []; //All houses
var start = {}; //Starting point
var currentLevel ;
var currentLevelColors = 0;
var difficulty = 1;
var speedUpdate = 750; // Interval of update calling, speed of boats movement(less -> faster)

var timer = {
  time : 42,
  html : $('#timer-value')
};
var score = {
  correct : 0 ,
  total : 0,
  html : $('#score-value')
};
