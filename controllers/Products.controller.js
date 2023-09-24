const { ProductsModel } = require("../models/Products.model");


const singleData = async (req, res) => {
    const ID = req.params.id;
    console.log("data => ", ID);
    try {
        const result = await ProductsModel.findById({ _id: ID });

        if (result) {
            res.status(200).json({
                success: true,
                data: result,
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Product with id ${ID} not found`,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const postData = async (req, res) => {
    const data = req.body;
    try {
        const product = new ProductsModel(data);
        await product.save();

        const savedProducts = await ProductsModel.find();
        res.status(201).json({
            success: true,
            message: 'Product successfully created',
            data: savedProducts
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: err.message
        });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const result = await ProductsModel.find()

        res.status(200).json({
            data: result,
            size: result.length,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getData = async (req, res) => {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5;
    const sortDirection = query.sort === 'desc' ? -1 : 1;
    try {
        let filter = {};

        if (query.category) {
            const category = Array.isArray(query.category) ? query.category : [query.category];
            filter.category = { $in: category };
        }

        const result = await ProductsModel.find(filter)
            .sort({ price: sortDirection })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            data: result,
            size: result.length,
            page: page,
            itemsPerPage: limit
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateDataPut = async (req, res) => {
    const ID = req.params.id;
    const payload = req.body;
    try {
        const updatedProduct = await ProductsModel.findByIdAndUpdate(ID, payload, { new: true });

        if (updatedProduct) {
            const remainingData = await ProductsModel.find();
            res.status(200).json({
                message: `Updated the Product whose id is ${ID}`,
                data: remainingData,
            });
        } else {
            res.status(404).json({ message: `Product with id ${ID} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const updateDataPatch = async (req, res) => {
    const ID = req.params.id;
    const payload = req.body;
    try {
        const updatedProduct = await ProductsModel.findByIdAndUpdate(ID, payload, { new: true });

        if (updatedProduct) {
            const remainingData = await ProductsModel.find();
            res.status(200).json({
                message: `Updated the Product whose id is ${ID}`,
                data: remainingData,
            });
        } else {
            res.status(404).json({ message: `Product with id ${ID} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const deleteData = async (req, res) => {
    const ID = req.params.id;

    try {
        const deletedProduct = await ProductsModel.findByIdAndDelete({ _id: ID });

        if (deletedProduct) {
            const remainingData = await ProductsModel.find();

            res.status(200).json({
                message: `Deleted the Product whose id is ${ID}`,
                remainingData: remainingData,
                remainingDataSize: remainingData.length,
            });
        } else {
            res.status(404).json({ message: `Product with id ${ID} not found` });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { postData, getData, updateDataPut, deleteData, singleData,getAllCategory,updateDataPatch }