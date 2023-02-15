const urlParam=window.location.pathname
const CPF=urlParam.slice(5)
const saldo=document.getElementById("saldo")
const usercpf=document.getElementById("usercpf")
const botaopesq=document.getElementById("botaopesq")
const botaoenv=document.getElementById("botaoenv")
const valorpix=document.getElementById("valorpix")
const btnvoltar=document.getElementById("btnvoltar")

const divUser=document.getElementById("userdiv")
const userNome=document.getElementById("usernome")
const userEmail=document.getElementById("useremail")
const erro=document.getElementById("erro")

var SaldoBeneficiario=0
var SaldoUserAtual=0

btnvoltar.addEventListener('click',()=>{
    window.location.href=`http://localhost:8081/conta/${CPF}`
})

botaopesq.addEventListener('click',pesquisar)
    
    async function pesquisar(){
        const url=`http://localhost:8081/api/usuario/${usercpf.value}`
        fetch(url)
        .then((resp)=>resp.json())
        .then((data)=>{
            erro.style.color="red"
            const dados=data.result 
            SaldoBeneficiario=dados.saldo
            console.log(data)
            if(dados.cpf!==usercpf.value){
                erro.innerText="Pessoa não encontrada"
            }else{
                erro.style.color="RGB(153 255 154)"
                erro.innerText="Pessoa encontrada"
                divUser.style.display="flex"
                userNome.innerText="Nome: "+dados.nome
                userEmail.innerText="Email: "+dados.email
            }
        }).catch(()=>erro.innerText="Pessoa não encontrada")
    }

botaoenv.addEventListener('click',enviarPix)

async function enviarPix(){

    const novoSaldoBeneficiario=parseFloat(SaldoBeneficiario)+parseFloat(valorpix.value)
    const novoSaldoUsuario=parseFloat(SaldoUserAtual)-parseFloat(valorpix.value)

    if(SaldoUserAtual<valorpix.value){
        erro.style.color="red"
        erro.innerText="Saldo insuficiente."
        return
    }else{
        erro.innerText=" "
        console.log(novoSaldoBeneficiario)
        atualizarSaldoUsuario(novoSaldoUsuario)
        const url=`http://localhost:8081/api/alterar/${usercpf.value}`
        fetch(url,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                saldo:novoSaldoBeneficiario
            }),
            }).then((resp)=>{resp.json()})
            .then(()=>window.alert("Pix concluído!"))
            .catch((e)=>console.log("Erro no servidor: "+e))
    } 
}

async function atualizarSaldoUsuario(novoSaldo){
    const url=`http://localhost:8081/api/alterar/${CPF}`

    fetch(url,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            saldo:novoSaldo
        }),
        }).then((resp)=>{resp.json()})
        .catch((e)=>console.log("Erro no servidor: "+e))
}

async function getDados(){
    const url=`http://localhost:8081/api/usuario/${CPF}`

    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            const dados=data.result
            SaldoUserAtual=dados.saldo
            const nome=dados.nome
            console.log(nome)
            const formata_String=nome.split(' ')[0]
            userH1.innerText=`Seja bem vindo(a) ${formata_String}`
            saldo.innerText="Saldo: "+dados.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        })
}
getDados()