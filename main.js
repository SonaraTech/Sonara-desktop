const { app, BrowserWindow } = require('electron')

function Window() {
    const Win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    Win.loadFile('src/index.html')
}

app.whenReady().then(Window);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) Window();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});