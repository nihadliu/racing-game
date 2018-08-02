var players=new Array();
var vehiclesURL="data/img/vehicles/";
var carImage=new Image();
	carImage.src=vehiclesURL+"car.png";
var busImage=new Image();
	busImage.src=vehiclesURL+"bus.png";
var playerImage=new Image();
	playerImage.src=vehiclesURL+"player.png";
var motorcycleImage=new Image();
	motorcycleImage.src=vehiclesURL+"motorcycle.png";
var tractorImage=new Image();
	tractorImage.src=vehiclesURL+"tractor.png";
function Player(name, x, y) {
	this.name=name;
	this.destroyed=false;
	this.driver=0;
	this.x=x;
	this.y=y;
	this.speed=0;
	this.maxSpeed=0;
	this.gas=false;
	this.brake=false;
	this.left=false;
	this.right=false;
	this.fuel=100;
	this.outOfFuelCounter=100;
	this.shield=false;
	this.shieldCounter=0;
	this.visibilityCounter=0;
	this.visible=true;
	this.activateShield=function() {
		this.visibilityCounter=0;
		this.shield=true;
		this.shieldCounter=100;
	}
	this.addFuel=function() {
		this.fuel+=20;
	}
	this.canMoveLeft=function() {
		return this.x>0;
	}
	this.canMoveRight=function() {
		return this.x+getVehicleImage(this.name).width<800;
	}
	this.centerX=function() {
		return this.x+(getVehicleImage(this.name).width/2);
	}
	this.centerY=function() {
		return this.y+(getVehicleImage(this.name).height/2);
	}
	this.control=function() {
		if(!this.destroyed) {
			if(this.shield) {
				if(this.visibilityCounter==5) {
					this.visible=!this.visible;
					this.visibilityCounter=0;
				}
				else {
					this.visibilityCounter++;
				}
				if(this.shieldCounter>0) {
					this.shieldCounter--;
				}
				else {
					this.shield=false;
					this.visible=true;
				}
			}
			if(this.name=="player") {
				if(this.y<=finish) {
					setImg("raceOver");
				}
			}
			switch(this.driver) {
			case 1:
				var nearestRoad=getNearestRoad(this);
				if(nearestRoad!=null) {
					if(this.x<nearestRoad.x+10 && this.left) {
						this.left=false;
						this.right=true;
						break;
					}
					if(this.x+getVehicleImage(this.name).width>nearestRoad.x+getObjectImage(nearestRoad.name).width-10 && this.right) {
						this.left=true;
						this.right=false;
						break;
					}
				}
				break;
			case 2:
				var vehicleImage=getVehicleImage(this.name);
				if(this.x+vehicleImage.width<=players[0].x) {
					this.left=false;
					this.right=true;
					break;
				}
				if(this.x>=players[0].x+vehicleImage.width) {
					this.left=true;
					this.right=false;
					break;
				}
				break;
			default:
				if(this.name!="player") {
					this.left=false;
					this.right=false;
				}
			}
		}
	}
	this.controlFuel=function() {
		if(this.fuel>100) {
			this.fuel=100;
		}
		if(this.fuel>0) {
			this.fuel-=0.02;
		}
		if(this.fuel<0) {
			this.fuel=0;
		}
		if(this.fuel==0) {
			if(this.outOfFuelCounter>0) {
				this.outOfFuelCounter--;
			}
			else {
				setImg("gameOver");
			}
		}
	}
	this.crash=function() {
		setExplosion(this.centerX(), this.centerY(), 4);
		this.speed=0;
		if(this.name=="player") {
			this.fuel-=15;
			this.spawn();
			this.activateShield();
		}
		else {
			this.gas=false;
			this.left=false;
			this.right=false;
			this.destroyed=true;
		}
	}
	this.getMaxSpeed=function() {
		if(this.isOnRoad()) {
			return this.maxSpeed;
		}
		else {
			return this.maxSpeed/2;
		}
	}
	this.getPosition=function() {
		var position=1;
		for(var i=1;i<players.length;i++) {
			if(!players[i].destroyed) {
				if(players[i].y<=this.y) {
					position++;
				}
			}
		}
		return position;
	}
	this.getSpeed=function() {
		return this.speed/10;
	}
	this.getSteeringWheelSpeed=function() {
		if(this.name=="player") {
			if(this.speed<=50) {
				return this.getSpeed();
			}
			else {
				return 5;
			}
		}
		else {
			return 2;
		}
	}
	this.isOnRoad=function() {
		for(var x=0;x<objects.length;x++) {
			if(objects[x].isRoad()) {
				if(this.isTouchedWithObject(objects[x])) {
					return true;
				}
			}
		}
		return false;
	}
	this.isTouchedWithObject=function(object) {
		var vehicleImage=getVehicleImage(this.name);
		var objectImage=getObjectImage(object.name);
		return this.x+vehicleImage.width>=object.x && this.x<=object.x+objectImage.width
		&& this.y+vehicleImage.height>=object.y && this.y<=object.y+objectImage.height;
	}
	this.isTouchedWithPlayer=function(player) {
		var vehicle1Image=getVehicleImage(this.name);
		var vehicle2Image=getVehicleImage(player.name);
		return this.x+vehicle1Image.width>=player.x && this.x<=player.x+vehicle2Image.width
		&& this.y+vehicle1Image.height>=player.y && this.y<=player.y+vehicle2Image.height;
	}
	this.isVisible=function() {
		var vehicleImage=getVehicleImage(this.name);
		return this.x+vehicleImage.width>=0 && this.y+vehicleImage.height>=0
		&& this.x<=800 && this.y<=600;
	}
	this.moveLeft=function() {
		this.x-=this.getSteeringWheelSpeed();
	}
	this.moveRight=function() {
		this.x+=this.getSteeringWheelSpeed();
	}
	this.spawn=function() {
		var nearestRoad=getNearestRoad(this);
		if(nearestRoad!=null) {
			this.x=nearestRoad.x+(getObjectImage(nearestRoad.name).width/2)-(getVehicleImage(this.name).width/2);
		}
	}
	switch(this.name) {
	case "player":
		this.maxSpeed=200;
		break;
	default:
		this.gas=true;
		this.maxSpeed=100;
		this.driver=Math.floor(Math.random()*3);
		this.right=true;
	}
}
function addPlayer(player) {
	players[players.length]=player;
}
function controlPlayers() {
	players[0].controlFuel();
	moveVehiclesDown(players[0].getSpeed());
	var vehicleImage=getVehicleImage(players[0].name);
	for(var x=0;x<objects.length;x++) {
		if(objects[x].canPickUp()) {
			if(objects[x].isVisible()) {
				if(objects[x].isPickedUp(players[0].x, players[0].y, vehicleImage.width, vehicleImage.height)) {
					players[0].addFuel();
				}
			}
		}
	}
	for(var x=0;x<players.length;x++) {
		if(players[x].left && !players[x].right) {
			if(players[x].canMoveLeft()) {
				players[x].moveLeft();
			}
		}
		if(!players[x].left && players[x].right) {
			if(players[x].canMoveRight()) {
				players[x].moveRight();
			}
		}
		players[x].control();
		if(!players[x].destroyed && !players[x].shield) {
			if(players[x].isVisible()) {
				var crash=false;
				for(var y=0;y<players.length;y++) {
					if(x!=y) {
						if(!players[y].destroyed && !players[y].shield) {
							if(players[y].isVisible()) {
								if(players[x].isTouchedWithPlayer(players[y])) {
									players[x].crash();
									players[y].crash();
									crash=true;
									break;
								}
							}
						}
					}
				}
				if(!crash) {
					for(var y=0;y<objects.length;y++) {
						if(!objects[y].canMoveThrough()) {
							if(objects[y].isVisible()) {
								if(players[x].isTouchedWithObject(objects[y])) {
									players[x].crash();
									break;
								}
							}
						}
					}
				}
			}
		}
		if(players[x].gas && !players[x].brake && players[x].fuel>0) {
			if(players[x].speed<players[x].getMaxSpeed()) {
				players[x].speed+=0.5;
			}
			else {
				players[x].speed-=0.5;
			}
		}
		else if(!players[x].gas && players[x].brake) {
			if(players[x].speed>0) {
				players[x].speed-=2;
			}
		}
		else {
			if(players[x].speed>0) {
				players[x].speed-=0.5;
			}
		}
		if(players[x].speed<0) {
			players[x].speed=0;
		}
	}
}
function getRandomVehicleName() {
	switch(Math.floor(Math.random()*5)) {
	case 0:
		return "car";
	case 1:
		return "bus";
	case 2:
		return "motorcycle";
	default:
		return "tractor";
	}
}
function getVehicleImage(name) {
	switch(name) {
	case "car":
		return carImage;
	case "bus":
		return busImage;
	case "player":
		return playerImage;
	case "motorcycle":
		return motorcycleImage;
	case "tractor":
		return tractorImage;
	default:
		return null;
	}
}
function moveVehiclesDown(speed) {
	finish+=speed;
	for(var x=1;x<players.length;x++) {
		if(!players[x].destroyed) {
			players[x].y+=speed-players[x].getSpeed();
		}
	}
}