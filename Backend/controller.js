const express = require('express');
const App = express()
const db = require('./dbconnection')
const bcrypt = require('bcrypt');
const Token = require('jsonwebtoken');
const multer = require('multer')
const multers3 = require('multer-s3')
const { S3Client,getRegion } = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid');
const s3Storage = require('multer-s3');
SECRET_KEY = 'iuyv6hgf67877bj?i'



//const s3 = new S3Client()

//user registration
const Register = (req,res)=> {
    saltRounds = 10
    const {Email,Name,Password,Address} = req.body;
    console.log(Email);
    const query1 = `select Email from users where Email='${Email}'`
    db.query(query1)
    .then((data)=>{
        console.log(data);
        if(data[0].length>0){
            res.send('user already exist')
        }else{
           const payload = {
               Email:  `'${Email}'`,
               Name:`'${Name}'`,
            }
            
            let Token1 = Token.sign(payload,SECRET_KEY)
        bcrypt.genSalt(saltRounds,function(err,salt){
            bcrypt.hash(Password,salt,function(err,hash){
                
                let currentDate = new Date();
                let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
                const query1 =  `insert into users(Email,Name,Password,Address,creation_Date) values('${Email}','${Name}','${hash}','${Address}','${formattedDate}')`
         db.query(query1)
        .then((result) => {
        return res.send({'Token':Token1}).status(201)
            
        }).catch((err) => {
            return res.send('some error occur')        
                });
            })
            
        })
        }

    })
    .catch((err)=>{
        res.send('err')
    })
    
        }
    
    
//user login

const islogged = (req, res) => {
    const { Email, Password } = req.body;
    const payload1 = {
        Email:`'${Email}'`,

    }
    TOKEN2 = Token.sign(payload1,SECRET_KEY)

    const query = `select * from users where Email='${Email}'`;
    db.query(query)
    .then((result1)=>{
        console.log(result1)
        if(result1[0][0]==null){
             res.send('Please register yourself').status(401)
        }else{
            bcrypt.compare(Password,result1[0][0].Password,function(err,result){
                if(result==true){
                    res.send({'Token':TOKEN2})
                }else if(err){
                    res.send('please provide correct password')
                }else{
                    res.send('some error occurs')
                }
            })
        }
        

    })
    .catch((Error)=>{
        res.send('some error occured')
    })


} 

//Admin signup

const Adminsignup = (req,res)=> {
    saltRounds = 10
    const {Email,Name,Password,Role} = req.body;
    const query2 = `select Email from Admin where Email='${Email}'`
    db.query(query2)
    .then((data)=>{
        console.log(data);
        if(data[0].length>0){
            res.send('Admin with this Email already exist')
        }else{
           const payload2 = {
               Email:  `'${Email}'`,
               Name:`'${Name}'`,
               Role:`'${Role}'`
            }
        
            
            let Token3 = Token.sign(payload2,SECRET_KEY)
        bcrypt.genSalt(saltRounds,function(err,salt){
            bcrypt.hash(Password,salt,function(err,hash){
                
                let currentDate1 = new Date();
                let formattedDate1 = currentDate1.toISOString().slice(0, 19).replace('T', ' ');
                const query3 =  `insert into Admin(Email,Name,Password,Role,creation_Date) values('${Email}','${Name}','${hash}','${Role}','${formattedDate1}')`
         db.query(query3)
        .then((result) => {
        return res.send(Token3).status(201)
            
        }).catch((err) => {
            return res.send('some error occur')        
                });
            })
            
        })
        }

    })
    .catch((err)=>{
        res.send('err')
    })
    
        }


const Adminlog = (req, res) => {
    const { Email, Password,Role } = req.body;
    const payload1 = {
        Role:"Admin"

    }
    TOKEN4 = Token.sign(payload1,SECRET_KEY)

    const query6 = `select * from Admin where Email='${Email}'`;
    db.query(query6)
    .then((result6)=>{
        console.log(result6[0])
        if(result6[0][0]==null){
             res.send('Please register yourself').status(401)
        }else{
            bcrypt.compare(Password,result6[0][0].Password,function(err,result){
                if(result==true){
                    res.json({Token:TOKEN4})
                }else{
                    res.send('please provide correct password')
                }
            })
        }
        

    })
    .catch((Error)=>{
        res.send('some error occured')
    })


} 


