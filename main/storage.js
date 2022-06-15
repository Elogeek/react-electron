const ElectronStorage = require('electron-store');

class ipsStore {

    constructor(ipcMain) {
        this.storage = new ElectronStorage();
        this.ipcMain = ipcMain;
    }

    init = () => {
        // Set value
        this.ipcMain.handle("storage-set", (event, key, value) => {
            this.storage.set(key, value);
            return this.storage.get(key) !== undefined;
        });
    }
}