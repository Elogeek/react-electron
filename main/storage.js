const ElectronStorage = require('electron-store');

class ipsStore {

    constructor() {
        this.storageTemplate = {
            theme: {
                default: 'light',
                type: 'string',
                pattern: "light|dark",
            },
            data_key: {
                default: 15,
                type: "number",
                minimum: 0,
                maximum: 100,
            },
        };

        this.storage = new ElectronStorage({
            schema: this.storageTemplate,
        });
    }


    init = (ipcMain) => {
        // Set value
        ipcMain.handle("storage-set", async (event, key, value) => {
            try {
                this.storage.set(key, value);
                return this.storage.get(key) !== undefined;
            }
            catch {
                console.log("Le type de données fourni pour " + key + " n'est pas bon, le type correct est: " + this.storageTemplate[key].type);
            }

        });

        // Get value
        ipcMain.handle("storage-get", async (event, key) => {
            return this.storage.get(key);
        })

        // Delete value
        ipcMain.handle("storage-delete", async (event, key) => {
            this.storage.delete(key);
            return this.storage.get(key) === undefined;
        });
    }
}

module.exports = ipsStore;