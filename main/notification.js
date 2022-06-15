const Notification = require('electron').Notification;

const ipcNotification = {
    init: (ipcMain, icon) => {
        // Affichage d'une notification
        ipcMain.on('show-notification', (event, configuration) => {
            const notification = new Notification({
                ...configuration,
                icon: icon
            });
            notification.show();
            notification.on('click', () => event.sender.send('show-notification-clicked'));
        });
    }
}

module.exports = ipcNotification;