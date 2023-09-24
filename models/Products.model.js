const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    image:String,
    category: String
})
const ProductsModel = mongoose.model("product", productSchema)

module.exports = {
    ProductsModel
}