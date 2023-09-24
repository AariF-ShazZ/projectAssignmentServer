const express = require("express")
const { postData, getData, updateDataPut,updateDataPatch, deleteData, singleData,getAllCategory } = require("../controllers/Products.controller")
const productsRoutes = express.Router()

productsRoutes.get("/",getData)
productsRoutes.get("/categories",getAllCategory)
productsRoutes.post("/post",postData)
productsRoutes.put("/update/:id",updateDataPut)
productsRoutes.patch("/update/:id",updateDataPatch)
productsRoutes.delete("/delete/:id",deleteData)
productsRoutes.get("/:id",singleData)

module.exports = {productsRoutes}