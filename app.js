const express = require('express')
const logger = require('morgan')


//http.createServer
const app = express()
app.use(logger("dev"))
app.use(express.json())


const products = [
    {
        name: 'apple',
        price: 1.5
    }
]

app.get('/', (request, response)=>{
    response.json({message:"all products found", payload:products})
})

app.get('/get-all-products', (request, response)=>{
    response.json({message:"products found", payload:products.name})

})

app.get('/get-product/:productName', (req, res)=> {
    res.json({payload:req.query})
})

app.post('/create-product', (request, response)=>{
    products.push({
        name: request.body.name,
        price: request.body.price
    })
    response.json({message: "Product added"})
})


