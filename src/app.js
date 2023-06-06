import express from "express"
import productRouter from "./routers/products.router.js"
import cartsRouters from "./routers/carts.router.js"

const app = express()

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouters)

// endpoints http://localhost:8080/
app.get('/', (req, res)=> res.send('ok'))
app.get('/health', (req, res)=> res.status(200).json({message: 'The server is running on port 8080'}))


app.listen(8080, ()=> console.log('menssage: server up en puerto 8080'))