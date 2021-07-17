require("dotenv").config();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");



// exports.signup = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     await User.findOne({ email }).then(async (data) => {
//       if (data) {
//         return res.status(400).json({
//           success: false,
//           error: "Email already exist",
//         });
//       }

//       if (
//         !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//           password
//         )
//       ) {
//         return res.status(400).json({
//           success: false,
//           error:
//             "Password should be atleast Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
//         });
//       }
//       const userSubmitData = new User(req.body);

//       const user = await userSubmitData
//         .save()
//         .then((data) => {
//           if (data) {
//             return res.status(200).json({
//               success: true,
//               msg: "User successfully created",
//               data,
//             });
//           }
//         })
//         .catch((error) => {});
//     });
//   } catch (err) {
//     return res.status(400).json({
//       success: false,
//       msg: "User not created",
//     });
//   }
// };

exports.signup = async (req,res) => {
    try {
        const {email, password} = req.body;
    await User.findOne({email}).then(async(data) => {
        if(data) {
           return res.status(400).json({
                success : false,
                err : "email already exist!!!"
            });
        }
        if(
            !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                password
            )
        ){
            return res.status(400).json({
                success : false,
                err : "Minimum eight characters, at least one letter, one number and one special character"
            });
        }

        const userSubmitData = new User(req.body);
        const user = await userSubmitData
        .save()
        .then((data) => {
            if(data){
               return res.status(200).json({
                success : true,
                msg : "User successfully created",
                data
            });
        }
            
        })
        .catch((err) => {
           return res.status(400).json({
                success : true,
                err : "User not created"
            });
        })
    })
    } catch (error) {
        return res.status(400).json({
            success : true,
            err : "User not Created"
        });
    }
    
}

exports.signin = (req,res) => {
    const {email, password} = req.body;
    User.findOne({email})
    .then((user, err) => {
        if(err){
            return res.status(400).json({
                success : false,
                err : "User not found +>"
            });
        }
        console.log(err);
        if(!user){
            return res.status(400).json({
                success : false,
                err : "User not found"
            });
        }
        if(!user.authenticate(password)){
            return res.status(400).json({
                success : false,
                err : "incorrect password"
            });
        }

        const token = jwt.sign({ _id : user._id},process.env.SECRET);
        res.cookie("token", token, {maxAge : 36000000});

        const {_id, firstname, email} = user;
        return res.json({
            token,
            _id,
            name : firstname,
            email,
            msg : "User successfully login"
        });
    })
        .catch(() => {
            return res.status(400).json({
                success : false,
                err : "user not login"
            });
        })
}

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
            success : true,
            msg : "User signout successfully"
        });
}

exports.getuser = (req,res) => {
    const {_id} = req.body;
    User.findOne({_id}).then((user,err) => {
        if(err){
            return res.status(400).json({
                success : false,
                err : "user not found"
            });
        }
        if(!user){
            return res.status(400).json({
                success : false,
                err : "user not available"
            });
        }

        const salt = undefined;
        const encrypt_password = undefined;
        return res.status(200).json({
                    success : true,
                    data : user
                })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            err : "user not available"
        });
    })
}

exports.getAlluser = async(req,res) => {
    try {
        const user = await User.find({});
        return res.status(200).json({
        success : true,
        msg : "users are available",
        data : user
    });
    } catch (error) {
        return res.status(400).json({
        success : false,
        msg : "something is wrong"
        })
    }
}

exports.updateuser = async(req,res) => {
    const {_id} = req.body;
    User.findOne({_id}).then(async(user,err) => {
        if(err) {
            return res.status(400).json({
                success : false,
                err : "User not found"
            })
        }
        if(!user) {
            return res.status(400).json({
                success : false,
                err : "User not available"
            })
        }

        if(req.body.firstname){
            user.firstname = req.body.firstname
        }
        if(req.body.lastname){
            user.lastname = req.body.lastname
        }
        if(req.body.email){
            user.email = req.body.email
        }
        if(req.body.password){
            use.password = req.body.password
        }

        const updateData = await User.findOneAndUpdate(
            {_id},
            user,
            (err,user) => {
                if(err){
                    return res.status(400).json({
                        success : false,
                        err : "something is wrong" 
                    })
                }
                return res.status(200).json({
                    success : true,
                    data : user
                })
            }
        )
    })
}

exports.deleteuser = async(req,res) => {
    const {_id} = req.body
    await User.findOneAndDelete({_id}).then((user,err) => {
        if(err){
            return res.status(400).json({
                success : false,
                err : "user not found"
            })
        }
        if(!user){
            return res.status(400).json({
                success : false,
                err : "user not available"
            })
        }
        return res.status(200).json({
            success : true,
            err : "user deleted successfully"
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            err : "user not available!!"
        })
    }) 
}

// exports.validateToken = async (req, res, next) => {
//     try {
//       if (!req.headers.cookie) {
//         return res.status(400).json({
//           success: false,
//           msg: "User must be Logged In!",
//         });
//       }
  
//       const token = req.headers.cookie.substring(6);
//       jwt.verify(token, process.env.SECRET),
//         (err, verified) => {
//           if (err) {
//             return res.status(400).json({
//               success: false,
//               msg: "ACCESS DENIED",
//             });
//           }
//         };
//       next();
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({
//         success: false,
//         msg: "Token validation failed",
//       });
//     }
// };
 