//Product fetching
const products = (req,res) => {
    const page = req.query;

    const pageNumber = page.search;
    console.log(pageNumber);
    if (pageNumber==0) {
        res.send('No product selected')
    }
    const limit = 9;
    const offset = (pageNumber-1)*limit;
    const query4 = `select * from products limit ${limit} offset ${offset}`
    db.query(query4)
    .then((data)=>{
            res.json({products:data[0]})

       
    })
    .catch((Error)=>{
        res.status(401)
    })
   

}

//create order

const createOrder = (req,res)=> {
    const {products,Address,Total_price,currency,status,ordstatus} = req.body
    console.log(products[0][0].product_id,Address,Total_price,currency,status,ordstatus);
    const pro = Total_price.Totalstate.amount1
    console.log(pro);
    const Add1 = Address.Addstate;
    console.log(Add1);
    const authHeader = req.headers['authorization'];
    console.log('auth',authHeader);

    let currentDate1 = new Date();
    let formattedDate1 = currentDate1.toISOString().slice(0, 19).replace('T', ' ');
    if (authHeader) {
        const decoded = Token.verify(authHeader,SECRET_KEY)

        const user_Email1 = decoded.Email

        const query5 = `insert into orders6(Address,Date_created,user_Email,Total_price,orderstatus)
        values('${Add1}','${formattedDate1}',${user_Email1},'${pro}','${ordstatus}')`
        db.query(query5)
        .then((result)=>{
            const ordId = result[0].insertId;

            const query11 = `insert into payments1(paid_amount,currency,status,order_id)
            values(${pro},'${currency}',${status},${ordId})`
            db.query(query11)
            .then((result)=>{
                const orderProductData =[];
                const arr =  products[0].forEach(item => orderProductData.push(`(  ${ordId},${item.product_id} )`))
                
     
                 const orderProduct = `insert into order_product1(order_id,product_id)values${orderProductData.toString()}`
                 console.log(orderProduct);
                 db.query(orderProduct)
                 .then((result)=>{
                     console.log(result);
                     res.send({message:'order created'})
                 })
                 .catch((Error)=>{
                     res.status(401).send('error')
                 })
     

            })
            .catch((error)=>{
                res.send('error4')
            })
            
       
           

        })
        .catch((error)=>{
            res.send('payment error')
        })
        
    } else{
        const query9 = `insert into orders6(Address,Date_created,Total_price,status,orderstatus)
        values('${Add1}','${formattedDate1}','${pro}','${status}','${ordstatus}')`
        db.query(query9)
        .then((result)=>{
            const ordId1 = result[0].insertId;
            const query12 = `insert into payments1(paid_amount,currency,status,order_id)
            values('${pro}','${currency}',${status},${ordId1})`
            db.query(query12)
            .then((data)=>{
                const orderProductData1 =[];
           const arr =  products[0].forEach(item => orderProductData1.push(`(  ${ordId1},${item.product_id} )`))
           

            const orderProduct2 = `insert into order_product1(order_id,product_id)values${orderProductData1.toString()}`
            console.log(orderProduct2);
            db.query(orderProduct2)
            .then((result)=>{
                console.log(result);
                res.send({message:'order created ok'})
            })
            .catch((Error)=>{
                res.send('error1')
            })



            })
            .catch((Error)=>{
                res.send(Error)
            })


       
            
        })
        .catch((Error)=>{
            res.send(Error)
        })
        

    }
    
}


//commenting

const commenting = (req,res) => {
    const {comment,imageURL} = req.body;
    console.log(comment,imageURL);
    const authHeader1 = req.headers['authorization'];
    let currentDate2 = new Date();
    let formattedDate2 = currentDate2.toISOString().slice(0, 19).replace('T', ' ');
    if (authHeader1) {
        const decoded1 = Token.verify(authHeader1,SECRET_KEY)

        const user_Email1 = decoded1.Email
        const query7 = `insert into comment(comment,image_URL,user_Email,Creation_Date)
        values('${comment}','${imageURL}',${user_Email1},'${formattedDate2}')`;
        db.query(query7)
        .then((data)=>{
            res.send({message:'comment posted'})
        })
        .catch((Error)=>{
            res.send({Error:'Error'})
        })
        
    } else {
        res.send({status:401})
        
    }

}
 

//upvote

const upvote = (req,res)=> {
    const {upvote,comment_id} = req.body;
    console.log(comment_id);
    const query8 = `update comment set upvote=upvote+${upvote} where comment_id=${comment_id}`
    db.query(query8)
    .then((data)=>{
        res.send({result:"upvoted"})
    })
    .catch((Error)=> {
        console.log(Error);
        res.send({Error:"Error1"})
    })
}

