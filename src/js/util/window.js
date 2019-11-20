import {BrowserWindow} from 'electron';

const Window = {
	init: function () {
		const win = new BrowserWindow({
			width: 1000,
			height: 750,
			minWidth: 1000,
			minHeight: 750,
			webPreferences: {
				nodeIntegration: true
			},
			show: false
		});

		return win;
	},

	createWindow: function () {
		let win = this.init(win);
		win.show();

		// ここどうにかしたい
		win.loadURL(`file://${__dirname}/../../../index.html`);
		
		win.on('close', () => {
			win = null;
		});
	},
}

export {Window};
