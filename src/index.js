
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const productRoute = require('./routes/productRouter')
const cors = require("cors");
// const { getProducts, getProduct } = require('./Controllers/dataControllers')
app.use(express.json())
app.use(cors())
// console.log(cors, "cors");
// function login(req, res, next) {
//     console.log("login");
//     next();
// }
// function isAdmin(req, res, next) {
//     console.log("admin");
//     next();
// }

// app.get('/api/products', login,isAdmin, (req, res) => {
//     getProducts(req, res)
// })
// app.get('/api/products/:id', (req, res) => {
//     getProduct(req, res)
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.use("/api/products",cors(), productRoute)