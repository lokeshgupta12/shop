const User = require('../models/login');
const Blog = require('../models/cartdata')
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = (router) => {
    router.post('/login', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'No  email was provided!' })
        } else {
            if (!req.body.password) {
                res.json({ success: false, message: 'No password was provided!' })
            } else {
                User.findOne({ email: req.body.email}, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!user) {
                            res.json({ success: false, message: "your email is not registred!" })
                        } else {
                            if (req.body.password !== user.password) {
                                res.json({ success: false, message: 'Password invalid!'})
                            } else {
                                var token = jwt.sign({ userId:user._id },config.secret, {expiresIn:'20h'});
                                res.json({ success: true, message: ' You are Login Success!', token : token,user:{email: user.email} });
                            }
                        }
                    }

                });
            }
        }
    });

    router.get('/getAllProduct', (req, res) => {
        Blog.find({}, (err, carts) => {
            if (err) {
                res.json({ success: false, message: err })
            } else {
                if (!carts) {
                    res.json({ success: false, message: 'No Blog Found!' })
                } else {
                    res.json({ success: true, carts: carts })
                }
            }
        }).sort({ '_id': -1 })

    });


    return router;
}