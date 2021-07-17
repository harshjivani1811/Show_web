require ("dotenv").config();
const Category = require("../Models/Category");

exports.createcategory = async(req, res) => {
    try {
        const { name } = req.body;
    if(!name){
        return res.status(400).json({
            success : false,
            err : "Empty category is not allowed"
        })
    }

    const categoryData = new Category(req.body);
    await categoryData

    .save()
    .then((data) => {
        if(data){
            return res.status(200).json({
                success : true,
                msg : "Category is created",
                data
            })
        }
    })
    .catch(() => {
        return res.status(400).json({
            success : false,
            err : "Category is not created"
        })
    })
    } catch (error) {
        return res.status(400).json({
            success : false,
            err : "Category is not created"
        })
    }
    
}

exports.getcategory = (req,res) => {
    const {_id} = req.body;
    category.findOne({_id})
    .populate("category")
    .exec((err,category) => {
        if(err){
            res.status(400).json({
                success : false,
                err : "category is not found...."
            })
        }
        if(!category){
            res.status(400).json({
                success : false,
                err : "category is not found"
            })
        }
        return res.status(200).json({
            success : true,
            data
        })
    })
}

exports.getAllcategory = async(req,res) => {
    try {
        const category = await Category.find({})
        return res.status(200).json({
            success : true,
            data : category
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success : false,
            err : "Category is not available"
        })
    }
}

exports.updatecategory = async(req,res) => {
    const{_id} = req.body;
    Category.findOne({_id}).then(async(err,category) => {
        if(err){
            return res.status(400).json({
                success : false,
                err : "Category not found"
            })
        }
        if(!category){
            return res.status(400).json({
                success : false,
                err : "Category not available"
            })
        }

        if(req.body.name){
            category.name = req.body.name
        }

        const categoryData = await category.findOneAndUpdate(
            {_id},
            category,
            (err,category) => {
                if(err){
                    return res.status(400).json({
                        success : false,
                        err : "Category not found"
                    })
                }
                return res.status(200).json({
                    success : true,
                    msg : "Category is updated",
                    data
                })
            }
        )
    })
}

exports.deletecategory = async(req,res) => {
    try {
        const {_id} = req.body;
    category.findOneAndDelete({_id}).then((category,err) => {
        if(err){
            return res.status(400).json({
                success : false,
                err : "Category not found"
            })
        }
        if(!category){
            return res.status(400).json({
                success : false,
                err : "Category not available"
            })
        }
        return res.status(200).json({
            success : true,
            err : "Category is deleted"
        })
    })
    } catch (error) {
        return res.status(400).json({
            success : false,
            err : "Category not found...!!!"
        })
    }
    
}