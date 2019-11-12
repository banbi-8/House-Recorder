import { app } from 'electron';
import { Window } from "../util/window";

app.on('ready', () => {
	Window.createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', (_e, hasVisibleWindows) => {
	if (!hasVisibleWindows) {
		Window.createWindow();
	}
});
