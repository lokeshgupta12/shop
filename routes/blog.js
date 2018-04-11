const User = require('../models/user');
const Blog = require('../models/blog')
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = (router) => {
    router.post('/newblog', (req, res) => {
        if (!req.body.title) {
            res.json({ success: false, message: 'Blog Title is required!' })
        } else {
            if (!req.body.body) {
                res.json({ success: false, message: ' Blog body is required!' })
            } else {
                if (!req.body.createdBy) {
                    res.json({ success: false, message: ' Blog createdBy name is required' })
                } else {
                    const blog = new Blog({
                        title: req.body.title,
                        body: req.body.body,
                        createdBy: req.body.createdBy
                    });
                    blog.save((err) => {
                        if (err) {
                            if (err.errors) {
                                if (err.errors.title) {
                                    res.json({ success: false, message: err.errors.title.message })
                                } else {
                                    if (err.errors.body) {
                                        res.json({ success: false, message: err.errors.body.message })

                                    } else {
                                        if (err.errors.createdBy) {
                                            res.json({ success: false, message: err.errors.createdBy.message })

                                        } else {
                                            res.json({
                                                success: false,
                                                message: err.errmsg
                                            })
                                        }

                                    }
                                }
                            } else {
                                res.json({ success: false, message: err })
                            }

                        } else {
                            res.json({ success: true, message: 'Blog Saved Success' })

                        }
                    });
                }
            }
        }


        // res.send('test blog of your dream for data')
    });
    router.get('/allBlogs', (req, res) => {
        Blog.find({}, (err, blogs) => {
            if (err) {
                res.json({ success: false, message: err })
            } else {
                if (!blogs) {
                    res.json({ success: false, message: 'No Blog Found!' })
                } else {
                    res.json({ success: true, blogs: blogs })
                }
            }
        }).sort({ '_id': -1 })

    });
    router.get('/singleBlog/:id', (req, res) => {
        if (!req.params.id) {
            // console.log(req,"id")
            res.json({ success: false, message: 'Blog ID is not provided' })
        } else {
            Blog.findOne({ _id: req.params.id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: 'Not valid blog ID!!' })
                } else {
                    if (!blog) {
                        res.json({ success: false, message: 'Blog not found!' })
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err })
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authentication user' })
                                } else {
                                    if (user.username !== blog.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to edit this blog post' });
                                    } else {
                                        res.json({ success: true, blog: blog })
                                    }
                                }
                            }
                        })

                    }
                }
            })
        }
    });

    router.put('/updateBlog', (req, res) => {
        if (!req.body._id) {
            res.json({ success: false, message: 'ID is not provided' })
        } else {
            Blog.findOne({ _id: req.body._id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: "Not valid blog ID" })
                } else {
                    if (!blog) {
                        res.json({ success: false, message: "Blog is not found" })
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err })
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authentication user' })
                                } else {
                                    if (user.username !== blog.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to edit this blog post' });
                                    } else {
                                        blog.title = req.body.title;
                                        blog.body = req.body.body;
                                        blog.save((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err })
                                            } else {
                                                res.json({ success: true, message: 'Blog Updated!' })
                                            }
                                        })
                                    }
                                }
                            }
                        })

                    }
                }
            });
        }
    });

    router.delete('/deleteBlog/:id', (req, res) => {
        if (!req.params.id) {
            console.log(req.params,"if")
            res.json({ success: false, message: 'ID is not provided' })
        } else {
            console.log(req.params,"esle")

            Blog.findOne({ _id: req.params.id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: 'Invalalid ID' })
                } else {
                    if (!blog) {
                        res.json({ success: false, message: ' Blod is not found!' })
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err })
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authentication user' })
                                } else {
                                    if (user.username !== blog.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to edit this blog post' });
                                    } else {

                                        blog.remove((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err })

                                            } else {
                                                res.json({ success: true, message: ' Blog Deleted!' })

                                            }
                                        })

                                    }
                                }
                            }
                        })
                    }
                }
            })
        }
    })

    return router;
}