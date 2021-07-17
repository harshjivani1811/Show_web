require ("dotenv").config();
const Show = require("../Models/Show");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination : async(req,file,cb) => {
        cb(null,"../Uploads/Products");
    },
    filename : (req,file,cb) => {
        cb(null, new Date().toISOString() + file.originalname.replace(/ /g,""));
    }
}) 

const fileFilter = (req,file,cb) => {
    if(
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/svg" ||
        file.mimetype === "image/svg+xml"
    ){
        cb(null,true)
    }
    else{
        cb(new error ("invalid mimetype, Only jpg, jpeg, png, svg, svg+xml allowed"),false);
    }
}

const upload = multer({
    storage : storage,
    limites : {
        fileSize : 1024 * 1024 * 1024 * 5,
    },
    fileFilter : fileFilter
})

exports.uploadImage = async(req,res) => {
        upload.single("productImg")(req,res,(err) => {
        if(err){
            return res.status(400).json({
                success : false,
                err : "invalid mimetype, Only jpg, jpeg, png, svg, svg+xml allowed...!!!"
            })
        }
        if(req.file.path !== undefined){
            return res.status(200).json({
                path : req.file.path,
                success : true
            })
        }
        else{
            return res.status(400).json({
                success : false,
                err : "upload failed... try again"
        })
    }
})
}

exports.createshow = async(req,res) => {
    const { showname, description, category, photo, duration} = req.body;
    if(!showname || !description || !category || !photo || !duration){
        return res.status(400).json({
            success : false,
            err : "please include all field"
        })
    }

    const showData = new Show(req.body)
    await showData
    .save()
    .then((data) => {
        return res.status(200).json({
            success : true,
            msg : "show uploaded successfully",
            data
        })
    })
    .catch((err)=> {
        console.log(err);
        return res.status(400).json({
            success : false,
            err : "show not uploaded"
        })
    })
}

exports.getshow = (req,res) => {
    const{_id} = req.body

    Show.findOne({_id})
    .populate("category")
    .exec((err,show) => {
        if(err){
            return res.status(400).json({
                success : false,
                err : "no show found"
            })
        }
        if(!show){
            return res.status(400).json({
                success : false,
                err : "show not available"
            })
        }

        return res.status(200).json({
            success : true,
            data : show
        })
    })
}

exports.getAllshow = async(req,res) => {
    try {
        const show = await Show.find({})
        return res.status(200).json({
        success : true,
        data : show
    })
    } catch (error) {
         return res.status(400).json({
        success : false,
        err : "no show found"
    })
    }
}

exports.updateshow = async(req,res) => {
    const {_id} = req.body
    Show.findOne({_id}).then(async(err,show) =>{
        if(err){
            return res.status(400).json({
                success : false,
                err : "no show found"
            })
        }
        if(!show){
            return res.status(400).json({
                success : false,
                err : "show not available"
            })
        }

        if(req.body.showname){
            show.showname = req.body.showname
        }
        if(req.body.description){
            show.description = req.body.description
        }
        if(req.body.category){
            show.category = req.body.category
        }
        if(req.body.photo){
            show.photo = req.body.photo
        }
        if(req.body.duration){
            show.duration = req.body.duration
        }
        
        const showData = await Show.findOneAndUpdate(
            {_id},
            show,
            (err,show) => {
                if(err)
                return res.status(400).json({
                    success : false,
                    err : "no show found"
                })
                return res.status(200).json({
                    success : true,
                    msg : "data updated"
                })
            }
        )
    })
}

exports.deleteshow = async(req,res) => {
    const {_id} = req.body
    await Show.findOneAndDelete({_id}).then((show,err) => {
        if(err){
            return res.status(400).json({
                success : false,
                err : "no show found"
            })
        }
        if(!show){
            return res.status(400).json({
                success : false,
                err : " show not available "
            })
        }

        return res.status(200).json({
            success : true,
            msg : "show deleted"
        })
    })
}