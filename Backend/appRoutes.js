const express = require('express');
const App = express()
const router = express.Router();
const multer = require('multer')

const bodyParser = require('body-parser');


const {Register,
    islogged,
    Adminsignup,
    Adminlog,
    products,
    createOrder,
    commenting,
    upvote,
    fetchcomm,
    file,
    upload,
    fileupload,
    deleteables,
    ordfetching,
    Deactivate,
    searchproduct,
    collect,
    
    } = require('./controller')
const parse = bodyParser.json()


router.post('/signup',parse,Register)
router.post('/login',parse,islogged)
router.post('/Adminsignup',parse,Adminsignup)
router.post('/Adminlogin',parse,Adminlog)
router.get('/products',products);
router.post('/createorder',parse,createOrder)
router.post('/commenting',parse,commenting);
router.patch('/upvote',parse,upvote)
router.get('/fetchcomm',fetchcomm)
router.post('/file',parse,upload.single('file1'),fileupload);
router.delete('/deleteables',parse,deleteables)
router.get('/orderfetch',ordfetching),
router.patch('/Deactivate',parse,Deactivate)
router.get('/prosearch',searchproduct)
router.post('/collect',parse,collect)
   


module.exports = router;