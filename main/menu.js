const {BrowserWindow, dialog, Menu} = require('electron');

class ApplicationMenu {

    constructor(mainWindow) {
        this.mainWindow = mainWindow;
        this.menu = Menu.buildFromTemplate(this.menuTemplate);
    }

    openBrowserContent = (url) => {
        const browser = new BrowserWindow({
            parent: this.mainWindow,
            autoHideMenuBar: true,
        });
        browser.loadURL(url);
    };

    getMenu = () => {
        return this.menu;
    };

    menuTemplate = [
        {
            label: "Fichier",
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'delete'},
                {role: 'selectall'},
                {role: 'quit'},
            ],
        },
        {
            label: "Dev",
            submenu: [
                {role: 'toggleDevTools'}
            ]
        },
        {
            label: "Actions",
            submenu: [
                {
                    label: "Aller sur Google",
                    accelerator: "ctrl+g",
                    click: () => this.openBrowserContent("https://www.google.fr"),
                },
                {
                    label: "Afficher un message",
                    accelerator: "ctrl+m",
                    click: () => {
                        dialog.showMessageBox(this.mainWindow, {
                            title: "Hello World !",
                            message: "Ceci est un simple Hello world, n'en tenez pas compte et faites quelque chose d'intéressant à la place.",
                        })
                    },
                }
            ],
        }
    ];
}

module.exports = ApplicationMenu;