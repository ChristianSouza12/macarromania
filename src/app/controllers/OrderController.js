const Yup = require("yup");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../schemas/Order");
const User = require("../models/User")

class OrderController {
    async store(request, response) {
        const schema = Yup.object().shape({
            products: Yup.array()
                .required()
                .of(
                    Yup.object().shape({
                        id: Yup.number().required(),
                        quantity: Yup.number().required()
                    })
                )
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const productsId = request.body.products.map(product => product.id);

        const updatedProducts = await Product.findAll({
            where: { id: productsId },
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["name"]
                }
            ]
        });

        const editedProducts = updatedProducts.map(product => {
            const productIndex = request.body.products.findIndex(
                requestProduct => requestProduct.id === product.id
            );

            return {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category.name,
                url: product.url,
                quantity: request.body.products[productIndex].quantity
            };
        });

        const order = {
            user: {
                id: request.userId,
                name: request.userName
            },
            products: editedProducts,
            status: "Pedido realizado"
        };

        const createdOrder = await Order.create(order);

        return response.status(201).json(createdOrder);
    }
    async index(request,response){
        const orders = await Order.find()

        return response.json(orders)
    }

    async update(request,response){
        const schema = Yup.object().shape({
            status: Yup.string().required()

        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }
        const {admin: isAdmin} = await User.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

        const {id} = request.params
        const {status} = request.body

        try{
            await Order.updateOne({_id:id},{status})

        }catch(error){
            return response.status(400).json({error:error.message})
        }




        return response.json({message:" Status was updated."})
    }


}

module.exports = new OrderController();