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

var talkedToWeirdNPC = false;

var NPCW = 100;
var NPCH = 100;

var NPC = [];

var gDebugMode = true;

var index = 0;

var ina = 0;
var groupIndex = 0;

var ImageIndex = 0;

var file = [];
var logo = [];

//For Room4 content (2 NPC)
var inaMen = 0;
var inaWomen = 0;
var groupIndexMen = 0;
var groupIndexWomen = 0;

//team array
var teamList = [];

// adventure manager global  
var adventureManager;
var clickablesManager;
var clickables;
var playerSprite;
var playerAnimation;
var NPCSprite;


// Allocate Adventure Manager with states table and interaction tables
function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  //content = new Content_Man('data/Content.csv');
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
  //content.setup();

  textSize(24);
  textAlign(LEFT);
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
  text("X: " + mouseX + "   Y: " + mouseY, 20, height - 20);
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

//content function (also learn this from Jiaquan)
// function drawtextbox(content) {
//   push();
//   fill(0);
//   rect(0,height-200,width,200); //textbox
//   fill(255);
//   textAlign(CENTER);
//   textSize(20);
//   text(content,0,height-150, width, 200);
//   pop();
// }


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
  }
}





// class Room1Page extends PNGRoom {
// 	preload(){
// 		this.img = [];
// 		this.img[0] = loadImage('assets/map1.png');
// 		this.img[1] = loadImage('assets/npc7.png');

// 		this.NPC= createSprite(590, 145, NPCW, NPCH);
// 		this.NPC.addImage(this.img[1]);

//     this.key = [];
// 		this.key[0] = createSprite(338, 617);
// 		this.key[0].addImage(logo[0]);

//     this.key[1] = createSprite(296, 214);
//     this.key[1].addImage(logo[1]);

//     this.key[2] = createSprite(514, 600);
//     this.key[2].addImage(logo[2]);

//     this.key[3] = createSprite(68, 273);
//     this.key[3].addImage(logo[3]);

//     ina = 0;
//     groupIndex = 0;
// 	}
// 	draw(){
// 		super.draw();
// 		drawSprite(this.NPC);
// 		drawSprite(this.key[0]);
//     drawSprite(this.key[1]);
//     drawSprite(this.key[2]);
//     drawSprite(this.key[3]);

// 		playerSprite.overlap(this.NPC, this.talkable);
// 		playerSprite.overlap(this.key[0], this.collect0);
//     playerSprite.overlap(this.key[1], this.collect1);
//     playerSprite.overlap(this.key[2], this.collect2);
//     playerSprite.overlap(this.key[3], this.collect3);

// 		image(this.img[0], 1130, 0, 150, 150);

//     if (file[0] == true) this.key[0].remove();
//     if (file[1] == true) this.key[1].remove();
//     if (file[2] == true) this.key[2].remove();
//     if (file[3] == true) this.key[3].remove();

//     if (ina == 6) this.NPC.remove();
// 	}
// 	talkable() {
// 		content.ChangeToState('Room1');
// 		let conversation = content.GroupContent(groupIndex);
// 		if (ina < conversation.length) {
// 			clickables[1].visible = true;
// 			drawtextbox(conversation[ina]);
// 			clickables[1].onPress = function temp() { 
//         		ina++;
//       		} 
// 		}
//     if (ina == 6) {
//       ImageIndex = 1;
//     }
// 	}
// 	collect0() {
//     	file[0] = true;
//   	}
//   collect1() {
//       file[1] = true;
//     }
//   collect2() {
//       file[2] = true;
//     }
//   collect3() {
//       file[3] = true;
//     }
// }

// class Room2Page extends PNGRoom {
// 	preload(){
// 		this.img = [];
// 		this.img[0] = loadImage('assets/map2.png');
// 		this.img[1] = loadImage('assets/npc2.png');
// 		this.NPC= createSprite(550, 302, NPCW, NPCH);
// 		this.NPC.addImage(this.img[1]);

// 		ina = 0;
// 		groupIndex = 0;
// 	}
// 	draw(){
// 		super.draw();
// 		drawSprite(this.NPC);
// 		playerSprite.overlap(this.NPC, this.talkable);
// 		image(this.img[0], 1130, 0, 150, 150);
// 		if (ina == 12) this.NPC.remove();
// 	}
// 	talkable() {
// 		content.ChangeToState('Room2');
// 		let conversation = content.GroupContent(groupIndex);
//     if (ina == 12) {
//       ImageIndex = 2;
//     }
// 		if (ina < conversation.length) {
// 			clickables[1].visible = true;
// 			drawtextbox(conversation[ina]);
// 			clickables[1].onPress = function temp() { 
//         		ina++;
//       		} 
// 		}
// 		else{
// 			clickables[2].visible = true;
// 			clickables[2].onPress = function temp(){
// 			}
// 			if (file[0] && file[1] && file[2] && file[3]){
//         clickables[2].visible = false;
// 				clickables[3].visible = true;
// 				clickables[3].onPress = function temp(){
// 					groupIndex = 1;
// 					ina = 0;
// 				}
// 			}
// 		}
// 	}
// }

