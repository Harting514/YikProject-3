/***********************************************************************************
  Brain to Terminal (End-End)
  by Yik Hung

  Uses the p5.2DAdventure.js class 

  Virsion: 5/2/21
  
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.2DAdventure.js"></script>
***********************************************************************************/
var images = [];

var content;


// variables for data and character
var dataWeight = 140;
var dataHeight = 110;
var CharacterWeight = 110;
var CharacterHeight = 100;


var ina = 0;
var groupIndex = 0;

var gDebugMode = true;


//setting a random var for "Post-credits scence" (option) Ending
var r;


// adventure manager global  
var adventureManager;
var clickablesManager;
var clickables;
var playerSprite;
var playerAnimation;
var NPCSprite;


// Allocate Adventure Manager with states table and interaction tables
function preload() {
  images[0] = loadImage('assets/up.png');
  images[1] = loadImage('assets/down.png');

  
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  content = new Content_Man('data/Content.csv');
  adventureManager = new AdventureManager("data/adventureStates.csv", "data/interactionTable.csv");
}


// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  clickables = clickablesManager.setup();

  // This will load the images, go through state and interation tables, etc
  adventureManager.setup();


  adventureManager.setClickableManager(clickablesManager);
  setupClickables(); 
  content.setup();

  textSize(24);
  textAlign(LEFT);

  r = int(random(2));

}


// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();
  clickablesManager.draw();

  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].visible = false;
  }

  if( gDebugMode == true ) {
    drawDebugInfo();
  }
}



function mouseReleased() {
  adventureManager.mouseReleased();
}


function drawDebugInfo() {
  fill(255,0,0);
  text("R: " + r, 20, height - 20);
}

// keyTyped gets triggered whenever key is down
function keyTyped() {
  if (key === ' ') {
    gDebugMode = !gDebugMode;
  }
}

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#AAAAAA";
}

//Just for set up, will call it again in each different class
clickableButtonPressed = function() {

}

//content function ()
function drawtextbox(content) {
  push();
  fill(0);
  rect(0,height-200,width,200); //textbox
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text(content,0,height-150, width, 200);
  pop();
}


class SplashScreen extends PNGRoom{
  preload(){

  }

  draw(){
    super.draw();
    clickables[0].visible = true;
    clickables[0].onPress = function temp(){
      adventureManager.changeState("Instructions");
    }
  }
}

class InstructionsScreen extends PNGRoom {
  preload() {

  }

  draw() {
    super.draw();
  	clickables[0].visible = true;
  	clickables[0].onPress = function temp(){
  		adventureManager.changeState("Characters");
  	}
  }
}



class CharacterScreen extends PNGRoom{
  preload() {

  }

  draw() {
    super.draw();
    clickables[0].visible = true;
    clickables[0].onPress = function temp(){
      adventureManager.changeState("Data");
    }
  }
}


class DataScreen extends PNGRoom{
  preload() {

  }

  draw() {
    super.draw();
    clickables[1].visible = true;
    clickables[1].onPress = function temp(){
      adventureManager.changeState("Room1");
    }
  }
}

class Room1Page extends PNGRoom{ 
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);

    clickables[2].visible = true;
    clickables[4].visible = true;

    clickables[2].onPress = function temp(){
      adventureManager.changeState("Room2");
    }
    clickables[4].onPress = function temp(){
      adventureManager.changeState("Room1-End");
    }

    content.ChangeToState('Room1');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);

  }
}


class Room1EndPage extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/down.png');
    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[6], 180, 0, dataWeight-50, dataHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);
    

    content.ChangeToState('Room1-End');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);

  }
}



class Room2Page extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/down.png');
    this.img[7] = loadImage('assets/up.png');
    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[7], 180, 0, dataWeight-50, dataHeight);
    image(this.img[7], 180, 160, dataWeight-50, dataHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);

    clickables[3].visible = true;
    clickables[5].visible = true;

    clickables[3].onPress = function temp(){
      adventureManager.changeState("Room3");
    }
    clickables[5].onPress = function temp(){
      adventureManager.changeState("Room2-End");
    }

    content.ChangeToState('Room2');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);

  }
}



class Room2EndPage extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/down.png');
    this.img[7] = loadImage('assets/up.png');
    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[6], 180, 0, dataWeight-50, dataHeight);
    image(this.img[6], 180, 160, dataWeight-50, dataHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);

    content.ChangeToState('Room2-End');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);

  }
}



class Room3Page extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/antilogo.png');
    this.img[7] = loadImage('assets/down.png');
    this.img[8] = loadImage('assets/up.png');

    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[6], 890, 235, CharacterWeight, CharacterHeight);
    image(this.img[8], 180, 0, dataWeight-50, dataHeight);
    image(this.img[8], 180, 160, dataWeight-50, dataHeight);
    image(this.img[8], 180, 320, dataWeight-50, dataHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);
    
    clickables[6].visible = true;
    clickables[7].visible = true;

    clickables[6].onPress = function temp(){
      adventureManager.changeState("Room4");
    }
    clickables[7].onPress = function temp(){
      adventureManager.changeState("Room3-1");
    }


    content.ChangeToState('Room3');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);

  }
}


class Room3_1Page extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/antilogo.png');
    this.img[7] = loadImage('assets/down.png');
    this.img[8] = loadImage('assets/up.png');

    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[6], 890, 235, CharacterWeight, CharacterHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);

    image(this.img[7], 180, 0, dataWeight-50, dataHeight);
    image(this.img[7], 180, 160, dataWeight-50, dataHeight);
    
    clickables[8].visible = true;


    clickables[8].onPress = function temp(){
      adventureManager.changeState("Room3-1-End");
    }


    content.ChangeToState('Room3-1');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);

  }
}



