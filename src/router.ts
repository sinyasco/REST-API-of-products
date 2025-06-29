import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { getProducts, createProduct, getProduct, deleteProduct } from "./handlers/handlers";
import { deleteUpdate, getUpdate, getUpdates, updateUpdate } from "./handlers/updates";

const router = Router() 

/* Products */
router.get('/product/' ,getProducts)
router.get('/product/:id' , getProduct)
router.post('/product',
    body('name').isString().notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()}
        )
        return;
        }
        next()
    },
    createProduct
)
router.put('/product/:id' ,body('name').isString() ,(req,res) => {

       /* ---    Verifying if req.body.name exists and it is a string   --- */
       const errors = validationResult(req)
       if(! errors.isEmpty()) { res.status(404) ; res.json({errors : errors.array()})}
       /* ------------------------------------------------------------------*/


})
router.delete('/product/:id' , deleteProduct)

/* Updates */

router.get('/update/' , getUpdates)
router.get('/update/:id' , getUpdate)
router.post('/update/' , body('title').exists().isString() , 
    body('body').exists().isString() , body('productId').exists().isString() ,
    (req,res) => {})
router.put('/update/:id' ,
    body('title').optional() , 
    body('body').optional() ,
    oneOf([body('status').equals('IN_PROGRESS').optional(),
           body('status').equals('LIVE').optional(),
           body('status').equals('DEPRECATED').optional(),
           body('status').equals('ARCHIVED').optional()]) , 
    body('version').optional()
    , (req,res, next) => {

          /* ---    Verifying if req.body.name exists and it is a string   --- */
          const errors = validationResult(req)
          if(! errors.isEmpty()) { res.status(404) ; res.json({errors : errors.array()})}
          /* ------------------------------------------------------------------*/
next()
    } , updateUpdate)
router.delete('/update/:id' ,deleteUpdate)

/* UpdatePoint */

router.get('/updatepoint/' , (req,res) => {})
router.get('/updatepoint/:id' , (req,res) => {})
router.post('/updatepoint/' , (req,res) => {})
router.put('/updatepoint/:id' , body('name').optional() , body('description').isString() , (req,res) => {})
router.delete('/updatepoint/:id' ,body('updateId').exists().isString() ,body('name').optional() , body('description').isString() ,
 (req,res) => {})

export default router 