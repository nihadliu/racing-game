function keyDown(e) {
	switch(e.keyCode) {
	case 65:
		switch(img) {
		case "game":
			players[0].left=true;
			break;
		default:
		}
		break;
	case 68:
		switch(img) {
		case "game":
			players[0].right=true;
			break;
		default:
		}
		break;
	case 83:
		switch(img) {
		case "game":
			players[0].brake=true;
			break;
		default:
		}
		break;
	case 87:
		switch(img) {
		case "game":
			players[0].gas=true;
			break;
		default:
		}
		break;
	default:
	}
}