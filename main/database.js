const  {Sequelize} = require('sequelize');

class Database {

    constructor(databasePath) {

        this.connected = false;
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: databasePath,
        });

        this.sequelize.authenticate()
            .then(()=>this.connected = true)
        ;
        this.initModels();
    }

    /**
     * Initialize models
     */
    initModels = () => {
        this.Text = this.sequelize.define('Text', {
            content: {
                type: Database.STRING,
                allowNull: false,
            },
        });
        this.Text.sync({force: true});
    }

    initRequests = (ipcMain) => {
        // Adding new text
        ipcMain.handle('database-add-text', async (event, textData) => {
            await this.Text.create( {
                content: textData,
            });
        });
    }

}

module.exports = Database;