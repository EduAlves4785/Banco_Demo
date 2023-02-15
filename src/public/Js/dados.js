const userH1=document.getElementById("userH1")
const saldo=document.getElementById("saldo")
const urlParam=window.location.pathname
const CPF=urlParam.slice(7)
const botaoDelete=document.getElementById("deletebtn")
const botaopix=document.getElementById("botaopix")

botaopix.addEventListener('click',()=>{
    window.location.href=`http://localhost:8081/pix/${CPF}`
})

botaoDelete.addEventListener('click',deleteDados)

async function deleteDados(){
    const urlDel=`http://localhost:8081/api/deletar/${CPF}`
    const urlGet=`http://localhost:8081/api/usuario/${CPF}`

    function validar(senha){
        var senhaUser=" "
        while(senhaUser!==senha){
            var senhaUser = prompt("Digite sua senha: ");
            if(senhaUser===senha){
                window.alert("Usuário deletado!\nClique em ok.")
                fetch(urlDel,{ method: 'DELETE' })
                window.location.href="http://localhost:8081"
                return
            }else{
                window.alert("Senha inválida!")
            }
       } 
    }

    fetch(urlGet)
        .then((res)=>res.json())
        .then((data)=>{
            const dados=data.result
            const senha=dados.senha
            console.log(senha)
            validar(senha)
        })
   
}

async function getDados(){
    const url=`http://localhost:8081/api/usuario/${CPF}`

    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            const dados=data.result
            const nome=dados.nome
            const formata_String=nome.split(' ')[0]
            userH1.innerText=`Seja bem vindo(a) ${formata_String}`
            saldo.innerText=dados.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        })
}

getDados()
