import fs from "fs" // se llama al modulo de FileSystem
//Se crea la clase ProductManager la cual manejará productos con las funcionalidades de agregar,  consultar, modificar y eliminar productos

class ProductManager {
    // se agrega la variable this.patch con la ruta, de manera de que al instanciar reciba la ruta a trabajar
    constructor (){        
        this.path= './src/General/productsFiles.json';
        this.products=[]
    }
//las funcionalidades se agregan en forma de metodos:
    // metodo agregar producto
    addProduct = async (entradas)=>{
    const {title,description ,price,thumbnail = [],code,stock, category, status} = entradas

        this.products = await this.getProducts();          

        const product ={ 
            title,
            description,
            price, 
            thumbnail,
            code,
            stock,
            category,
            status
        }
        //se genera el parametro id, el cual debe ser unico para cada producto
        if(this.products.length===0){
            product.id = 1;
        }else{
            product.id = this.products[this.products.length-1].id+1;
        }

// antes de agregar un producto se valida que el ingreso contenga todos los parametros (title,description ,price,thumbnail,code,stock)
        if (title && description && price && thumbnail && code && stock && category && status){
// Se valida que el parámetro "codigo" no se repita en otro producto
            const buscar = this.products.find(producto => producto.code===code);

            if (buscar===undefined){
                this.products.push(product)
                await fs.promises.writeFile(this.patch,JSON.stringify(this.products,null,'\t'))
                return  "el producto fue agregado"
            } 
            else{
                return console.log(`el code  ${code}  ya existe`)
            }                       
        }
        else{
            return console.log("intenta ingresar un producto con los parametros incompletos")
        }
       
    }

    getProducts = async () =>{
        
         if (fs.existsSync(this.path)){
            const content = await fs.promises.readFile(this.path,'utf-8');
            this.products = JSON.parse(content)
            return this.products;
         }
         return [] 
    }
    //metodo para buscar un producto partiendo del id
    getProductById = async (id)=>{

        this.products = await this.getProducts();  
        const productoPorId = this.products.find(item => item.id===id);
        if (productoPorId===undefined){
            return "Not found"
        }
        else
            {
                return productoPorId
            }        
    }
//metodo para actualizar (cambiar) valor del parámeto del producto: dado el id, se indica el parámetro a modificar y el nuevo valor
    updateProduct = async (id,entradas) =>{
        this.products = await this.getProducts();        
        const indice = this.products.findIndex(producto=>producto.id===id)
        if (indice===-1){
            return "el producto a modificar, no existe"      
        }    
        entradas.id = id    

        const produtoAux = this.products.map((p) => p.id === id? {...p, ...entradas } : p)

        await fs.promises.writeFile(this.patch,JSON.stringify(produtoAux,null,'\t')) 
        return "producto Modificado"        
    }
// metodo para eliminar productos
    deleteProduct = async (id) =>{
        this.products = await this.getProducts();  
        if(this.products.some(producto=> producto.id===id)){
            this.products = this.products.filter(producto => producto.id !==id) 
            if (this.products.length===0){
                if (fs.existsSync(this.patch)){
                    await fs.promises.unlink(this.patch) 
                    return "producto eliminado" 
                }            
            }
            else{
                await fs.promises.writeFile(this.patch,JSON.stringify(this.products,null,'\t')) 
                return "producto eliminado"    
            } 
        }
        else{
            "el producto a eliminar, no existe"
        }          
    }
}



export default ProductManager;