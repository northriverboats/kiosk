const {app, globalShortcut, BrowserWindow} = require('electron')
const Store = require('electron-store')
const store = new Store()

let mainWindow

function createWindow () {
  const url = store.get('url') || 'https://weboas.is/'
  store.set('url', url)

  mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {enableDeviceEmulation: {screenSize: {width: 1980, height: 1080}}}})
  mainWindow.setFullScreen(true)
  mainWindow.loadURL(url)

  globalShortcut.register('CommandOrControl+Q', () => {
    console.log('CoomandOrControl+Q is pressed')
    app.quit()
  })

  globalShortcut.register('CommandOrControl+W', () => {
    console.log('CoomandOrControl+R is pressed')
    mainWindow.reload()
  })


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}


app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
