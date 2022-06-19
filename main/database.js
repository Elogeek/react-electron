const {Sequelize, DataTypes} = require('sequelize');

// Defines database connection.
class Database {

    constructor(databasePath) {
        this.connected = false;
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: databasePath,
        });

        this.sequelize.authenticate()
            .then(() => this.connected = true)
        ;
        this.initModels();
    }

    /**
     * Initialize models.
     */
    initModels = () => {
        this.Text = this.sequelize.define('Text', {
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        this.Text.sync({force: true});
    }


    initRequests = (ipcMain) => {
        // Adding new Text
        ipcMain.handle('database-add-text', async (event, textData) => {
            await this.Text.create({
                content: textData,
            });
        });
    }
}

module.exports = Database;