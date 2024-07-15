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

app.get('/', (req, res)=>{
    res.json({message:"all products found", payload:store})
})

app.get('/get-all-products', (req, res)=>{
    res.json({message:"products found", payload:store})

})

app.get('/get-product/:productName', (req, res)=> {
    res.json({payload:req.query})
})

app.post('/create-product', (req, res)=>{
    store.push({
        name: req.body.name,
        price: req.body.price
    })
    res.json({message: "Product added"})
})

//5
app.post('/create-product', (req, res)=>{
    const product = store.find(product => product.name === req.params.name)
    if(product){
        res.json({message: `${product.name} already exists.`})
    }else{
        store.push({
        name: req.body.name,
        price: req.body.price
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

app.listen(3000, ()=>{
    console.log('Server Started on port 3000.')
})