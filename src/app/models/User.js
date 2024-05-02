const { Sequelize, Model } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL, // Corrigido para Sequelize.VIRTUAL
                password_hash: Sequelize.STRING,
                admin: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );
        this.addHook("beforeSave", async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 10); // Corrigido para user.password_hash
            }
        });
        return this;
    }

    checkPassword(password){
      return  bcrypt.compare(password,this.password_hash)
    }
}

module.exports = User;
