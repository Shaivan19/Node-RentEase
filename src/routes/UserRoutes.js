const routes = require("express").Router()
const userController = require("../controllers/UserController")
const { verifyToken, isLandlord, isTenant } = require("../middleware/authMiddleware")

// Public routes
routes.post("/users/login", userController.login)
routes.post("/users/signup", userController.signup)

// Protected routes
routes.get("/users", verifyToken, userController.getAllUsers)
routes.delete("/users/:id", verifyToken, userController.deleteUser)
routes.get("/users/:id", verifyToken, userController.getUserById)

// Role-specific routes
routes.get("/landlord/dashboard", verifyToken, isLandlord, (req, res) => {
    res.json({ message: "Landlord dashboard accessed successfully" })
})

routes.get("/tenant/dashboard", verifyToken, isTenant, (req, res) => {
    res.json({ message: "Tenant dashboard accessed successfully" })
})

module.exports = routes