// class Room3Page extends PNGRoom {
// 	preload(){
// 		this.img = [];
// 		this.img[0] = loadImage('assets/map3.png');
// 		this.img[1] = loadImage('assets/npc5.png');
// 		this.NPC= createSprite(252, 348, NPCW, NPCH);
// 		this.NPC.addImage(this.img[1]);

//     ina = 0;
//     groupIndex = 0;
// 	}
// 	draw(){
// 		super.draw();
// 		drawSprite(this.NPC);
//     playerSprite.overlap(this.NPC, this.talkable);
// 		image(this.img[0], 1130, 0, 150, 150);

//     if (ina == 11) this.NPC.remove();
// 	}
//   talkable(){
//     content.ChangeToState('Room3');
//     let conversation = content.GroupContent(groupIndex);
//     if (ina == 11) {
//       ImageIndex = 3;
//     }
//     if (ina < conversation.length) {
//       clickables[1].visible = true;
//       drawtextbox(conversation[ina]);
//       clickables[1].onPress = function temp() { 
//             ina++;
//           } 
//     }
//     else{
//       clickables[2].visible = true;
//       clickables[2].onPress = function temp(){
//       }
//       if (file[0] && file[1] && file[2] && file[3]){
//         clickables[2].visible = false;
//         clickables[3].visible = true;
//         clickables[3].onPress = function temp(){
//           groupIndex = 1;
//           ina = 0;
//         }
//       }
//     }
//   }
// }

// class Room4Page extends PNGRoom {
// 	preload(){
// 		this.img = [];
// 		this.img[0] = loadImage('assets/map4.png');
// 		this.img[1] = loadImage('assets/npc1.png');
// 		this.img[2] = loadImage('assets/npc3.png');

// 		this.NPC = [];
// 		this.NPC[0] = createSprite(58, 280, NPCW, NPCH);
// 		this.NPC[1] = createSprite(950, 506, NPCW, NPCH);
// 		this.NPC[0].addImage(this.img[1]);// Men
// 		this.NPC[1].addImage(this.img[2]);// Women

//     inaMen = 0;
//     inaWomen = 0;

//     groupIndexMen = 0;
//     groupIndexWomen = 0;
// 	}
// 	draw(){
// 		super.draw();
// 		drawSprite(this.NPC[0]);
// 		drawSprite(this.NPC[1]);
//     playerSprite.overlap(this.NPC[0], this.talkableMen);
//     playerSprite.overlap(this.NPC[1], this.talkableWomen);
// 		image(this.img[0], 1130, 0, 150, 150);
//     if (inaMen == 10) this.NPC[0].remove();
//     if (inaWomen == 10) this.NPC[1].remove();
// 	}
//   talkableMen() {
//     content.ChangeToState('Room4_M');
//     let conversation = content.GroupContent(groupIndexMen);
//     if (inaMen == 10) {
//       ImageIndex = 4;
//     }
//     if (inaMen < conversation.length) {
//       clickables[1].visible = true;
//       drawtextbox(conversation[inaMen]);
//       clickables[1].onPress = function temp() { 
//             inaMen++;
//           } 
//     }
//     else{
//       clickables[2].visible = true;
//       clickables[2].onPress = function temp(){
//       }
//       if (file[0] && file[1] && file[2] && file[3]){
//         clickables[2].visible = false;
//         clickables[3].visible = true;
//         clickables[3].onPress = function temp(){
//           inaMen = 0;
//           groupIndexMen = 1;
//         }
//       }
//     }
//   }
//   talkableWomen() {
//     content.ChangeToState('Room4_W');
//     let conversation = content.GroupContent(groupIndexWomen);
//     if (inaWomen == 10) {
//       ImageIndex = 5;
//     }
//     if (inaWomen < conversation.length) {
//       clickables[1].visible = true;
//       drawtextbox(conversation[inaWomen]);
//       clickables[1].onPress = function temp() { 
//             inaWomen++;
//           } 
//     }
//     else{
//       clickables[2].visible = true;
//       clickables[2].onPress = function temp(){
//       }
//       if (file[0] && file[1] && file[2] && file[3]){
//         clickables[2].visible = false;
//         clickables[3].visible = true;
//         clickables[3].onPress = function temp(){
//           inaWomen = 0;
//           groupIndexWomen = 1;
//         }
//       }
//     }
//   }
// }

// class Room5Page extends PNGRoom {
// 	preload(){
// 		this.img = [];
// 		this.img[0] = loadImage('assets/map5.png');
// 		this.img[1] = loadImage('assets/npc6.png');
// 		this.NPC = createSprite(950, 42, NPCW, NPCH);
// 		this.NPC.addImage(this.img[1]);

//     ina = 0;
//     groupIndex = 0;
// 	}
// 	draw(){
// 		super.draw();
// 		drawSprite(this.NPC);
    
