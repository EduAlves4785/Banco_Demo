const UserService=require('../services/UserService')
const express=require('express')
const server=express()

module.exports={
    buscarTodos:async(req,res)=>{
        let json={error:'',result:[]}

        let usuarios=await UserService.buscarTodos()

        for(let i in usuarios){
            json.result.push({
                id:usuarios[i].id,
                nome:usuarios[i].nome,
                email:usuarios[i].email,
                senha:usuarios[i].senha
            })
            return
        }
    },

    buscarUm:async(req,res)=>{
        let json={error:'',result:{}}

        let codigo=req.params.codigo
        let user=await UserService.buscarUm(codigo)

        if(user){
            json.result=user
        }
        res.json(json)
        return
    },

    inserir:async(req,res)=>{
        let json={error:'',result:{}}

        let cpf=req.body.cpf
        let nome=req.body.nome
        let email=req.body.email
        let senha=req.body.senha

        if(cpf && nome && email && senha){
            let userCodigo=await UserService.inserir(cpf,nome,email,senha)
            json.result={
                id:userCodigo,
                cpf,
                nome,
                email,
                senha
            }
        }else{
            json.error="Campos não enviados!"
        }
        res.json(json)
        return
    },

    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        let codigo=req.params.codigo
        let saldo=req.body.saldo

        if (codigo && saldo){
            await UserService.alterar(codigo,saldo);
            json.result = {
                codigo,
                saldo
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
        return
    },

    excluir:async(req,res)=>{
        let json={error:'',result:{}}
        let cpf=req.params.codigo

        await UserService.excluir(cpf)
        res.json(json)
    }
}