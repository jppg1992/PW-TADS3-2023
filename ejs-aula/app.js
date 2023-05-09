const express = require("express")
const app = express()
const port = 8080
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set("view engine", "ejs")

app.get('/', (req, res)=>{
    res.render('index')
})
app.post('/login', (req, res)=>{    
    if(req.body.senha == "123")
        res.render("user", {nome: req.body.login})
    else
        res.render("erro")
})

app.get('/usuarios', (req, res)=>{
    let lista = ["Fulano", "Gledson", "Pedro"]
    res.render('list', {usuarios: lista})
})

app.listen(port, ()=>{
    console.log(`servidor rodando na url: http://localhost:${port}`)
})