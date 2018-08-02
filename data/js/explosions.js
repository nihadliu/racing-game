var explosions=new Array();
var explosionsURL="data/img/explosions/";
var explosionImages=new Array();
explosionImages[0]=new Image();
explosionImages[0].src=explosionsURL+"1.png";
explosionImages[1]=new Image();
explosionImages[1].src=explosionsURL+"2.png";
explosionImages[2]=new Image();
explosionImages[2].src=explosionsURL+"3.png";
explosionImages[3]=new Image();
explosionImages[3].src=explosionsURL+"4.png";
function Explosion() {
	this.x=0;
	this.y=0;
	this.active=false;
	this.counter=0;
	this.multiplier=0;
	this.number=0;
	this.control=function() {
		if(this.active) {
			if(this.counter==5) {
				if(this.number==3) {
					this.number=0;
					this.active=false;
				}
				else {
					this.number++;
				}
				this.counter=0;
			}
			else {
				this.counter++;
			}
		}
	}
	this.set=function(x, y, multiplier) {
		this.x=x;
		this.y=y;
		this.multiplier=multiplier;
		this.counter=0;
		this.number=0;
		this.active=true;
	}
}
function resetExplosions() {
	for(var x=0;x<10;x++) {
		explosions[x]=new Explosion();
	}
}
function setExplosion(x, y, multiplier) {
	for(var i=0;i<explosions.length;i++) {
		if(!explosions[i].active) {
			explosions[i].set(x, y, multiplier);
			break;
		}
	}
}
function moveExplosionsDown(speed) {
	if(speed>0) {
		for(var x=0;x<explosions.length;x++) {
			if(explosions[x].active) {
				explosions[x].y+=speed;
			}
		}
	}
}