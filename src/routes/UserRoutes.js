const routes = require("express").Router()

const userController = require("../controllers/UserController")
routes.get("/users",userController.getAllUsers)
// routes.post("/user",userController.addUser)
routes.delete("/users/:id",userController.deleteUser)
routes.get("/users/:id",userController.getUserById)

routes.post("/users/login",userController.login)
routes.post("/users/signup",userController.signup)


module.exports=routes