const Sequelize = require("sequelize");
const User = require("../app/models/User");
const configDatabase = require("../config/database");
const Product = require("../app/models/Product");
const Category = require("../app/models/Category");
const models = [User, Product, Category];

const mongoose = require('mongoose');

class Database {
    constructor() {
        this.init();
        this.associate();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize("postgresql://postgres:cLZkVQFcvhDKCFdkTayvXAvBmsWuqhJU@monorail.proxy.rlwy.net:55565/railway");

        // Inicializando os modelos
        models.forEach(model => {
            model.init(this.connection);
        });
    }

    associate() {
        // Se houver associações entre os modelos, você pode inicializá-las aqui
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }

    mongo() {
        // Inicializa a conexão com o MongoDB
        mongoose.connect("mongodb://mongo:NYBMyprwQdCxSaOZItmbFshhuFcOEPrg@monorail.proxy.rlwy.net:45152", 
           
        );
    }
}

module.exports = new Database();
