const { app, BrowserWindow } = require('electron')

const url = require('url')
const path = require('path')
let w

function makeWindow() {
    w = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        hasShadow: true,
        thickFrame: true,
        webPreferences: {
            nodeIntegration: true,
            textAreasAreResizable: true
        }
    })

    w.setMenu(null)

    w.loadURL(
        url.format({
            pathname: path.join(__dirname, `./dist/index.html`),
            protocol: 'file:',
            slashes: true
        })
    )

    w.on('closed', () => w = null)

}

app.on('ready', makeWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (w === null) makeWindow()
})
