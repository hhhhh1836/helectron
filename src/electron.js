const { app, window, BrowserWindow } = require('electron');
const { connect, Client, setActivity, destroy } = require('discord-rpc');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		frame: false,
		icon: `${__dirname}/icon.ico`,
		title: 'H Clicker',
		webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.setMenuBarVisibility(false);

	require('update-electron-app'), {
		repo: 'h-projects/h'
	};

	// and load the index.html of the app.
	mainWindow.loadFile(`${__dirname}/index.html`);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);


// Quit when all windows are closed.
app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// create a new rpc client and track clicks
const RPC = new Client({ transport:'websocket'});
const clicks = await(mainWindow.webContents.executeJavaScript('UpdateHCount'));

// create id and scopes
const id = '712355400866988054';
const scopes = ['rpc', 'rpc.api'];

// connect when app is ready
app.on('ready', () => {
	connect();
});

// set activity
setActivity({
	details: `Clicking H`,
	state: `${clicks} times(s)`,
	largeImageKey: 'clicker',
	largeImageText: 'H?',
	smallImageKey: 'framecon',
	smallImageText: 'Due to discord API limits, the h count updates every 15 seconds',
	instance: false
});

// set activty when rpc is ready
RPC.on('ready', () => {
	setActivity();

	// set interval
	setInterval(() => {
		setActivity();
	  }, 15e3);
});

// destroy when all windows are closed (closes connection)
app.on('window-all-closed', () => {
	destroy();
});

// login
RPC.login({ id, scopes });