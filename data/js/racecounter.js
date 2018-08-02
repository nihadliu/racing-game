var textURL="data/img/text/";
var number1Image=new Image();
	number1Image.src=textURL+"1.png";
var number2Image=new Image();
	number2Image.src=textURL+"2.png";
var number3Image=new Image();
	number3Image.src=textURL+"3.png";
var goImage=new Image();
	goImage.src=textURL+"go.png";
function RaceCounter() {
	this.counter=0;
	this.raceCounter=0;
	this.control=function() {
		if(this.raceCounter>=-1) {
			if(this.counter==0) {
				this.raceCounter--;
				this.counter=100;
			}
			else {
				this.counter--;
			}
		}
	}
	this.getImage=function() {
		switch(this.raceCounter) {
		case 1:
			return number1Image;
		case 2:
			return number2Image;
		case 3:
			return number3Image;
		default:
			return goImage;
		}
	}
	this.reset=function() {
		this.counter=100;
		this.raceCounter=3;
	}
}