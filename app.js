// // console.log("Hello")
// // var user =require("./user")
// // console.log(user)
// // console.log(user.userName)
// // console.log(user.userAge)

// // user.printUserData(100)




const express = require("express");
const mongoose = require("mongoose");
const cors= require("cors");

const app = express();

// Middleware
app.use(express.json()); //  Allow JSON parsing
app.use(cors())

// Routes
const roleRoutes = require("./src/routes/RoleRoutes");
const userRoutes = require("./src/routes/UserRoutes")
app.use("/api", roleRoutes); //  Add API prefix
app.use(userRoutes);

// Sample routes
// app.get("/test", (req, res) => {
//     console.log("API called");
//     res.send("Test API called");
// });

// app.get("/user", (req, res) => {
//     console.log("Data displayed");
//     res.json({
//         message: "API called",
//         data: ["Goku", "Vegeta", "Gohan"]
//     });
// });


mongoose.connect("mongodb://127.0.0.1:27017/SAMPLE_PROJECT")
    .then(() => {
        console.log("Database connected...");

// app.get("/employees", (req, res) => {
//     console.log("Employee data displayed");
//     res.json({
//         message: "Employee API called",
//         data: [
//             { id: 1, name: "John Doe", position: "Software Engineer", department: "IT", salary: "5000000" },
//             { id: 2, name: "Jane Smith", position: "Project Manager", department: "Management", salary: "3000000" },
//             { id: 3, name: "Alice Johnson", position: "HR Executive", department: "Human Resources", salary: "2000000" }
//         ]
//     });
// });

// MongoDB Connection & Server Start
const PORT = 1909;
        // Start server only after DB is connected 
        app.listen(PORT, () => {
            console.log("Server started on port:", PORT);
        });
    })
   