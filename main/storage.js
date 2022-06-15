const ElectronStorage = require('electron-store');
const {key} = require("wait-on/exampleConfig");

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

        // Get value
        this.ipcMain.handle("storage-get", (event, key) => {
            return this.storage.get(key);
        })

        // Delete value
        this.ipcMain.handle("storage-delete", (event, key) => {
            this.storage.delete(key);
            return this.storage.get(key) === undefined;
        });
    }
}

module.exports = ipsStore;