// 		image(this.img[0], 1130, 0, 150, 150);
//     playerSprite.overlap(this.NPC, this.talkable);
//     if (ina == 10) this.NPC.remove();
// 	}
//   talkable() {
//     content.ChangeToState('Room5');
//     let conversation = content.GroupContent(groupIndex);
//     if (ina == 10) {
//       ImageIndex = 6;
//     }
//     if (ina < conversation.length) {
//       clickables[1].visible = true;
//       drawtextbox(conversation[ina]);
//       clickables[1].onPress = function temp() { 
//             ina++;
//           } 
//     }
//     else{
//       clickables[2].visible = true;
//       clickables[2].onPress = function temp(){
//       }
//       if (file[0] && file[1] && file[2] && file[3]){
//         clickables[2].visible = false;
//         clickables[3].visible = true;
//         clickables[3].onPress = function temp(){
//           groupIndex = 1;
//           ina = 0;
//         }
//       }
//     }
//   }
// }

// class Room6Page extends PNGRoom {
// 	preload(){
// 		this.img = [];
// 		this.img[0] = loadImage('assets/map6.png');
// 		this.img[1] = loadImage('assets/npc4.png');

// 		this.NPC = createSprite(32, 570, NPCW, NPCH);
// 		this.NPC.addImage(this.img[1], ); 

//     ina = 0;
//     groupIndex = 0;
// 	}
// 	draw(){
// 		super.draw();
// 		drawSprite(this.NPC);
// 		image(this.img[0], 1130, 0, 150, 150);
//     playerSprite.overlap(this.NPC, this.talkable);
//     if (ina == 10) this.NPC.remove();
// 	}
//   talkable() {
//     content.ChangeToState('Room6');
//     let conversation = content.GroupContent(groupIndex);
//     if (ina == 10) {
//       ImageIndex = 7;
//     }
//     if (ina < conversation.length) {
//       clickables[1].visible = true;
//       drawtextbox(conversation[ina]);
//       clickables[1].onPress = function temp() { 
//             ina++;
//           } 
//     }
//     else{
//       clickables[2].visible = true;
//       clickables[2].onPress = function temp(){
//       }
//       if (file[0] && file[1] && file[2] && file[3]){
//         clickables[2].visible = false;
//         clickables[3].visible = true;
//         clickables[3].onPress = function temp(){
//           groupIndex = 1;
//           ina = 0;
//         }
//       }
//     }
//   }
// }

// class Room7Page extends PNGRoom {
// 	preload(){
// 		this.img = [];
// 		this.img[0] = loadImage('assets/map7.png');

// 		this.NPC = createSprite(980, height/3, 300, 300);
// 		this.NPC.addAnimation('regular', NPC[1]); 

//     ina = 0;
//     groupIndex = 0;  
// 	}
// 	draw(){
// 		super.draw();
// 		drawSprite(this.NPC);
// 		image(this.img[0], 1130, 0, 150, 150);
//     playerSprite.overlap(this.NPC, this.talkable);
// 	}
//   talkable() {
//     content.ChangeToState('Room7');

//     if (ImageIndex !== 7){
//       let conversation = content.GroupContent(0);
//       clickables[1].visible = true;
//       drawtextbox(conversation[0]);
//       clickables[1].onPress = function temp() {
//         file[0] = false;
//         file[1] = false;
//         file[2] = false;
//         file[3] = false;
//         adventureManager.changeState("BadEnding");
//       }
//     }
//     else{
//       let conversation = content.GroupContent(1);
//       clickables[1].visible = true;
//       drawtextbox(conversation[0]);
//       clickables[1].onPress = function temp() {
//         file[0] = false;
//         file[1] = false;
//         file[2] = false;
//         file[3] = false;
//         adventureManager.changeState("GoodEnding");
//       }
//     }
//   }
// }
// // I learn this class function from Jiaquan
// class Content_Man {
//   //Use csv file location as parameter.
//   constructor(filename) {
//     this.file = loadTable(filename,'csv','header');
//     this.state = [];
//     this.group = [];
//   } 
//   //set up the Content, with State name.
//   setup() {
//     let statetotal = 0;
//     for (let i = 0; i < this.file.getRowCount(); i++) {
//       let statename = this.file.getString(i, 'State');

//       if (statename == '') return 'Not Valid State Name';
//       else if (this.state.indexOf(statename) == -1) {
//         this.state[statetotal] = statename;
//         statetotal++;
//       }
//     }
//   }
//   //This will change to the state with the parameter "stateName", find the correct State in csv
//   ChangeToState(stateName) {
//     if (this.state.indexOf(stateName) == -1) return 'Not Valid State Name';
//     else this.group = this.file.findRows(stateName,'State');
//     return this.group;
//   }
//   //This will change to correct group with the parameter "groupID", find the correct Group in csv, return as array of content.
//   GroupContent(groupID) {
//     let content = [];
//     for (let i = 0; i < this.group.length; i++) {
//       if (this.group[i].getNum('Group') == groupID) {
//         content[this.group[i].getNum('Index')] = this.group[i].getString('Content');
//       }
//     }
//     return content;
//   }
//   //Not useful
//   getAllStateName() {
//     return this.state;
//   }
//   //Not useful
//   getS() {
//     return this.group;
//   }
// }