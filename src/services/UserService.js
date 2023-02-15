const db=require('../db')


module.exports={
    buscarTodos:()=>{
        return new Promise((aceito,rejeitado)=>{
            db.query('SELECT * FROM users',(error,results)=>{
                if(error){rejeitado(error);return;}
                aceito(results)
            })
        })
    },

    buscarUm:(codigo)=>{
        return new Promise((aceito,rejeitado)=>{
            db.query('SELECT * FROM users where cpf=?',[codigo],(error,results)=>{
                if(error){rejeitado(error);return;}
                if(results.length>0){
                    aceito(results[0])
                }else{
                    aceito(false)
                }
            })
        })
    },

    inserir:(cpf,nome,email,senha)=>{
        return new Promise((aceito,rejeitado)=>{
            db.query('INSERT INTO users (cpf,nome,email,senha,saldo) VALUES (?,?,?,?,0)',[cpf,nome,email,senha],(error,results)=>{
                    if(error){rejeitado(error);return;}
                    aceito(results.insertId)
            })  
        })
    },

    alterar:(codigo,saldo)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE users SET saldo=? WHERE cpf = ?',
                [saldo,codigo],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir:(cpf)=>{
        return new Promise((aceito,rejeitado)=>{
            db.query('DELETE FROM users where cpf=?',[cpf],(error,results)=>{
                if(error){rejeitado(error);return;}
                aceito(results)
            })
        })
    }
};