class Room3_1_EndPage extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/antilogo.png');
    this.img[7] = loadImage('assets/down.png');
    this.img[8] = loadImage('assets/up.png');
    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[6], 890, 235, CharacterWeight, CharacterHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);
    image(this.img[7], 180, 0, dataWeight-50, dataHeight);
    image(this.img[7], 180, 160, dataWeight-50, dataHeight);
    image(this.img[7], 180, 320, dataWeight-50, dataHeight);

    content.ChangeToState('Room3-1-End');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);
  }
}




class Room4Page extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/antilogo.png');
    this.img[7] = loadImage('assets/down.png');
    this.img[8] = loadImage('assets/up.png');
    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[6], 890, 235, CharacterWeight, CharacterHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);
    image(this.img[8], 180, 160, dataWeight-50, dataHeight);
    image(this.img[8], 180, 320, dataWeight-50, dataHeight);
    
    clickables[6].visible = true;
    clickables[7].visible = true;

    clickables[6].onPress = function temp(){
      if (r == 1){
        adventureManager.changeState("Final-End");
      }
      else adventureManager.changeState("Option-End");
    }

    clickables[7].onPress = function temp(){
      adventureManager.changeState("Room4-1");
    }


    content.ChangeToState('Room4');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);

  }
}



class Room4_1Page extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/antilogo.png');
    this.img[7] = loadImage('assets/down.png');
    this.img[8] = loadImage('assets/up.png');
    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[6], 890, 235, CharacterWeight, CharacterHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);
    image(this.img[7], 180, 160, dataWeight-50, dataHeight);


    clickables[8].visible = true;


    clickables[8].onPress = function temp(){
      adventureManager.changeState("Room4-1-End");
    }


    content.ChangeToState('Room4-1');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);

  }
}




class Room4_1_EndPage extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/antilogo.png');
    this.img[7] = loadImage('assets/down.png');
    this.img[8] = loadImage('assets/up.png');
    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[6], 890, 235, CharacterWeight, CharacterHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);
    image(this.img[7], 180, 0, dataWeight-50, dataHeight);
    image(this.img[8], 180, 160, dataWeight-50, dataHeight);
    image(this.img[8], 180, 320, dataWeight-50, dataHeight);



    content.ChangeToState('Room4-1-End');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);
  }
}


class Final_EndPage extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/antilogo.png');
    this.img[7] = loadImage('assets/down.png');
    this.img[8] = loadImage('assets/up.png');
    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[6], 890, 235, CharacterWeight, CharacterHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);
    image(this.img[7], 180, 0, dataWeight-50, dataHeight);
    image(this.img[8], 180, 160, dataWeight-50, dataHeight);
    image(this.img[8], 180, 320, dataWeight-50, dataHeight);



    content.ChangeToState('Final-End');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);
  }
}


class Option_EndPage extends PNGRoom{
  preload() {
    this.img = [];
    this.img[0] = loadImage('assets/companylogo.png');
    this.img[1] = loadImage('assets/economylogo.png');
    this.img[2] = loadImage('assets/NeoLuddism.png');
    this.img[3] = loadImage('assets/governlogo.png');
    this.img[4] = loadImage('assets/Userlogo.png');
    this.img[5] = loadImage('assets/Datalogo.png');
    this.img[6] = loadImage('assets/antilogo.png');
    this.img[7] = loadImage('assets/down.png');
    this.img[8] = loadImage('assets/up.png');
    ina = 0;
    groupIndex = 0;
  }

  draw() {
    super.draw();
    image(this.img[0], 455, 70, CharacterWeight, CharacterHeight);
    image(this.img[3], 455, 235, CharacterWeight, CharacterHeight);
    image(this.img[4], 890, 70, CharacterWeight, CharacterHeight);
    image(this.img[6], 890, 235, CharacterWeight, CharacterHeight);
    image(this.img[1], 0, 0, dataWeight, dataHeight);
    image(this.img[2], 0, 320, dataWeight, dataHeight);
    image(this.img[5], 0, 160, dataWeight, dataHeight);
    image(this.img[7], 180, 0, dataWeight-50, dataHeight);
    image(this.img[8], 180, 160, dataWeight-50, dataHeight);
    image(this.img[8], 180, 320, dataWeight-50, dataHeight);




    content.ChangeToState('Option-End');
    let conversation = content.GroupContent(groupIndex);
    drawtextbox(conversation[ina]);
  }
}







// I learn this class function from Jiaquan
class Content_Man {
  //Use csv file location as parameter.
  constructor(filename) {
    this.file = loadTable(filename,'csv','header');
    this.state = [];
    this.group = [];
  } 
  //set up the Content, with State name.
  setup() {
    let statetotal = 0;
    for (let i = 0; i < this.file.getRowCount(); i++) {
      let statename = this.file.getString(i, 'State');

      if (statename == '') return 'Not Valid State Name';
      else if (this.state.indexOf(statename) == -1) {
        this.state[statetotal] = statename;
        statetotal++;
      }
    }
  }
  //This will change to the state with the parameter "stateName", find the correct State in csv
  ChangeToState(stateName) {
    if (this.state.indexOf(stateName) == -1) return 'Not Valid State Name';
    else this.group = this.file.findRows(stateName,'State');
    return this.group;
  }
  //This will change to correct group with the parameter "groupID", find the correct Group in csv, return as array of content.
  GroupContent(groupID) {
    let content = [];
    for (let i = 0; i < this.group.length; i++) {
      if (this.group[i].getNum('Group') == groupID) {
        content[this.group[i].getNum('Index')] = this.group[i].getString('Content');
      }
    }
    return content;
  }
  //Not useful
  getAllStateName() {
    return this.state;
  }
  //Not useful
  getS() {
    return this.group;
  }
}