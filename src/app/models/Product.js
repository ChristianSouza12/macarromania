const { Sequelize, Model } = require("sequelize");

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                price: Sequelize.INTEGER, // Corrigido para INTEGER
                path: Sequelize.STRING,
                offer:Sequelize.BOOLEAN,
                url:{
                    type: Sequelize.VIRTUAL,
                    get(){
                        return `http://localhost:3001/product-file/${this.path}`
                    }
                }
            },
            {
                sequelize
            }
        );
        return this
    }
    static associate(models){
        this.belongsTo(models.Category,{foreignKey:"category_id", as:"category" })
    }
}

module.exports = Product; // Corrigido para utilizar module.exports
