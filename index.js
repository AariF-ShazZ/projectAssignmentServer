const express  = require("express")
require("dotenv").config()
const {connect} = require("./configs/db")
const app = express()
const cors = require("cors")
const { productsRoutes } = require("./routes/Products.route")
app.use(cors())
app.use(express.json())

app.use("/product",productsRoutes)

app.listen(process.env.port, async () => {
    try{
        await connect
        console.log("Successfully connected to DB");
    }catch(err){
        console.log("Not connecting to te DB");
        console.log(err);
    }
})