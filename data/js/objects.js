var objects=new Array();
var objectsURL="data/img/objects/";
var fuelImage=new Image();
	fuelImage.src=objectsURL+"fuel.png";
var grassImage=new Image();
	grassImage.src=objectsURL+"grass.png";
var house1Image=new Image();
	house1Image.src=objectsURL+"house1.png";
var house2Image=new Image();
	house2Image.src=objectsURL+"house2.png";
var roadImage=new Image();
	roadImage.src=objectsURL+"road.png";
var treeImage=new Image();
	treeImage.src=objectsURL+"tree.png";
var grassY=0;
function Object(name, x, y) {
	this.name=name;
	this.x=x;
	this.y=y;
	this.visible=true;
	this.canMoveThrough=function() {
		if(this.isPickUp()) {
			return true;
		}
		else {
			return this.isRoad();
		}
	}
	this.canPickUp=function() {
		return (this.isPickUp() && this.visible);
	}
	this.isPickedUp=function(x, y, w, h) {
		var objectImage=getObjectImage(this.name);
		var pickedUp=(x+w>=this.x && x<=this.x+objectImage.width
			&& y+h>=this.y && y<=this.y+objectImage.height);
		if(pickedUp) {
			this.visible=false;
		}
		return pickedUp;
	}
	this.isPickUp=function() {
		return this.name=="fuel";
	}
	this.isRoad=function() {
		return this.name=="road";
	}
	this.isVisible=function() {
		var objectImage=getObjectImage(this.name);
		return (this.x+objectImage.width>=0 && this.y+objectImage.height>=0
		&& this.x<=800 && this.y<=600);
	}
}
function addObject(object) {
	objects[objects.length]=object;
}
function controlObjects() {
	var speed=players[0].getSpeed();
	moveExplosionsDown(speed);
	moveObjectsDown(speed);
}
function getFinish() {
	var y=objects[0].y;
	for(var x=1;x<objects.length;x++) {
		if(objects[x].y<y) {
			y=objects[x].y;
		}
	}
	return y;
}
function getLastObject() {
	return objects[objects.length-1];
}
function getNearestRoad(player) {
	for(var x=0;x<objects.length;x++) {
		if(objects[x].isRoad()) {
			if(objects[x].y+getObjectImage(objects[x].name).height>=player.y && objects[x].y<=player.y+getVehicleImage(player.name).height) {
				return objects[x];
			}
		}
	}
	return null;
}
function getObjectImage(name) {
	switch(name) {
	case "fuel":
		return fuelImage;
	case "grass":
		return grassImage;
	case "house1":
		return house1Image;
	case "house2":
		return house2Image;
	case "road":
		return roadImage;
	case "tree":
		return treeImage;
	default:
		return null;
	}
}
function moveObjectsDown(speed) {
	if(speed>0) {
		if(grassY>=grassImage.height) {
			grassY=(grassY+speed)%grassImage.height;
		}
		else {
			grassY+=speed;
		}
		for(var x=0;x<objects.length;x++) {
			if(objects[x].y<=600) {
				objects[x].y+=speed;
			}
		}
	}
}