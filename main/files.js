// Writing file.
const {dialog} = require('electron');

const ipcFile = {

    init: (mainWindow, ipcMain, fs) => {

        ipcMain.handle('save-file', async (event, content) => {
            dialog.showSaveDialog(mainWindow, {
                title: "Choisissez une destination",
                buttonLabel: "Valider le choix",
                properties: [
                    'showHiddenFiles',
                    'showOverwriteConfirmation'
                ],
            })
                .then(result => {
                    if (!result.canceled) {
                        try {
                            fs.writeFileSync(result.filePath, content);
                        } catch (err) {
                            dialog.showErrorBox('Erreur', "Une erreur est survenue");
                        }
                    }
                })
                .catch(err => () => dialog.showErrorBox('Erreur', "Une erreur est survenue"))
            ;
        });


        // Reading file.
        ipcMain.handle('read-file', (event) => {
            const result = dialog.showOpenDialogSync(mainWindow, {
                title: "Choisissez un fichier",
                buttonLabel: "Faites un choix",
                properties: [
                    'openFile', // Ouvre uniquement les fichiers
                ],
                filters: [
                    {name: "Fichiers web", extensions: ['txt', 'js', 'css', 'json']}
                ]
            });

            if (result) {
                console.log(result);
                try {
                    const data = fs.readFileSync(result[0]);
                    return data.toString();
                } catch (err) {
                    dialog.showErrorBox("Erreur", "Impossible de lire le fichier" + err);
                }
            }
        });
    }
}

module.exports = ipcFile;