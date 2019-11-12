import {BrowserWindow} from 'electron';

const Window = {
	createWindow: function () {
		let win;
		win = new BrowserWindow({
			webPreferences: {
				nodeIntegration: true
			}
		});

		// ここどうにかしたい
		win.loadURL(`file://${__dirname}/../../../index.html`);
		
		win.on('close', () => {
			win = null;
		});
	},
}

export {Window};
