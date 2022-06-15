const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('storage', {
    get: (key) => ipcRenderer.invoke('storage-get', key),
    set: (key, value) => ipcRenderer.invoke('storage-set', key, value),
    delete: (key) => ipcRenderer.invoke('storage-delete', key),
});
