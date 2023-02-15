//Caminhos da API CRUD

const express=require('express')
const router=express.Router()

const UserController=require('./controllers/UserController')

router.get('/usuarios',UserController.buscarTodos)
router.get('/usuario/:codigo',UserController.buscarUm)
router.post('/cadastro',UserController.inserir)
router.put('/alterar/:codigo',UserController.alterar)
router.delete('/deletar/:codigo',UserController.excluir)

module.exports=router