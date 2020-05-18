const remote = require('electron').remote;

function windowAction(action) {
    let window = remote.getCurrentWindow();
	switch (action) {
	    case 1: window.minimize(); break;
       	case 2: if (!window.isMaximized()) return window.maximize();
       	window.unmaximize(); break;
		case 3: window.close(); break;
    };
};