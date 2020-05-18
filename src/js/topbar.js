const remote = require('electron').remote;

function windowManage(action) {
    let window = remote.getCurrentWindow();
	case (action) {
	    case 1: window.minimize(); break;
       	case 2: if (!window.isMaximized()) return window.maximize();
       	window.unmaximize(); break;
		case 3: window.close(); break;
    };
};