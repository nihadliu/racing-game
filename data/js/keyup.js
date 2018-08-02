function keyUp(e) {
	switch(e.keyCode) {
	case 8:
	case 27:
		switch(img) {
		case "aboutGame":
			setImg("title");
			break;
		case "instructions":
			setImg("title");
			break;
		default:
		}
		break;
	case 13:
		switch(img) {
		case "raceOver":
			setImg("title");
			break;
		case "title":
			setImg("game");
			break;
		default:
		}
		break;
	case 65:
		switch(img) {
		case "game":
			players[0].left=false;
			break;
		case "title":
			setImg("aboutGame");
			break;
		default:
		}
		break;
	case 68:
		switch(img) {
		case "game":
			players[0].right=false;
			break;
		default:
		}
		break;
	case 73:
		switch(img) {
		case "title":
			setImg("instructions");
			break;
		default:
		}
		break;
	case 83:
		switch(img) {
		case "game":
			players[0].brake=false;
			break;
		default:
		}
		break;
	case 87:
		switch(img) {
		case "game":
			players[0].gas=false;
			break;
		default:
		}
		break;
	default:
	}
}