//fetch comments

// const fetchcomm = (req,res)=> {
//     // const {page} = req.query;
   
//         const query10 = `select * from comment`
//         db.query(query10)
//         .then((data)=>{
//             res.send({comments:data[0]})

//         })
//         .catch((Error)=>{
//             res.send('Error')
//         })
        
    
// }
const fetchcomm = (req,res)=> {
    const {page} = req.query;
    if (page==1) {
        const query10 = `select * from comment`
        db.query(query10)
        .then((data)=>{
            res.send(data[0])

        })
        .catch((Error)=>{
            res.send('Error')
        })
        
    } else {
        res.send('page number wrong')
        
    }
}

const searchproduct = (req,res)=> {
    const searchname = req.query;
    const productdata = searchname.search
    if (productdata===null) {
        res.send('please select the product')
        
    }else{
        const query17 = `select * from products where name='${productdata}'`
        db.query(query17)
        .then((data)=>{
            res.json({products:data[0]})
        })
        .catch((Error)=>{
            res.send('Error')
        })
    }
}

//file upload operation




// const upload = multer({ 
//     storage: multers3({
       
//         acl: 'public-read',
//         bucket: 'product--images1',
//         region: 'ap-south-1',
//         contentType:multers3.AUTO_CONTENT_TYPE,
//         key: function (req, file, cb) {
//               const uniqueKey = uuidv4();

//                 cb(null, uniqueKey)
                
                    
//         }
        
        
//     }

//     )
    
// })



   const fileupload = (req,res)=>{
   
        console.log(res);
        const FileLocation = req.file.location;
        
        const {price,Name} = req.body;
        let currentDate4 = new Date();
        let formattedDate4 = currentDate4.toISOString().slice(0, 19).replace('T', ' ');
        const query13 = `insert into products(product_url,price,creation_date,name)
        values('${FileLocation}','${price}','${formattedDate4}','${Name}')`
        db.query(query13)
        .then((data)=>{
           res.send({message:'product stored'})
        })
        .catch((Error)=> {
           res.send('some error occurs ')
        })
      
        
    }
    
    
        
//products removing

const deleteables = (req,res)=>{
    const {DeleteAbles}  = req.body;
    console.log(DeleteAbles);
    const query14 = `delete  from products where name='${DeleteAbles}'`
    db.query(query14)
    .then((data)=>{
        res.send({message:'items deleted'})
    })
    .catch((Error)=>{
        res.send('some error occurs please try again')
    })
}
    
   
//order fetching

const ordfetching = (req,res)=>{
    const {Page} = req.query;
    console.log(Page);
    if (Page==1) {
    const query15 = `
    SELECT
        orders6.order_id,
        orders6.orderstatus,
        products.product_id,
        products.name,
        products.price
    FROM
        orders6
    JOIN
        order_product1 ON orders6.order_id = order_product1.order_id
    JOIN
        products ON order_product1.product_id = products.product_id
    WHERE
        orders6.orderstatus = 'Active';
    
    `
db.query(query15)
.then((data)=>{
   res.send({'Result':data[0]})
})
.catch((Error)=>{
    res.send({'Message':'some error occur'})
})
}
else {
    res.send('error')
        
}
}

    

//order Deactivate

const Deactivate = (req,res)=>{
    const {order_id} = req.body;
    const query16 = `update  orders6
    set orderstatus = 'Resolved'
    where order_id='${order_id}';`
    db.query(query16)
    .then((data)=>{
        res.send({message:'order deactivated'})
    })
    .catch((Error)=>{
        res.send({message:'Error occured'})

    })


}

const collect = async(req,res) => {
    const {amount1} = req.body;
    const multiply = amount1*100 
    try {
        const paymentintent = await stripe.paymentIntents.create({
            amount:multiply,
            currency:'usd',
            automatic_payment_methods:{
                enabled:true,
            }
            

        })
        //console.log('Hello',paymentintent)

        const int = paymentintent.client_secret

         res.json({
            
            int

        })
        
    } catch (error) {
        res.send('hahaha')
        
    }
    

    
}


module.exports = {
    Register,
    islogged,
    Adminsignup,
    Adminlog,
    products,
    createOrder,
    commenting,
    upvote,
    fetchcomm,
    upload,
    fileupload,
    deleteables,
    ordfetching,
    Deactivate,
    searchproduct,
    collect
    
}

