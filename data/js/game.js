var gameOverCounter=0;
var finish=0;
var img="";
var imgURL="data/img/";
var textURL="data/img/text/";
var BackgroundImage=new Image();
	BackgroundImage.src=imgURL+"background.png";
var RacingGameImage=new Image();
	RacingGameImage.src=textURL+"racing_game.png";
var AAboutGameImage=new Image();
	AAboutGameImage.src=textURL+"a_about_game.png";
var IInstructionsImage=new Image();
	IInstructionsImage.src=textURL+"i_instructions.png";
var PressEnterToPlayImage=new Image();
	PressEnterToPlayImage.src=textURL+"press_enter_to_play.png";
var AboutGameImage=new Image();
	AboutGameImage.src=textURL+"about_game.png";
var InstructionsImage=new Image();
	InstructionsImage.src=textURL+"instructions.png";
var GameOverImage=new Image();
	GameOverImage.src=textURL+"game_over.png";
var RaceOverImage=new Image();
	RaceOverImage.src=textURL+"race_over.png";
var raceCounter=new RaceCounter();
var gameCounter=4;
function control() {
	switch(img) {
	case "game":
		switch(gameCounter) {
		case 0:
			for(var x=0;x<explosions.length;x++) {
				explosions[x].control();
			}
			break;
		case 1:
			if(raceCounter.raceCounter<=0) {
				controlObjects();
			}
			break;
		case 2:
			if(raceCounter.raceCounter<=0) {
				controlPlayers();
			}
			break;
		default:
		}
		if(raceCounter.raceCounter>=0) {
			raceCounter.control();
		}
		break;
	default:
	}
	if(gameCounter==4) {
		draw();
		gameCounter=0;
	}
	else {
		gameCounter++;
	}
}
function draw() {
	switch(img) {
	case "aboutGame":
		ctx.fillStyle="#000000";
		ctx.fillRect(0, 0, 800, 600);
		ctx.drawImage(RacingGameImage, 400-(RacingGameImage.width/2), 0, RacingGameImage.width, RacingGameImage.height);
		ctx.drawImage(AboutGameImage, 400-(AboutGameImage.width/2), RacingGameImage.height, AboutGameImage.width, AboutGameImage.height);
		ctx.fillStyle="#ff9900";
		ctx.font="20px Arial";
		ctx.fillText("Version: 1.0.0.0", 10, 200);
		ctx.fillText("Programmer: Nihad Liu Karajko", 10, 250);
		ctx.fillText("nihadliu@gmail.com", 10, 300);
		ctx.fillText("Copyright (c) 2014 - 2018", 10, 350);
		break;
	case "gameOver":
		ctx.fillStyle="#000000";
		ctx.fillRect(0, 0, 800, 600);
		ctx.drawImage(GameOverImage, 400-(GameOverImage.width/2), 300-(GameOverImage.height/2), GameOverImage.width, GameOverImage.height);
		if(gameOverCounter>0) {
			gameOverCounter--;
		}
		else {
			setImg("title");
		}
		break;
	case "game":
		for(var x=0;x<8;x++) {
			for(var y=-2;y<6;y++) {
				ctx.drawImage(grassImage, x*grassImage.width, grassY+(y*grassImage.height), grassImage.width, grassImage.height);
			}
		}
		for(var x=0;x<objects.length;x++) {
			if(objects[x].visible) {
				if(objects[x].isVisible()) {
					var objectImage=getObjectImage(objects[x].name);
					ctx.drawImage(objectImage, objects[x].x, objects[x].y, objectImage.width, objectImage.height);
				}
			}
		}
		for(var x=0;x<players.length;x++) {
			if(!players[x].destroyed && players[x].visible) {
				if(players[x].isVisible()) {
					var vehicleImage=getVehicleImage(players[x].name);
					ctx.drawImage(vehicleImage, players[x].x, players[x].y, vehicleImage.width, vehicleImage.height);
				}
			}
		}
		for(var x=0;x<explosions.length;x++) {
			if(explosions[x].active) {
				var explosionImage=explosionImages[explosions[x].number];
				ctx.drawImage(explosionImage, explosions[x].x-((explosionImage.width*explosions[x].multiplier)/2), explosions[x].y-((explosionImage.height*explosions[x].multiplier)/2), explosionImage.width*explosions[x].multiplier, explosionImage.height*explosions[x].multiplier);
			}
		}
		ctx.fillText("Speed: "+Math.ceil(players[0].speed)+"km/h", 10, 25);
		ctx.fillText("Fuel: "+Math.ceil(players[0].fuel)+"%", 10, 50);
		ctx.fillText("Position: "+players[0].getPosition(), 10, 75);
		if(raceCounter.raceCounter>-1) {
			var raceCounterImage=raceCounter.getImage();
			ctx.drawImage(raceCounterImage, 400-(raceCounterImage.width/2), 300-(raceCounterImage.height/2), raceCounterImage.width, raceCounterImage.height);
		}
		break;
	case "instructions":
		ctx.fillStyle="#000000";
		ctx.fillRect(0, 0, 800, 600);
		ctx.drawImage(RacingGameImage, 400-(RacingGameImage.width/2), 0, RacingGameImage.width, RacingGameImage.height);
		ctx.drawImage(InstructionsImage, 400-(InstructionsImage.width/2), RacingGameImage.height, InstructionsImage.width, InstructionsImage.height);
		ctx.fillStyle="#ff9900";
		ctx.font="20px Arial";
		ctx.fillText("W/A/S/D: Move", 10, 200);
		ctx.fillText("Backspace/Escape: Back", 10, 250);
		break;
	case "raceOver":
		ctx.fillStyle="#000000";
		ctx.fillRect(0, 0, 800, 600);
		ctx.drawImage(RaceOverImage, 400-(RaceOverImage.width/2), 300-(RaceOverImage.height/2), RaceOverImage.width, RaceOverImage.height);
		ctx.fillStyle="#ff9900";
		ctx.font="20px Arial";
		ctx.fillText("Position: "+players[0].getPosition(), 10, 500);
		ctx.fillText("Press Enter to continue", 10, 525);
		break;
	case "title":
		ctx.fillStyle="#000000";
		ctx.fillRect(0, 0, 800, 600);
		ctx.drawImage(BackgroundImage, 0, 100, 800, 400);
		ctx.drawImage(RacingGameImage, 400-(RacingGameImage.width/2), 0, RacingGameImage.width, RacingGameImage.height);
		ctx.drawImage(AAboutGameImage, 10, 100, AAboutGameImage.width, AAboutGameImage.height);
		ctx.drawImage(IInstructionsImage, 10, 100+AAboutGameImage.height, IInstructionsImage.width, IInstructionsImage.height);
		ctx.drawImage(PressEnterToPlayImage, 400-(PressEnterToPlayImage.width/2), 600-PressEnterToPlayImage.height, PressEnterToPlayImage.width, PressEnterToPlayImage.height);
		break;
	default:
	}
}
function reset() {
	resetExplosions();
	objects=new Array();
	players=new Array();
	raceCounter.reset();
}
function set() {
	grassY=0;
	addPlayer(new Player("player", 400, 500));
	for(var x=0;x<60;x++) {
		addPlayer(new Player(getRandomVehicleName(), 300+Math.floor(Math.random()*150), -500*(x+1)));
	}
	setMap();
	finish=getFinish();
	var lastRoadObject=null;
	for(var x=0;x<objects.length;x++) {
		if(objects[x].isRoad()) {
			lastRoadObject=objects[x];
		}
	}
	for(var x=0;x<6;x++) {
		addObject(new Object("road", lastRoadObject.x, lastRoadObject.y-(roadImage.height*(x+1))));
	}
	players[0].spawn();
}
function setImg(i) {
	img=i;
	switch(img) {
	case "gameOver":
		gameOverCounter=100;
		break;
	case "game":
		set();
		ctx.fillStyle="#ffffff";
		ctx.font="20px Arial";
		break;
	case "title":
		reset();
		break;
	default:
	}
}
setInterval(function(){control()}, 10);
