const Tray = require('electron').Tray;
const Menu = require('electron').Menu;

class TrayIcon {

    /**
     * @param mainWindow
     * @param app
     */
    constructor(mainWindow, app) {
        this.trayQuitting = false;
        this.contextual = [
            {
                label: "Quitter",
                click: () => {
                    this.trayQuitting = true;
                    app.quit();
                },
            },
            {
                label: "Ouvrir",
                click: () => mainWindow.show(),
            },
            {type: 'separator'},
            {role: 'copy'}
        ];
    }

    /**
     * Attach tray icon to the app.
     */
    init = function (image) {
        const tray = new Tray(image);
        tray.setContextMenu(Menu.buildFromTemplate(this.contextual));
    }

    /**
     * @param value
     */
    setIsTrayQuitting = function(value) {
        this.trayQuitting = value;
    }

    getIsTrayQuitting() {
        return this.trayQuitting;
    }
}

module.exports = TrayIcon;