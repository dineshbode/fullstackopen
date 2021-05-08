const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request,response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
    })
})

blogsRouter.get('/:id', (request,response,next) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if(blog){
        response.json(blog.toJSON())
    }else{
        response.status(404).end()
    }
    })
})

module.exports = blogsRouter;