const {contextBridge, ipcRenderer} = require('electron');

require('./dialog');
require('./files');
require('./logger');
require('./storage');

contextBridge.exposeInMainWorld('menu', {
    'onOpenDialogClick': (fn) => ipcRenderer.on('open-dialog-clicked', fn),
});

contextBridge.exposeInMainWorld('notification', {
    show: (config, callable = () => {}) => {
        ipcRenderer.send('show-notification', config);
        ipcRenderer.once('show-notification-clicked', callable);
    },
});
