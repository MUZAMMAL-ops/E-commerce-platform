const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router()
const parse = bodyParser.json()
const appRoutes = require('./appRoutes')

router.use(bodyParser.urlencoded({ extended: true }));

//User Signup
router.use('/signup',parse,(req,res,next)=> {

    const {Email,Name,Password,Address} = req.body;
    console.log(Email);
    
    if(!Email||!Name||!Password||!Address){
        res.send('Please fill the required information').status(400)
    } else{
        next()
    }
})
 router.post('/signup',appRoutes)


//User login
router.use('/login',parse,(req,res,next)=> {
    const {Email,Password} = req.body;
    if(!Email||!Password){
        res.send('Please provide your credentials').status(401)
    } else {
        
        next()
    }
})
router.post('/login',appRoutes)


//Admin signup
router.use('/Adminsignup',parse,(req,res,next)=> {
    const {Email,Password,Name,Role} = req.body;
    if(!Email||!Password||!Name||!Role){
        res.send('Please provide your credentials Admin').status(401)
    } else {
        
        next()
    }
})
router.post('/Adminsignup',appRoutes)

//Admin login

router.use('/Adminlogin',parse,(req,res,next)=> {
    const {Email,Password,Role} = req.body;
    if(!Email||!Password||!Role){
        res.send('Please provide your credentials Admin').status(401)
    } else {
        
        next()
    }
})

router.post('/Adminlogin',appRoutes)

//commenting middleware

router.use('/commenting',parse,(req,res,next)=> {
    const authHeader2 = req.headers.authorization
    if (!authHeader2) {
        res.status(401).send('please login')
        
    } else {
        next()
        
        
    }

})
router.post('/commenting',appRoutes)

//upvote

router.use('/upvote',parse,(req,res,next)=>{
    const {upvote} = req.body;
    if (!upvote) {
        res.status(401)
        
    } else {
        next()
        
    }
})

router.patch('/upvote',parse,appRoutes)

//comm middleware

router.use('/fetchcomm',(req,res,next)=>{
    const {page} = req.query;
    if (page!=1) {
        res.status(401).send('page should be 1')
        
    } else {
        next()
        
        
    }
})

router.get('/fetchcomm',appRoutes)

//deleteables
router.use('/deleteables',(req,res,next)=>{
    const {DeleteAbles} = req.body;
    if (!DeleteAbles) {
        res.status(400).send('please select the item')
        
    } else {
        next()
        
    }
})
router.delete('/deleteables',appRoutes)


module.exports = router;