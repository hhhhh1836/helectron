const { connect, Client, setActivity, destroy } = require('discord-rpc');
const { app, window, mainWindow } = require('electron');
const clicks = await(mainWindow.webContents.executeJavaScript('UpdateHCount'));

const id = '712355400866988054';
const scopes = ['rpc', 'rpc.api'];
const RPC = new Client({ transport:'websocket'});

app.on('ready', () => {
	connect();
});

setActivity({
	details: `Clicker H ${clicks} time(s)`,
	state: 'in slither party',
	largeImageKey: 'clicker',
	largeImageText: 'H?',
	smallImageKey: 'framecon',
	smallImageText: 'Due to discord API limits, the h count updates every 15 seconds',
	instance: false
});


RPC.on('ready', () => {
	setActivity();

	setInterval(() => {
		setActivity();
	  }, 15e3);
});

app.on('window-all-closed', () => {
	destroy();
});

RPC.login({ id, scopes });
