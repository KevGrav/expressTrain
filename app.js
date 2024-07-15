const express = require('express')
const logger = require('morgan')


//http.createServer
const app = express()
app.use(logger("dev"))
app.use(express.json())


const store = [
    {
        name: 'apple',
        price: 1.5
    }
]

app.get('/', (request, response)=>{
    response.json({message:"all products found", payload:store})
})

app.get('/get-all-products', (request, response)=>{
    response.json({message:"products found", payload:store.name})

})

app.get('/get-product/:productName', (req, res)=> {
    res.json({payload:req.query})
})

app.post('/create-product', (request, response)=>{
    store.push({
        name: request.body.name,
        price: request.body.price
    })
    response.json({message: "Product added"})
})

//5
app.post('/create-product', (request, response)=>{
    const product = store.find(product => product.name === req.params.name)
    if(product){
        res.json({message: `${product.name} already exists.`})
    }else{
        store.push({
        name: request.body.name,
        price: request.body.price
        })
    res.json({message: "Product added"})
    }
})


//6
app.delete('/delete-product', (req, res)=>{
    //find product by name and delete
    const {name} = req.body
    const productIndex = store.findIndex(product => product.name === name)
    if(productIndex !== -1){
        store.splice(productIndex, 1)
        return res.json({message: "Product deleted", payload: store})
    }else{
        return res.json({message: "Product not found"})
    }
})
