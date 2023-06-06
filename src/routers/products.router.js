import {Router} from "express";
import ProductManager from "../General/productManager.js";


const router = Router();
const prod = new ProductManager();
//mostrar la lista completa o limitada de productos dependiendo del  valor:"limit" solilicitado
router.get('/', async(req, res)=>{
const limit = req.query.limit 
if(limit ===undefined) {
    return res.status(200).json(await prod.getProducts())
} else {
    if(!isNaN(parseInt(limit))){
        const productos = await prod.getProducts()
        if(productos.length >= parseInt(limit)){
            const productosLimit = productos.slice(0, parseInt(limit))
            return res.status(200).json({productosLimit})
        }else{
            res.status(400).json(`${limit} supera la cantidad de productos existentes`)
        }}else{
            res.status(400).json(`${limit} no es un valor adecuado para la consulta`)
        
    }
}
})
// buscar producto por el id (pid)
router.get('/:pid', async(req, res)=>{
    res.status(200).json( await prod.getProductById(parseInt(req.params.pid)))
})
// agregar un producto 
router.post('/', async(req, res)=>{
    const newProduct = req.body;
    const mensaje =await prod.addProduct(newProduct)
    res.status(200).json({status: "success", message: "mensaje"})
    
})

//actualizacion
router.put('/:pid', async(req,res)=>{
    const id= parseInt(req.params.pid);
    const actProduct = req.body;
    const mensaje = await prod.updateProduct(id, actProduct)
    res.status(200).json({status: "success", message: mensaje})

})
router.delete('/:pid', async(req, res)=>{
    const id = parseInt(req.params.pid);
    const mensaje = await prod.deleteProduct(id)
    res.status(200).json({status:"succes", message: mensaje})
})

export default router;