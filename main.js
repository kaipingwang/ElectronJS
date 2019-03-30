// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const { ipcMain } = require('electron');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)


  mainWindow.webContents.on('did-finish-load', ()=>{
	let code = ``;
	mainWindow.webContents.executeJavaScript(code);
  });

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', () => {

  })

  mainWindow.on('close', (e) => {
		  mainWindow.webContents.send('app-close');
		  e.preventDefault();
	});

	ipcMain.on('closed', (res, arg)=> {
		console.log(arg);
		mainWindow = null;
		app.quit();
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open

  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
