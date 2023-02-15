require('dotenv').config({path:'variaveis.env'})
const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const routes=require('./routes')

const server=express()
server.use(cors())
server.use(bodyParser.urlencoded({extended:true}))
server.use(express.json())

server.use('/api',routes);

//Arquivos estáticos
server.use(express.static(__dirname+'/public'))

//Views
server.get("/",(req,res)=>{
    res.sendFile('main.html', {root: 'src/views'});
})

server.get("/cadastro",(req,res)=>{
    res.sendFile('cadastro.html', {root: 'src/views'});
})

server.get("/conta/:cpf",(req,res)=>{
    res.sendFile('conta.html', {root: 'src/views'});
})

server.get("/login",(req,res)=>{
    res.sendFile('login.html', {root: 'src/views'});
})

server.get("/pix/:cpf",(req,res)=>{
    res.sendFile('pix.html', {root: 'src/views'});
})


server.listen(process.env.PORT,()=>{
    console.log(`Servidor rodando na porta :${process.env.PORT}`)
})