import { Router } from "express";
import CartsManager from "../General/CartsManager.js";
import ProductManager from "../General/productManager.js";

const router = Router();
const carro = new CartsManager();
const productos = new ProductManager();


router.post('/', async (req,res)=>{
    await carro.createCart();
    res.send({status:"success",message:"Cart added"})
} )
//*
router.get('/:cid', async (req,res)=>{
    const cid = parseInt(req.query.cid)
    if(cid !== isNaN){ 
    await carro.getCartById(req.params.cid)
    res.send(await carro.getCartById(parseInt( req.params.cid)))
    }
    return "no es un valor de cart"
} )


router.post('/:cid/product/:pid', async (req,res)=>{
    const ProductId = await productos.getProductById(parseInt(req.params.pid));
    if (ProductId!=="Not found"){
        const mensaje = await carro.addProductCart((parseInt(req.params.cid)),({"product":parseInt(req.params.pid),"quantity":req.body.quantity || 1}))             
        return res.send({status:"success",message:mensaje})  
    }
    return res.send({status:"success",message:"Product no exist"})   
    

})

export default router;