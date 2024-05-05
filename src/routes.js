const { Router } = require("express");
const routes = new Router();
const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const ProductController = require("./app/controllers/ProductController");
const multer = require("multer")
const multerConfig = require('./config/multer')

const authMiddleware = require("./app/middlewares/auth")

const CategoryController = require("./app/controllers/CategoryController")
const OrderController = require("./app/controllers/OrderController")


const upload = multer(multerConfig)



    routes.get("/" ,(req,res)  => {
        return res.json({message:"Hello to my fist API"})
    })


routes.post("/users",UserController.store)
routes.post("/sessions",SessionController.store)

routes.use(authMiddleware) // sera chamado por todas as rotas abaixo

routes.post("/products",upload.single("file") , ProductController.store)
routes.get("/products", ProductController.index) 
routes.put("/products/:id", upload.single("file"),ProductController.update)


routes.post("/categories",upload.single("file") , CategoryController.store)
routes.get("/categories", CategoryController.index) 
routes.put("/categories/:id",upload.single("file"), CategoryController.update)



routes.post("/orders" , OrderController.store)
routes.put("/orders/:id" , OrderController.update)
routes.get("/orders" , OrderController.index)







module.exports = routes;