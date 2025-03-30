const routes = require("express").Router()
const userController = require("../controllers/UserController")
const { verifyToken, isLandlord, isTenant } = require("../middleware/authMiddleware")

// Public routes
routes.post("/users/login", userController.login)
routes.post("/users/signup", userController.signup)
routes.post("/users/reset-password-request", userController.requestPasswordReset)
routes.post("/users/reset-password", userController.resetPassword)

// Protected routes
routes.get("/users", verifyToken, userController.getAllUsers)
routes.delete("/users/:id", verifyToken, userController.deleteUser)
routes.get("/users/:id", verifyToken, userController.getUserById)

// User Profile routes
routes.get("/profile", verifyToken, userController.getUserProfile)
routes.put("/profile", verifyToken, userController.updateUserProfile)
routes.put("/profile/password", verifyToken, userController.updatePassword)
routes.post("/profile/avatar", verifyToken, userController.upload.single('avatar'), userController.updateAvatar)

// Role-specific routes
routes.get("/landlord/dashboard", verifyToken, isLandlord, (req, res) => {
    res.json({ message: "Landlord dashboard accessed successfully" })
})

routes.get("/tenant/dashboard", verifyToken, isTenant, (req, res) => {
    res.json({ message: "Tenant dashboard accessed successfully" })
})

module.exports = routes